import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilWarning } from '@coreui/icons'

const Sections = () => {
  const [sections, setSections] = useState([])
  const [instructors, setInstructors] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [formData, setFormData] = useState({
    subject_id: '',
    chef_id: '',
    classroom: '',
    max_capacity: '',
  })
  const [filteredSection, setFilteredSection] = useState([])
  const [searchFilters, setSearchFilters] = useState({
    id: '',
    subject_id: '',
    chef_id: '',
    classroom: '',
    max_capacity: '',
  })
  const [errors, setErrors] = useState({})
  const [alertMessage, setAlertMessage] = useState('')
  const [selectedSection, setSelectedSection] = useState(null)

  // Fetch sections from localDB
  useEffect(() => {
    const fetchSections = async () => {
      try {
                const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:4000/api/sections',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
         });
        if (!response.ok) {
          throw new Error(`Failed to fetch sections: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setSections(data)
        console.log('Sections:', data)
        setFilteredSection(data) 
      } catch (error) {
        console.error('Error fetching sections:', error)
        setAlertMessage('Failed to load sections.')
      }
    }

    fetchSections()
  }, [])

  // Fetch instructors from localDB
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
           const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:4000/api/users',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
         });
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
        }
        const users = await response.json()
        const instr = users.filter((user) => user.role_id === 1) // Filtra solo los instructores
        setInstructors(instr)
      } catch (error) {
        console.error('Error fetching instructors:', error)
        setAlertMessage('Failed to load instructors.')
      }
    }

    fetchInstructors()
  }, [])


  const validate = () => {
    const newErrors = {}
    if (!formData.subject_id) newErrors.subject_id = 'The subject is required.'
    if (!formData.chef_id) newErrors.chef_id = 'You must select an instructor.'
    if (!formData.classroom) newErrors.classroom = 'You must select a classroom.'
    if (!formData.max_capacity || isNaN(formData.max_capacity) || formData.max_capacity <= 0) {
      newErrors.max_capacity = 'You must enter a valid number for the maximum capacity.'
    }
    return newErrors
  }

  useEffect(() => {
    const filtered = sections.filter((section) => {
      return (
        (searchFilters.id === '' || section.id.toString().includes(searchFilters.id)) &&
        (searchFilters.classroom === '' ||
          section.classroom.toLowerCase().includes(searchFilters.classroom.toLowerCase())) &&
        (searchFilters.max_capacity === '' ||
          section.max_capacity.toString().includes(searchFilters.max_capacity)) &&
        (searchFilters.chef_id === '' ||
          section.chef_id.toString().includes(searchFilters.chef_id)) &&
        (searchFilters.subject_id === '' ||
          section.subject_id.toString().includes(searchFilters.subject_id))
      )
    })
    setFilteredSection(filtered)
  }, [searchFilters, sections])

  const handleSearchChange = (e) => {
    const { name, value } = e.target
    setSearchFilters({ ...searchFilters, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})

    try {
      const method = editSection ? 'PUT' : 'POST'
      const url = editSection
        ? `http://localhost:5000/sections/${editSection.id}`
        : 'http://localhost:5000/sections'

      // Generar un ID único e incremental si es una nueva sección
      if (!editSection) {
        const maxId = sections.reduce((max, section) => Math.max(max, parseInt(section.id, 10)), 0)
        formData.id = (maxId + 1).toString()
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(editSection ? 'Failed to update section' : 'Failed to create section')
      }

      const section = await response.json()

      if (editSection) {
        // Actualiza la sección en la lista
        setSections(sections.map((s) => (s.id === section.id ? section : s)))
        setModalVisible(false)
      } else {
        // Añade la nueva sección a la lista
        setSections([...sections, section])
        setModalVisible(false)
      }

      // Limpia el formulario y el estado seleccionado
      setEditSection(null)
      setFormData({
        subject_id: '',
        chef_id: '',
        classroom: '',
        max_capacity: '',
      })
    } catch (error) {
      console.error('Error saving section:', error)
      setAlertMessage('Failed to save section.')
    }
  }

  const handleEdit = (section) => {
    setEditSection(section)
    setFormData({
      subject_id: section.subject_id,
      chef_id: section.chef_id,
      classroom: section.classroom,
      max_capacity: section.max_capacity,
    })
    setModalVisible(true)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sections/${selectedSection.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete section')
      }
      setSections(sections.filter((section) => section.id !== selectedSection.id))
      setVisibleDelete(false)
      setSelectedSection(null)
      setAlertMessage('Section deleted successfully.')
    } catch (error) {
      console.error('Error deleting section:', error)
      setAlertMessage('Failed to delete section.')
    }
  }

  const confirmDelete = (section) => {
    setSelectedSection(section)
    setVisibleDelete(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h5>Section Management</h5>
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
          <CContainer>
              <CRow>
                <CCol sm="auto">
                  <CFormInput
                    type="text"
                    placeholder="Search by ID"
                    name="id"
                    value={searchFilters.id}
                    onChange={handleSearchChange}
                    className="me-2"
                  />
                </CCol>
                <CCol sm="auto">
                  <CFormInput
                    type="text"
                    placeholder="Search by Classroom"
                    name="classroom"
                    value={searchFilters.classroom}
                    onChange={handleSearchChange}
                    className="me-2"
                  />
                </CCol>
                <CCol sm="auto">
                  <CFormInput
                    type="text"
                    placeholder="Search by Capacity"
                    name="max_capacity"
                    value={searchFilters.max_capacity}
                    onChange={handleSearchChange}
                    className="me-2"
                  />
                </CCol>
                <CCol sm="auto">
                  <CFormInput
                    type="text"
                    placeholder="Search by Subject ID"
                    name="subject_id"
                    value={searchFilters.subject_id}
                    onChange={handleSearchChange}
                    className="me-2"
                  />
                </CCol>
                <CCol sm="auto">
                  <CFormInput
                    type="text"
                    placeholder="Search by Chef ID"
                    name="chef_id"
                    value={searchFilters.chef_id}
                    onChange={handleSearchChange}
                    className="me-2"
                  />
                </CCol>
              </CRow>
            </CContainer>
            <CCol className="text-end">
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Create Section
              </CButton>
            </CCol>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Instructor</CTableHeaderCell>
                <CTableHeaderCell>Classroom</CTableHeaderCell>
                <CTableHeaderCell>Max Capacity</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {instructors && sections.map((section) => (
                <CTableRow key={section.id}>
                  <CTableDataCell>{section.id}</CTableDataCell>
                  <CTableDataCell>
                    {instructors && instructors.find((instr) => instr.id == section.chef_id)?.first_name || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{section.classroom}</CTableDataCell>
                  <CTableDataCell>{section.max_capacity}</CTableDataCell>
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
                      onClick={() => confirmDelete(section)}
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

      {/* Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editSection ? 'Edit Section' : 'Create Section'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormLabel>Subject</CFormLabel>
            <CFormInput
              className="mb-3"
              type="text"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              invalid={!!errors.subject_id}
            />
            {errors.subject_id && <small className="text-danger">{errors.subject_id}</small>}
            <CFormLabel>Instructor</CFormLabel>
            <CFormSelect
              className="mb-3"
              name="chef_id"
              value={formData.chef_id}
              onChange={handleChange}
              invalid={!!errors.chef_id}
            >
              <option value="">Select an instructor</option>
              {instructors.map((instr) => (
                <option key={instr.id} value={instr.id}>
                  {instr.first_name} {instr.last_name}
                </option>
              ))}
            </CFormSelect>
            {errors.chef_id && <small className="text-danger">{errors.chef_id}</small>}
            <CFormLabel>Classroom</CFormLabel>
            <CFormSelect
              className="mb-3"
              name="classroom"
              value={formData.classroom}
              onChange={handleChange}
              invalid={!!errors.classroom}
            >
              <option value="">Select a classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.name}>
                  {classroom.name}
                </option>
              ))}
            </CFormSelect>
            {errors.classroom && <small className="text-danger">{errors.classroom}</small>}
            <CFormLabel>Maximum Capacity</CFormLabel>
            <CFormInput
              className="mb-3"
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              invalid={!!errors.max_capacity}
            />
            {errors.max_capacity && <small className="text-danger">{errors.max_capacity}</small>}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal de Confirmación para Eliminar */}
      <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete the section <strong>{selectedSection?.subject_id}</strong>?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default Sections