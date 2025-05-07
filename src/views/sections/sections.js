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
  const [errors, setErrors] = useState({})
  const [alertMessage, setAlertMessage] = useState('')
  const [selectedSection, setSelectedSection] = useState(null)

  // Fetch sections from localDB
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('http://localhost:5000/sections')
        if (!response.ok) {
          throw new Error(`Failed to fetch sections: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setSections(data)
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
        const response = await fetch('http://localhost:5000/users')
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
        }
        const users = await response.json()
        const instr = users.filter((user) => user.role_id === 2) // Filtra solo los instructores
        setInstructors(instr)
      } catch (error) {
        console.error('Error fetching instructors:', error)
        setAlertMessage('Failed to load instructors.')
      }
    }

    fetchInstructors()
  }, [])

  // Fetch classrooms from localDB
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/classrooms')
        if (!response.ok) {
          throw new Error(`Failed to fetch classrooms: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setClassrooms(data)
      } catch (error) {
        console.error('Error fetching classrooms:', error)
        setAlertMessage('Failed to load classrooms.')
      }
    }

    fetchClassrooms()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})

    try {
      if (editSection) {
        // Update section
        const response = await fetch(`http://localhost:5000/sections/${editSection.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          throw new Error('Failed to update section.')
        }
        setAlertMessage('Section updated successfully.')
      } else {
        // Create new section
        const response = await fetch('http://localhost:5000/sections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          throw new Error('Failed to create section.')
        }
        setAlertMessage('Section created successfully.')
      }
      setModalVisible(false)
      setEditSection(null)
      setFormData({ subject_id: '', chef_id: '', classroom: '', max_capacity: '' })
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/sections/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete section.')
      }
      setAlertMessage('Section deleted successfully.')
      setSections(sections.filter((section) => section.id !== id))
    } catch (error) {
      console.error('Error deleting section:', error)
      setAlertMessage('Failed to delete section.')
    }
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
            <CCol className="text-end">
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Create Section
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
                <CTableHeaderCell>Subject</CTableHeaderCell>
                <CTableHeaderCell>Instructor</CTableHeaderCell>
                <CTableHeaderCell>Classroom</CTableHeaderCell>
                <CTableHeaderCell>Max Capacity</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sections.map((section) => (
                <CTableRow key={section.id}>
                  <CTableDataCell>{section.id}</CTableDataCell>
                  <CTableDataCell>{section.subject_id}</CTableDataCell>
                  <CTableDataCell>
                    {instructors.find((instr) => instr.id === section.chef_id)?.first_name || 'N/A'}
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
                    <CButton color="danger" size="sm" onClick={() => handleDelete(section.id)}>
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
    </CContainer>
  )
}

export default Sections