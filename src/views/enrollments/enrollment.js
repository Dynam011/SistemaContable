import React, { useState, useEffect } from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilWarning, cilCloudDownload } from '@coreui/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFEnrollment from '../../components/PDFs/PDFEnrollment'

const darkColors = {
  card: '#23262F',
  accent: '#FFB347',
  text: '#F5F6FA',
  secondary: '#A3A7B7',
  border: '#31344b',
}


export const EnrollmentsList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [filterStudentId, setFilterStudentId] = useState('');
  const [filterSectionId, setFilterSectionId] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [newEnrollment, setNewEnrollment] = useState({
    student_id: '',
    section_id: '',
    enrollment_date: '',
    status: 'active',
    payment_status: 'unpaid',
  });
  const [editEnrollment, setEditEnrollment] = useState({
    id: '',
    student_id: '',
    section_id: '',
    enrollment_date: '',
    status: 'active',
    payment_status: 'unpaid',
  });
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch all data from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAll = async () => {
      try {
        // Fetch enrollments
        const enrollmentsRes = await fetch('http://localhost:4000/api/enrollments', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const enrollmentsData = await enrollmentsRes.json();
        setEnrollments(enrollmentsData);

        // Fetch students
        const studentsRes = await fetch('http://localhost:4000/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const studentsData = await studentsRes.json();
        setStudents(studentsData);

        // Fetch sections
        const sectionsRes = await fetch('http://localhost:4000/api/sections', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const sectionsData = await sectionsRes.json();
        setSections(sectionsData);

      } catch (error) {
        setAlertMessage('Error loading data from backend.');
        console.error(error);
      }
    };
    fetchAll();
  }, []);

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const studentMatch = filterStudentId === '' || enrollment.student_id === parseInt(filterStudentId);
    const sectionMatch = filterSectionId === '' || enrollment.section_id === parseInt(filterSectionId);
    const statusMatch = filterStatus === 'all' || enrollment.status === filterStatus;
    const paymentStatusMatch = filterPaymentStatus === 'all' || enrollment.payment_status === filterPaymentStatus;
    return studentMatch && sectionMatch && statusMatch && paymentStatusMatch;
  });

  const handleInputChange = (event, stateSetter, key) => {
    stateSetter((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  // Add enrollment to backend
  const handleAddEnrollment = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newEnrollment),
      });
      if (!response.ok) throw new Error('Failed to add enrollment');
      const added = await response.json();
      setEnrollments([...enrollments, added]);
      setVisibleAdd(false);
      setNewEnrollment({ student_id: '', section_id: '', enrollment_date: '', status: 'active', payment_status: 'unpaid' });
      setAlertMessage('Matrícula agregada correctamente.');
    } catch (error) {
      setAlertMessage('Error al agregar la matrícula.');
    }
  };

  // Edit enrollment in backend
  const handleEditEnrollment = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/api/enrollments/${editEnrollment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editEnrollment),
      });
      if (!response.ok) throw new Error('Failed to update enrollment');
      const updated = await response.json();
      setEnrollments(enrollments.map(e => e.id === updated.id ? updated : e));
      setVisibleEdit(false);
      setEditEnrollment({ id: '', student_id: '', section_id: '', enrollment_date: '', status: 'active', payment_status: 'unpaid' });
      setAlertMessage('Matrícula actualizada correctamente.');
    } catch (error) {
      setAlertMessage('Error al actualizar la matrícula.');
    }
  };

  // Delete enrollment in backend
  const handleDeleteEnrollment = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/api/enrollments/${selectedEnrollment.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete enrollment');
      setEnrollments(enrollments.filter(e => e.id !== selectedEnrollment.id));
      setVisibleDelete(false);
      setSelectedEnrollment(null);
      setAlertMessage('Matrícula eliminada correctamente.');
    } catch (error) {
      setAlertMessage('Error al eliminar la matrícula.');
    }
  };

  return (
    <div
      style={{
        background: darkColors.background,
        minHeight: '100vh',
        padding: '32px 0',
      }}
    >
      <CRow className="justify-content-center">
        <CCol xs={12}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                background: 'transparent',
                borderBottom: `1px solid ${darkColors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0 18px 0',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <h3 style={{ color: darkColors.accent, margin: 0, fontWeight: 700, letterSpacing: 1 }}>
                Matrículas
              </h3>
              <div style={{ display: 'flex', gap: 10 }}>
                <PDFDownloadLink
                  document={<PDFEnrollment fecha={new Date().toLocaleDateString()} />}
                  fileName={`matriculas_${new Date().toISOString().slice(0, 10)}.pdf`}
                  style={{ textDecoration: 'none' }}
                >
                  {({ loading }) => (
                    <CButton
                      color="info"
                      style={{
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: 8,
                        boxShadow: '0 2px 8px #00bfff44',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <CIcon icon={cilCloudDownload} />
                      {loading ? 'Generando PDF...' : 'Descargar PDF'}
                    </CButton>
                  )}
                </PDFDownloadLink>
                <CButton
                  color="warning"
                  style={{
                    color: darkColors.background,
                    fontWeight: 600,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px #ffb34744',
                  }}
                  onClick={() => setVisibleAdd(true)}
                >
                  <CIcon icon={cilPlus} className="me-2" />
                  Nueva Matrícula
                </CButton>
              </div>
            </div>
            {alertMessage && (
              <CAlert color="info" className="d-flex align-items-center mt-3" style={{ background: darkColors.card, color: darkColors.text }}>
                <CIcon icon={cilWarning} className="me-2" />
                {alertMessage}
              </CAlert>
            )}
            <CForm className="mb-4">
              <CRow className="g-3">
                <CCol md={3}>
                  <CFormSelect
                    value={filterStudentId}
                    onChange={(e) => setFilterStudentId(e.target.value)}
                    style={{ background: darkColors.card, color: darkColors.text, borderColor: darkColors.border }}
                    options={[
                      { label: 'Filtrar por Estudiante', value: '' },
                      ...students.map((student) => ({
                        label: `${student.first_name} ${student.last_name} (${student.email})`,
                        value: student.id.toString(),
                      })),
                    ]}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filterSectionId}
                    onChange={(e) => setFilterSectionId(e.target.value)}
                    style={{ background: darkColors.card, color: darkColors.text, borderColor: darkColors.border }}
                    options={[
                      { label: 'Filtrar por Sección', value: '' },
                      ...sections.map((section) => ({
                        label: `Materia: ${section.subject_id}, Aula: ${section.classroom}`,
                        value: section.id.toString(),
                      })),
                    ]}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ background: darkColors.card, color: darkColors.text, borderColor: darkColors.border }}
                    options={[
                      { label: 'Filtrar por Estado', value: 'all' },
                      { label: 'Activo', value: 'active' },
                      { label: 'Inactivo', value: 'inactive' },
                      { label: 'Completado', value: 'completed' },
                    ]}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filterPaymentStatus}
                    onChange={(e) => setFilterPaymentStatus(e.target.value)}
                    style={{ background: darkColors.card, color: darkColors.text, borderColor: darkColors.border }}
                    options={[
                      { label: 'Filtrar por Pago', value: 'all' },
                      { label: 'Pagado', value: 'paid' },
                      { label: 'No Pagado', value: 'unpaid' },
                      { label: 'Parcial', value: 'partial' },
                    ]}
                  />
                </CCol>
              </CRow>
            </CForm>
            <CTable
              hover
              responsive
              className="mt-4"
              style={{
                background: darkColors.card,
                color: darkColors.text,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <CTableHead>
                <CTableRow style={{ background: darkColors.card }}>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Estudiante</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Sección</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Fecha</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Estado</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Pago</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent, textAlign: 'center' }}>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredEnrollments.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={7} className="text-center" style={{ color: darkColors.secondary }}>
                      No hay matrículas registradas.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  filteredEnrollments.map((enrollment) => {
                    const student = students.find((s) => s.id === enrollment.student_id);
                    const section = sections.find((sec) => sec.id === enrollment.section_id);
                    return (
                      <CTableRow key={enrollment.id}>
                        <CTableDataCell>{enrollment.id}</CTableDataCell>
                        <CTableDataCell>
                          {student ? `${student.first_name} ${student.last_name}` : 'N/A'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {section ? `Materia: ${section.subject_id}, Aula: ${section.classroom}` : 'N/A'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {enrollment.enrollment_date ? new Date(enrollment.enrollment_date).toLocaleDateString() : ''}
                        </CTableDataCell>
                        <CTableDataCell>{enrollment.status}</CTableDataCell>
                        <CTableDataCell>{enrollment.payment_status}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: 'center' }}>
                          <CButton
                            color="info"
                            size="sm"
                            className="me-2"
                            style={{
                              color: '#fff',
                              borderRadius: 6,
                              padding: '4px 7px',
                              minWidth: 0,
                              minHeight: 0,
                            }}
                            onClick={() => {
                              setSelectedEnrollment(enrollment);
                              setEditEnrollment({
                                id: enrollment.id,
                                student_id: enrollment.student_id,
                                section_id: enrollment.section_id,
                                enrollment_date: enrollment.enrollment_date,
                                status: enrollment.status,
                                payment_status: enrollment.payment_status,
                              });
                              setVisibleEdit(true);
                            }}
                          >
                            <CIcon icon={cilPencil} size="sm" />
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            style={{
                              color: '#fff',
                              borderRadius: 6,
                              padding: '4px 7px',
                              minWidth: 0,
                              minHeight: 0,
                            }}
                            onClick={() => {
                              setSelectedEnrollment(enrollment);
                              setVisibleDelete(true);
                            }}
                          >
                            <CIcon icon={cilTrash} size="sm" />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })
                )}
              </CTableBody>
            </CTable>
          </div>
        </CCol>
      </CRow>

      {/* Modal para Agregar Matrícula */}
      <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)} alignment="center">
        <CModalHeader style={{ background: darkColors.card }}>
          <CModalTitle style={{ color: darkColors.accent }}>Nueva Matrícula</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: darkColors.card }}>
          <CForm>
            <CFormSelect
              className="mb-3"
              label="Estudiante"
              value={newEnrollment.student_id}
              onChange={(e) => handleInputChange(e, setNewEnrollment, 'student_id')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            >
              <option value="">Selecciona Estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name} ({student.email})
                </option>
              ))}
            </CFormSelect>
            <CFormSelect
              className="mb-3"
              label="Sección"
              value={newEnrollment.section_id}
              onChange={(e) => handleInputChange(e, setNewEnrollment, 'section_id')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            >
              <option value="">Selecciona Sección</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  Materia: {section.subject_id}, Aula: {section.classroom}
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              type="date"
              label="Fecha de Matrícula"
              className="mb-3"
              value={newEnrollment.enrollment_date}
              onChange={(e) => handleInputChange(e, setNewEnrollment, 'enrollment_date')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            <CFormSelect
              className="mb-3"
              label="Estado"
              value={newEnrollment.status}
              onChange={(e) => handleInputChange(e, setNewEnrollment, 'status')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              options={[
                { label: 'Activo', value: 'active' },
                { label: 'Inactivo', value: 'inactive' },
                { label: 'Completado', value: 'completed' },
              ]}
            />
            <CFormSelect
              className="mb-3"
              label="Pago"
              value={newEnrollment.payment_status}
              onChange={(e) => handleInputChange(e, setNewEnrollment, 'payment_status')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              options={[
                { label: 'No Pagado', value: 'unpaid' },
                { label: 'Pagado', value: 'paid' },
                { label: 'Parcial', value: 'partial' },
              ]}
            />
          </CForm>
        </CModalBody>
        <CModalFooter style={{ background: darkColors.card }}>
          <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
            Cancelar
          </CButton>
          <CButton color="warning" style={{ color: darkColors.background, fontWeight: 600 }} onClick={handleAddEnrollment}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para Editar Matrícula */}
      <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)} alignment="center">
        <CModalHeader style={{ background: darkColors.card }}>
          <CModalTitle style={{ color: darkColors.accent }}>Editar Matrícula</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: darkColors.card }}>
          <CForm>
            <CFormSelect
              className="mb-3"
              label="Estudiante"
              value={editEnrollment.student_id}
              onChange={(e) => handleInputChange(e, setEditEnrollment, 'student_id')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            >
              <option value="">Selecciona Estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name} ({student.email})
                </option>
              ))}
            </CFormSelect>
            <CFormSelect
              className="mb-3"
              label="Sección"
              value={editEnrollment.section_id}
              onChange={(e) => handleInputChange(e, setEditEnrollment, 'section_id')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            >
              <option value="">Selecciona Sección</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  Materia: {section.subject_id}, Aula: {section.classroom}
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              type="date"
              label="Fecha de Matrícula"
              className="mb-3"
              value={editEnrollment.enrollment_date}
              onChange={(e) => handleInputChange(e, setEditEnrollment, 'enrollment_date')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            <CFormSelect
              className="mb-3"
              label="Estado"
              value={editEnrollment.status}
              onChange={(e) => handleInputChange(e, setEditEnrollment, 'status')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              options={[
                { label: 'Activo', value: 'active' },
                { label: 'Inactivo', value: 'inactive' },
                { label: 'Completado', value: 'completed' },
              ]}
            />
            <CFormSelect
              className="mb-3"
              label="Pago"
              value={editEnrollment.payment_status}
              onChange={(e) => handleInputChange(e, setEditEnrollment, 'payment_status')}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              options={[
                { label: 'No Pagado', value: 'unpaid' },
                { label: 'Pagado', value: 'paid' },
                { label: 'Parcial', value: 'partial' },
              ]}
            />
          </CForm>
        </CModalBody>
        <CModalFooter style={{ background: darkColors.card }}>
          <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
            Cancelar
          </CButton>
          <CButton color="warning" style={{ color: darkColors.background, fontWeight: 600 }} onClick={handleEditEnrollment}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para Eliminar Matrícula */}
      <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)} alignment="center">
        <CModalHeader style={{ background: darkColors.card }}>
          <CModalTitle style={{ color: darkColors.accent }}>Eliminar Matrícula</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: darkColors.card, color: darkColors.text }}>
          ¿Estás seguro de que deseas eliminar esta matrícula?
        </CModalBody>
        <CModalFooter style={{ background: darkColors.card }}>
          <CButton color="danger" style={{ color: '#fff' }} onClick={handleDeleteEnrollment}>
            Eliminar
          </CButton>
          <CButton color="secondary" style={{ color: '#fff' }} onClick={() => setVisibleDelete(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default EnrollmentsList;