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
      name: 'Cocina Básica - Grupo A',
      instructor: 'Chef John Doe',
      maxStudents: 20,
      enrolledStudents: 15,
    },
    {
      id: 2,
      name: 'Repostería Avanzada - Grupo B',
      instructor: 'Chef Jane Smith',
      maxStudents: 15,
      enrolledStudents: 10,
    },
  ])
  const [modalVisible, setModalVisible] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    maxStudents: '',
  })
  const [errors, setErrors] = useState({})
  const [alertMessage, setAlertMessage] = useState('')

  const instructors = ['Chef John Doe', 'Chef Jane Smith', 'Chef Bob Johnson']

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'El nombre de la sección es obligatorio.'
    if (!formData.instructor) newErrors.instructor = 'Debe seleccionar un instructor.'
    if (!formData.maxStudents || isNaN(formData.maxStudents) || formData.maxStudents <= 0) {
      newErrors.maxStudents = 'Debe ingresar un número válido para el cupo máximo.'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const classrooms = [
    { id: 1, name: 'Aula 1', status: 'occupied' },
    { id: 2, name: 'Aula 2', status: 'free' },
    { id: 3, name: 'Aula 3', status: 'occupied' },
    { id: 4, name: 'Aula 4', status: 'free' },
    { id: 5, name: 'Aula 5', status: 'occupied' },
    { id: 6, name: 'Aula 6', status: 'free' },
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
      setAlertMessage('Sección actualizada con éxito.')
    } else {
      setSections([
        ...sections,
        { id: sections.length + 1, ...formData, enrolledStudents: 0 },
      ])
      setAlertMessage('Sección creada con éxito.')
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
    setSections(sections.filter((section) => section.id !== id))
    setAlertMessage('Sección eliminada con éxito.')
  }

  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h5>Gestión de Secciones</h5>
            </CCol>
            <CCol className="text-end">
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Crear Sección
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
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(section.id)}
                    >
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
          <CModalTitle>{editSection ? 'Editar Sección' : 'Crear Sección'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormLabel>Nombre de la Sección</CFormLabel>
            <CFormInput
              className="mb-3"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
            <CFormLabel>Aula</CFormLabel>
            <CFormSelect
              className="mb-3"
              name="instructor"
              value={classrooms.name}
              onChange={handleChange}
              invalid={!!errors.instructor}
            >
              <option value="">Seleccione un aula</option>
              {classrooms.map((classroom) => (
                <option style={{
                  color: classroom.status === 'occupied' ? '#FF0000' : '#90EE90',

                }} key={classroom.id} value={classroom.id}>
                    {classroom.name}
                </option>
            ))}
            </CFormSelect>
            <CFormLabel>Instructor</CFormLabel>
            <CFormSelect
              className="mb-3"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              invalid={!!errors.instructor}
            >
              <option value="">Seleccione un instructor</option>
              {instructors.map((instructor, index) => (
                <option key={index} value={instructor}>
                  {instructor}
                </option>
              ))}
            </CFormSelect>
            {errors.instructor && <small className="text-danger">{errors.instructor}</small>}

            <CFormLabel>Cupo Máximo</CFormLabel>
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
        
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Guardar
          </CButton>
        </CModalFooter>
        
      </CModal>
      
    </CContainer>
  )
  
}

export default Sections

