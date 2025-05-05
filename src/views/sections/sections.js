import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilWarning } from '@coreui/icons'

const Sections = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'Basic Cooking - Group A', // Traducción: Cocina Básica - Grupo A
      instructor: 'Chef John Doe',
      maxStudents: 20,
      enrolledStudents: 15,
    },
    {
      id: 2,
      name: 'Advanced Pastry - Group B', // Traducción: Repostería Avanzada - Grupo B
      instructor: 'Chef Jane Smith',
      maxStudents: 15,
      enrolledStudents: 10,
    },
  ])
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    maxStudents: '',
  })
  const [errors, setErrors] = useState({})
  const [alertMessage, setAlertMessage] = useState('')
  const [selectedSection, setSelectedSection] = useState(null)
  const instructors = ['Chef John Doe', 'Chef Jane Smith', 'Chef Bob Johnson']

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'The section name is required.' // Traducción: El nombre de la sección es obligatorio.
    if (!formData.instructor) newErrors.instructor = 'You must select an instructor.' // Traducción: Debe seleccionar un instructor.
    if (!formData.maxStudents || isNaN(formData.maxStudents) || formData.maxStudents <= 0) {
      newErrors.maxStudents = 'You must enter a valid number for the maximum capacity.' // Traducción: Debe ingresar un número válido para el cupo máximo.
    }
    return newErrors
  }
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sections/${selectedSection.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Error deleting user')
      }

      alert('User deleted successfully!')
      setVisibleDelete(false)
      fetchReports()
    } catch (error) {
      console.error('An error occurred while deleting the user.', error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const classrooms = [
    { id: 1, name: 'Room 1', status: 'occupied' },
    { id: 2, name: 'Room 2', status: 'free' },
    { id: 3, name: 'Room 3', status: 'occupied' },
    { id: 4, name: 'Room 4', status: 'free' },
    { id: 5, name: 'Room 5', status: 'occupied' },
    { id: 6, name: 'Room 6', status: 'free' },
  ]
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    if (editSection) {
      setSections(
        sections.map((section) =>
          section.id === editSection.id ? { ...editSection, ...formData } : section,
        ),
      )
      setAlertMessage('Section updated successfully.') // Traducción: Sección actualizada con éxito.
    } else {
      setSections([
        ...sections,
        { id: sections.length + 1, ...formData, enrolledStudents: 0 },
      ])
      setAlertMessage('Section created successfully.') // Traducción: Sección creada con éxito.
    }
    setModalVisible(false)
    setEditSection(null)
    setFormData({ name: '', instructor: '', maxStudents: '' })
  }

  const handleEdit = (section) => {
    setEditSection(section)
    setFormData({
      name: section.name,
      instructor: section.instructor,
      maxStudents: section.maxStudents,
    })
    setModalVisible(true)
  }

  const handleDelete = (id) => {
    setSelectedSection(id)
    setVisibleDelete(true)
  }

  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h5>Section Management</h5> {/* Traducción: Gestión de Secciones */}
            </CCol>
            <CCol className="text-end">
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Create Section {/* Traducción: Crear Sección */}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {alertMessage && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon icon={cilWarning} className="me-2" />
              {alertMessage}
            </CAlert>
          )}
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Instructor</CTableHeaderCell>
                <CTableHeaderCell>Cupo Máximo</CTableHeaderCell>
                <CTableHeaderCell>Estudiantes Inscritos</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sections.map((section) => (
                <CTableRow key={section.id}>
                  <CTableDataCell>{section.id}</CTableDataCell>
                  <CTableDataCell>{section.name}</CTableDataCell>
                  <CTableDataCell>{section.instructor}</CTableDataCell>
                  <CTableDataCell>{section.maxStudents}</CTableDataCell>
                  <CTableDataCell>{section.enrolledStudents}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(section)}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" size="sm" onClick={handleDelete}>
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Crear/Editar Sección */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editSection ? 'Edit Section' : 'Create Section'}</CModalTitle> {/* Traducción: Editar Sección / Crear Sección */}
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormLabel>Section Name</CFormLabel> {/* Traducción: Nombre de la Sección */}
            <CFormInput
              className="mb-3"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
            <CFormLabel>Classroom</CFormLabel> {/* Traducción: Aula */}
            <CFormSelect
              className="mb-3"
              name="instructor"
              value={classrooms.name}
              onChange={handleChange}
              invalid={!!errors.instructor}
            >
              <option value="">Select a classroom</option> {/* Traducción: Seleccione un aula */}
              {classrooms.map((classroom) => (
                <option
                  style={{
                    color: classroom.status === 'occupied' ? '#FF0000' : '#90EE90',
                  }}
                  key={classroom.id}
                  value={classroom.id}
                >
                  {classroom.name}
                </option>
              ))}
            </CFormSelect>
            <CFormLabel>Instructor</CFormLabel> {/* Traducción: Instructor */}
            <CFormSelect
              className="mb-3"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              invalid={!!errors.instructor}
            >
              <option value="">Select an instructor</option> {/* Traducción: Seleccione un instructor */}
              {instructors.map((instructor, index) => (
                <option key={index} value={instructor}>
                  {instructor}
                </option>
              ))}
            </CFormSelect>
            {errors.instructor && <small className="text-danger">{errors.instructor}</small>}

            <CFormLabel>Maximum Capacity</CFormLabel> {/* Traducción: Cupo Máximo */}
            <CFormInput
              className="mb-3"
              type="number"
              name="maxStudents"
              value={formData.maxStudents}
              onChange={handleChange}
              invalid={!!errors.maxStudents}
            />
            {errors.maxStudents && <small className="text-danger">{errors.maxStudents}</small>}
          </CForm>
        </CModalBody>
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalBody>
            <p>Are you sure you want to delete this user?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleConfirmDelete}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel {/* Traducción: Cancelar */}
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Save {/* Traducción: Guardar */}
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default Sections

