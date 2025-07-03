import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilWarning } from '@coreui/icons'

const darkColors = {
  card: '#23262F',
  accent: '#FFB347',
  text: '#F5F6FA',
  secondary: '#A3A7B7',
  border: '#31344b',
}

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

  // Fetch sections from backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://culinary-school-back.onrender.com/api/sections', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch sections: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setSections(data)
        setFilteredSection(data)
      } catch (error) {
        setAlertMessage('Failed to load sections.')
      }
    }
    fetchSections()
  }, [])

  // Fetch instructors from backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://culinary-school-back.onrender.com/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
        }
        const users = await response.json()
        const instr = users.filter((user) => user.role_id === 1)
        setInstructors(instr)
      } catch (error) {
        setAlertMessage('Failed to load instructors.')
      }
    }
    fetchInstructors()
  }, [])

  // Filtrar secciones en tiempo real
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

  const validate = () => {
    const newErrors = {}
    if (!formData.subject_id) newErrors.subject_id = 'La materia es obligatoria.'
    if (!formData.chef_id) newErrors.chef_id = 'Debes seleccionar un instructor.'
    if (!formData.classroom) newErrors.classroom = 'Debes seleccionar un aula.'
    if (!formData.max_capacity || isNaN(formData.max_capacity) || formData.max_capacity <= 0) {
      newErrors.max_capacity = 'Debes ingresar un número válido para la capacidad máxima.'
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
      const method = editSection ? 'PUT' : 'POST'
      const url = editSection
        ? `https://culinary-school-back.onrender.com/api/sections/${editSection.id}`
        : 'https://culinary-school-back.onrender.com/api/sections'

      const token = localStorage.getItem('token')
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(editSection ? 'Failed to update section' : 'Failed to create section')
      }

      const section = await response.json()

      if (editSection) {
        setSections(sections.map((s) => (s.id === section.id ? section : s)))
        setModalVisible(false)
      } else {
        setSections([...sections, section])
        setModalVisible(false)
      }

      setEditSection(null)
      setFormData({
        subject_id: '',
        chef_id: '',
        classroom: '',
        max_capacity: '',
      })
      setAlertMessage('Sección guardada correctamente.')
    } catch (error) {
      setAlertMessage('Error al guardar la sección.')
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
      const token = localStorage.getItem('token')
      const response = await fetch(`https://culinary-school-back.onrender.com/api/sections/${selectedSection.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to delete section')
      }
      setSections(sections.filter((section) => section.id !== selectedSection.id))
      setVisibleDelete(false)
      setSelectedSection(null)
      setAlertMessage('Sección eliminada correctamente.')
    } catch (error) {
      setAlertMessage('Error al eliminar la sección.')
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
                Secciones
              </h3>
              <CButton
                color="warning"
                style={{
                  color: darkColors.background,
                  fontWeight: 600,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #ffb34744',
                }}
                onClick={() => {
                  setModalVisible(true)
                  setEditSection(null)
                  setFormData({
                    subject_id: '',
                    chef_id: '',
                    classroom: '',
                    max_capacity: '',
                  })
                }}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Crear Sección
              </CButton>
            </div>
            <CForm className="my-3">
              <CRow className="g-2">
               
                <CCol xs={6} md={2}>
                  <CFormInput
                    type="text"
                    placeholder="Materia"
                    name="subject_id"
                    value={searchFilters.subject_id}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={2}>
                  <CFormInput
                    type="text"
                    placeholder="Instructor"
                    name="chef_id"
                    value={searchFilters.chef_id}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={3}>
                  <CFormInput
                    type="text"
                    placeholder="Aula"
                    name="classroom"
                    value={searchFilters.classroom}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={3}>
                  <CFormInput
                    type="text"
                    placeholder="Capacidad"
                    name="max_capacity"
                    value={searchFilters.max_capacity}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
              </CRow>
            </CForm>
            {alertMessage && (
              <CAlert color="info" className="d-flex align-items-center mt-3" style={{ background: darkColors.card, color: darkColors.text }}>
                <CIcon icon={cilWarning} className="me-2" />
                {alertMessage}
              </CAlert>
            )}
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
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Materia</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Instructor</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Aula</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Capacidad</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent, textAlign: 'center' }}>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredSection.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center" style={{ color: darkColors.secondary }}>
                      No hay secciones registradas.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  filteredSection.map((section) => (
                    <CTableRow key={section.id}>
     
                      <CTableDataCell>{section.subject_id}</CTableDataCell>
                      <CTableDataCell>
                        {instructors.find((instr) => instr.id == section.chef_id)?.first_name || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell>{section.classroom}</CTableDataCell>
                      <CTableDataCell>{section.max_capacity}</CTableDataCell>
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
                          onClick={() => handleEdit(section)}
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
                          onClick={() => confirmDelete(section)}
                        >
                          <CIcon icon={cilTrash} size="sm" />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </div>
        </CCol>
      </CRow>

      {/* Modal para Crear/Editar Sección */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} alignment="center">
        <CForm onSubmit={handleSubmit}>
          <CModalHeader style={{ background: darkColors.card }}>
            <CModalTitle style={{ color: darkColors.accent }}>
              {editSection ? 'Editar Sección' : 'Crear Sección'}
            </CModalTitle>
          </CModalHeader>
          <CModalBody style={{ background: darkColors.card }}>
            <CFormLabel style={{ color: darkColors.text }}>Materia</CFormLabel>
            <CFormInput
              className="mb-3"
              type="text"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              invalid={!!errors.subject_id}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            {errors.subject_id && <small className="text-danger">{errors.subject_id}</small>}
            <CFormLabel style={{ color: darkColors.text }}>Instructor</CFormLabel>
            <CFormSelect
              className="mb-3"
              name="chef_id"
              value={formData.chef_id}
              onChange={handleChange}
              invalid={!!errors.chef_id}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            >
              <option value="">Selecciona un instructor</option>
              {instructors.map((instr) => (
                <option key={instr.id} value={instr.id}>
                  {instr.first_name} {instr.last_name}
                </option>
              ))}
            </CFormSelect>
            {errors.chef_id && <small className="text-danger">{errors.chef_id}</small>}
            <CFormLabel style={{ color: darkColors.text }}>Aula</CFormLabel>
            <CFormInput
              className="mb-3"
              type="text"
              name="classroom"
              value={formData.classroom}
              onChange={handleChange}
              invalid={!!errors.classroom}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            {errors.classroom && <small className="text-danger">{errors.classroom}</small>}
            <CFormLabel style={{ color: darkColors.text }}>Capacidad Máxima</CFormLabel>
            <CFormInput
              className="mb-3"
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              invalid={!!errors.max_capacity}
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            {errors.max_capacity && <small className="text-danger">{errors.max_capacity}</small>}
          </CModalBody>
          <CModalFooter style={{ background: darkColors.card }}>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="warning" type="submit" style={{ color: darkColors.background, fontWeight: 600 }}>
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal de Confirmación para Eliminar */}
      <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
        <CModalHeader style={{ background: darkColors.card }}>
          <CModalTitle style={{ color: darkColors.accent }}>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: darkColors.card, color: darkColors.text }}>
          <p>
            ¿Estás seguro de que deseas eliminar la sección{' '}
            <strong>{selectedSection?.subject_id}</strong>?
          </p>
        </CModalBody>
        <CModalFooter style={{ background: darkColors.card }}>
          <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Sections