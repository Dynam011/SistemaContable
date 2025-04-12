import React, { useState, useEffect } from 'react';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
} from '@coreui/react';

export const EnrollmentsList = () => {
  const [enrollments, setEnrollments] = useState([
    { id: 1, student_id: 101, section_id: 201, enrollment_date: '2025-12-08', status: 'active', payment_status: 'paid' },
    { id: 2, student_id: 102, section_id: 202, enrollment_date: '2025-09-05', status: 'inactive', payment_status: 'unpaid' },
    { id: 3, student_id: 103, section_id: 203, enrollment_date: '2025-06-14', status: 'active', payment_status: 'partial' },

  ]);
  const [students, setStudents] = useState([
    { id: 101, first_name: 'Nesly', last_name: 'Contreras', email: 'neslycontreras@gmail.com' },
    { id: 102, first_name: 'Isaac', last_name: 'Alba', email: 'isaacalba@gmail.com' },
    { id: 103, first_name: 'Jesus', last_name: 'Delgado', email: 'jesusdelgado@gmail.com' },
  ]);
  const [sections, setSections] = useState([
    { id: 201, subject_id: 'CHIN01', classroom: 'R1' },
    { id: 202, subject_id: 'INDI02', classroom: 'R2' },
    { id: 203, subject_id: 'MEX03', classroom: 'R3' },
  ]);
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

  useEffect(() => {
    // Sin datos reales, se simula la carga de datos
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

  const handleAddEnrollment = async () => { // Agregar nueva matrícula a la lista local (para pruebas)
    const newId = enrollments.length > 0 ? Math.max(...enrollments.map(e => e.id)) + 1 : 1;
    setEnrollments([...enrollments, { id: newId, ...newEnrollment }]);
    setVisibleAdd(false);
    setNewEnrollment({ student_id: '', section_id: '', enrollment_date: '', status: 'active', payment_status: 'unpaid' });
  };

  const handleEditEnrollment = async () => { // Editar una matrícula en la lista local (para pruebas)
    const updatedEnrollments = enrollments.map(e =>
      e.id === editEnrollment.id ? editEnrollment : e
    );
    setEnrollments(updatedEnrollments);
    setVisibleEdit(false);
    setEditEnrollment({ id: '', student_id: '', section_id: '', enrollment_date: '', status: 'active', payment_status: 'unpaid' });
  };

  const handleDeleteEnrollment = async () => {    // Eliminar una matrícula de la lista local (para pruebas)
    const updatedEnrollments = enrollments.filter(e => e.id !== selectedEnrollment.id);
    setEnrollments(updatedEnrollments);
    setVisibleDelete(false);
    setSelectedEnrollment(null);
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Enrollments</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormSelect
                value={filterStudentId}
                onChange={(e) => setFilterStudentId(e.target.value)}
                options={[
                  { label: 'Filter by Student', value: '' },
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
                options={[
                  { label: 'Filter by Section', value: '' },
                  ...sections.map((section) => ({
                    label: `Subject ID: ${section.subject_id}, Classroom: ${section.classroom}`,
                    value: section.id.toString(),
                  })),
                ]}
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { label: 'Filter by Status', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Completed', value: 'completed' },
                ]}
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
                options={[
                  { label: 'Filter by Payment Status', value: 'all' },
                  { label: 'Paid', value: 'paid' },
                  { label: 'Unpaid', value: 'unpaid' },
                  { label: 'Partial', value: 'partial' },
                ]}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleAdd(true)}>
                Add Enrollment
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Student</CTableHeaderCell>
              <CTableHeaderCell>Section</CTableHeaderCell>
              <CTableHeaderCell>Enrollment Date</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Payment Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredEnrollments.map((enrollment) => {
              const student = students.find((s) => s.id === enrollment.student_id);
              const section = sections.find((sec) => sec.id === enrollment.section_id);
              return (
                <CTableRow key={enrollment.id}>
                  <CTableDataCell>{enrollment.id}</CTableDataCell>
                  <CTableDataCell>
                    {student ? `${student.first_name} ${student.last_name}` : 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{section ? `Subject ID: ${section.subject_id}` : 'N/A'}</CTableDataCell>
                  <CTableDataCell>{new Date(enrollment.enrollment_date).toLocaleDateString()}</CTableDataCell>
                  <CTableDataCell>{enrollment.status}</CTableDataCell>
                  <CTableDataCell>{enrollment.payment_status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      variant="outline"
                      size="sm"
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
                      className="me-2"
                    >
                      Edit
                    </CButton>
                    <CButton
                      color="danger"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedEnrollment(enrollment);
                        setVisibleDelete(true);
                      }}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>

        {/* Modal para Agregar Matrícula */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Add Enrollment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CFormSelect
                className="mb-3"
                label="Student"
                value={newEnrollment.student_id}
                onChange={(e) => handleInputChange(e, setNewEnrollment, 'student_id')}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.first_name} {student.last_name} ({student.email})
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                className="mb-3"
                label="Section"
                value={newEnrollment.section_id}
                onChange={(e) => handleInputChange(e, setNewEnrollment, 'section_id')}
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    Subject ID: {section.subject_id}, Classroom: {section.classroom}
                  </option>
                ))}
              </CFormSelect>
              <CFormInput
                type="date"
                label="Enrollment Date"
                className="mb-3"
                value={newEnrollment.enrollment_date}
                onChange={(e) => handleInputChange(e, setNewEnrollment, 'enrollment_date')}
              />
              <CFormSelect
                className="mb-3"
                label="Status"
                value={newEnrollment.status}
                onChange={(e) => handleInputChange(e, setNewEnrollment, 'status')}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Completed', value: 'completed' },
                ]}
              />
              <CFormSelect
                className="mb-3"
                label="Payment Status"
                value={newEnrollment.payment_status}
                onChange={(e) => handleInputChange(e, setNewEnrollment, 'payment_status')}
                options={[
                  { label: 'Unpaid', value: 'unpaid' },
                  { label: 'Paid', value: 'paid' },
                  { label: 'Partial', value: 'partial' },
                ]}
              />
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={handleAddEnrollment}>
              Save
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Editar Matrícula */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Enrollment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CFormSelect
                className="mb-3"
                label="Student"
                value={editEnrollment.student_id}
                onChange={(e) => handleInputChange(e, setEditEnrollment, 'student_id')}
                options={[
                  { label: 'Select Student', value: '' },
                  ...students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.first_name} {student.last_name} ({student.email})
                    </option>
                  )),
                ]}
              />
              <CFormSelect
                className="mb-3"
                label="Section"
                value={editEnrollment.section_id}
                onChange={(e) => handleInputChange(e, setEditEnrollment, 'section_id')}
                options={[
                  { label: 'Select Section', value: '' },
                  ...sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      Subject ID: {section.subject_id}, Classroom: {section.classroom}
                    </option>
                  )),
                ]}
              />
              <CFormInput
                type="date"
                label="Enrollment Date"
                className="mb-3"
                value={editEnrollment.enrollment_date}
                onChange={(e) => handleInputChange(e, setEditEnrollment, 'enrollment_date')}
              />
              <CFormSelect
                className="mb-3"
                label="Status"
                value={editEnrollment.status}
                onChange={(e) => handleInputChange(e, setEditEnrollment, 'status')}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Completed', value: 'completed' },
                ]}
              />
              <CFormSelect
                className="mb-3"
                label="Payment Status"
                value={editEnrollment.payment_status}
                onChange={(e) => handleInputChange(e, setEditEnrollment, 'payment_status')}
                options={[
                  { label: 'Unpaid', value: 'unpaid' },
                  { label: 'Paid', value: 'paid' },
                  { label: 'Partial', value: 'partial' },
                ]}
              />
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" style={{ color: 'white' }} onClick={handleEditEnrollment}>
              Save Changes
            </CButton>
            <CButton color="danger" style={{ color: 'white' }} onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Eliminar Matrícula */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Enrollment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete this enrollment?
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" style={{ color: 'white' }} onClick={handleDeleteEnrollment}>
              Confirm Delete
            </CButton>
            <CButton color="secondary" style={{ color: 'white' }} onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default EnrollmentsList;