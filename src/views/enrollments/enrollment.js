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
      setAlertMessage('Enrollment added successfully.');
    } catch (error) {
      setAlertMessage('Error adding enrollment.');
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
      setAlertMessage('Enrollment updated successfully.');
    } catch (error) {
      setAlertMessage('Error updating enrollment.');
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
      setAlertMessage('Enrollment deleted successfully.');
    } catch (error) {
      setAlertMessage('Error deleting enrollment.');
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Enrollments</h4>
      </CCardHeader>
      <CCardBody>
        {alertMessage && (
          <div className="alert alert-info" role="alert">
            {alertMessage}
          </div>
        )}
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
                  <CTableDataCell>{enrollment.enrollment_date ? new Date(enrollment.enrollment_date).toLocaleDateString() : ''}</CTableDataCell>
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
                value={editEnrollment.section_id}
                onChange={(e) => handleInputChange(e, setEditEnrollment, 'section_id')}
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