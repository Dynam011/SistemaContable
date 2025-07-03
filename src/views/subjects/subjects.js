import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
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
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const darkColors = {

  card: '#23262F',
  accent: '#FFB347',
  text: '#F5F6FA',
  secondary: '#A3A7B7',
  border: '#31344b',
}

const Subjects = () => {
  const [subjects, setSubjects] = useState([])
  const [programs, setPrograms] = useState([])
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [formData, setFormData] = useState({
    program_id: '',
    name: '',
    description: '',
    credits: '',
  })

  // Fetch subjects and programs from backend
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchData = async () => {
      try {
        // Fetch subjects
        const resSubjects = await fetch('https://culinary-school-back.onrender.com/api/subjects', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        const dataSubjects = await resSubjects.json()
        setSubjects(dataSubjects)

        // Fetch programs for select
        const resPrograms = await fetch('https://culinary-school-back.onrender.com/api/programs', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        const dataPrograms = await resPrograms.json()
        setPrograms(dataPrograms)
      } catch (error) {
        setAlert({ type: 'danger', message: 'Error loading data.' })
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const openAddModal = () => {
    setFormData({ program_id: '', name: '', description: '', credits: '' })
    setEditMode(false)
    setShowModal(true)
    setSelectedSubject(null)
  }

  const openEditModal = (subject) => {
    setFormData({
      program_id: subject.program_id,
      name: subject.name,
      description: subject.description,
      credits: subject.credits,
    })
    setEditMode(true)
    setShowModal(true)
    setSelectedSubject(subject)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const url = editMode
        ? `https://culinary-school-back.onrender.com/api/subjects/${selectedSubject.id}`
        : 'https://culinary-school-back.onrender.com/api/subjects'
      const method = editMode ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Error saving subject')
      const updatedSubject = await res.json()
      if (editMode) {
        setSubjects(subjects.map((s) => (s.id === updatedSubject.id ? updatedSubject : s)))
        setAlert({ type: 'success', message: 'Subject updated successfully!' })
      } else {
        setSubjects([...subjects, updatedSubject])
        setAlert({ type: 'success', message: 'Subject added successfully!' })
      }
      setShowModal(false)
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error saving subject.' })
    }
  }

  const handleDelete = async (subject) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`https://culinary-school-back.onrender.com/api/subjects/${subject.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Error deleting subject')
      setSubjects(subjects.filter((s) => s.id !== subject.id))
      setAlert({ type: 'success', message: 'Subject deleted successfully!' })
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error deleting subject.' })
    }
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
          {/* Quitamos el recuadro/card y usamos solo el contenido */}
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                background: 'transparent',
                borderBottom: `1px solid ${darkColors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0 18px 0',
              }}
            >
              <h3 style={{ color: darkColors.accent, margin: 0, fontWeight: 700, letterSpacing: 1 }}>
                Materias (Subjects)
              </h3>
              <CButton
                color="warning"
                style={{
                  color: darkColors.background,
                  fontWeight: 600,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #ffb34744',
                }}
                onClick={openAddModal}
              >
                + Nueva Materia
              </CButton>
            </div>
            {alert.message && (
              <CAlert color={alert.type} className="mb-4" dismissible onClose={() => setAlert({ type: '', message: '' })}>
                {alert.message}
              </CAlert>
            )}
            <CTable
              align="middle"
              hover
              responsive
              style={{
                background: darkColors.card,
                color: darkColors.text,
                borderRadius: 12,
                overflow: 'hidden',
                marginTop: 18,
              }}
            >
              <CTableHead>
                <CTableRow style={{ background: '#23262F' }}>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Programa</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Nombre</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Descripción</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Créditos</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent, textAlign: 'center' }}>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {subjects.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={5} className="text-center" style={{ color: darkColors.secondary }}>
                      No hay materias registradas.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  subjects.map((subject) => (
                    <CTableRow key={subject.id}>
                      <CTableDataCell>
                        {programs.find((p) => p.id === subject.program_id)?.name || 'Sin programa'}
                      </CTableDataCell>
                      <CTableDataCell>{subject.name}</CTableDataCell>
                      <CTableDataCell>
                        <span style={{ color: darkColors.secondary }}>{subject.description}</span>
                      </CTableDataCell>
                      <CTableDataCell>{subject.credits}</CTableDataCell>
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
                          onClick={() => openEditModal(subject)}
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
                          onClick={() => handleDelete(subject)}
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

      {/* Modal para agregar/editar materia */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} alignment="center">
        <CModalHeader style={{ background: darkColors.card }}>
          <CModalTitle style={{ color: darkColors.accent }}>
            {editMode ? 'Editar Materia' : 'Nueva Materia'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: darkColors.card }}>
          <CForm onSubmit={handleSubmit}>
            <CFormSelect
              className="mb-3"
              label="Programa"
              name="program_id"
              value={formData.program_id}
              onChange={handleInputChange}
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            >
              <option value="">Selecciona un programa</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              className="mb-3"
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            <CFormTextarea
              className="mb-3"
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            <CFormInput
              className="mb-3"
              label="Créditos"
              name="credits"
              type="number"
              min={1}
              value={formData.credits}
              onChange={handleInputChange}
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
            />
            <CModalFooter style={{ background: darkColors.card }}>
              <CButton color="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </CButton>
              <CButton color="warning" type="submit" style={{ color: darkColors.background, fontWeight: 600 }}>
                {editMode ? 'Guardar Cambios' : 'Agregar Materia'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Subjects