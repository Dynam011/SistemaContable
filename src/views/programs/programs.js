import React, { useState, useEffect } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CCol,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilPlus, cilPencil, cilTrash } from '@coreui/icons'

const darkColors = {
  card: '#23262F',
  accent: '#FFB347',
  text: '#F5F6FA',
  secondary: '#A3A7B7',
  border: '#31344b',

}

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [editProgram, setEditProgram] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_months: '',
  })
  const [errors, setErrors] = useState({})
  const [alertMessage, setAlertMessage] = useState('')

  // Fetch culinary programs from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://culinary-school-back.onrender.com/api/programs', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch programs: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setPrograms(data)
      } catch (error) {
        setAlertMessage('Failed to load programs.')
      }
    }
    fetchPrograms()
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'El nombre del programa es obligatorio.'
    if (!formData.description) newErrors.description = 'La descripción es obligatoria.'
    if (!formData.duration_months) newErrors.duration_months = 'La duración es obligatoria.'
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'El precio debe ser un número válido.'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
      const method = editProgram ? 'PUT' : 'POST'
      const url = editProgram
        ? `https://culinary-school-back.onrender.com/api/programs/${editProgram.id}`
        : 'https://culinary-school-back.onrender.com/api/programs'

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
        throw new Error(editProgram ? 'Failed to update program' : 'Failed to create program')
      }

      const program = await response.json()

      if (editProgram) {
        setPrograms(programs.map((p) => (p.id === program.id ? program : p)))
        setAlertMessage('Programa actualizado con éxito.')
      } else {
        setPrograms([...programs, program])
        setAlertMessage('Programa creado con éxito.')
      }

      setModalVisible(false)
      setEditProgram(null)
      setFormData({
        name: '',
        description: '',
        duration_months: '',
        price: '',
      })
    } catch (error) {
      setAlertMessage('Error al guardar el programa.')
    }
  }

  const handleEdit = (program) => {
    setEditProgram(program)
    setFormData({
      name: program.name,
      description: program.description,
      duration_months: program.duration_months,
      price: program.price,
    })
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`https://culinary-school-back.onrender.com/api/programs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to delete program')
      }
      setPrograms(programs.filter((program) => program.id !== id))
      setAlertMessage('Programa eliminado con éxito.')
    } catch (error) {
      setAlertMessage('Error al eliminar el programa.')
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
                Programas Culinarios
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
                  setEditProgram(null)
                  setFormData({
                    name: '',
                    description: '',
                    duration_months: '',
                    price: '',
                  })
                }}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Crear Programa
              </CButton>
            </div>
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
                  <CTableHeaderCell style={{ color: darkColors.accent }}>#</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Nombre</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Descripción</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Duración</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Precio</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent, textAlign: 'center' }}>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {programs.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center" style={{ color: darkColors.secondary }}>
                      No hay programas registrados.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  programs.map((program) => (
                    <CTableRow key={program.id}>
                      <CTableDataCell>{program.id}</CTableDataCell>
                      <CTableDataCell>{program.name}</CTableDataCell>
                      <CTableDataCell>
                        <span style={{ color: darkColors.secondary }}>{program.description}</span>
                      </CTableDataCell>
                      <CTableDataCell>{program.duration_months} meses</CTableDataCell>
                      <CTableDataCell>${program.price}</CTableDataCell>
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
                          onClick={() => handleEdit(program)}
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
                          onClick={() => handleDelete(program.id)}
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

      {/* Modal para Crear/Editar Programa */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} alignment="center">
        <CForm onSubmit={handleSubmit}>
          <CModalHeader style={{ background: darkColors.card }}>
            <CModalTitle style={{ color: darkColors.accent }}>
              {editProgram ? 'Editar Programa' : 'Crear Programa'}
            </CModalTitle>
          </CModalHeader>
          <CModalBody style={{ background: darkColors.card }}>
            <CFormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Nombre del Programa"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
              feedback={errors.name}
              invalid={!!errors.name}
            />
            <CFormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              label="Descripción"
              rows="3"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
              feedback={errors.description}
              invalid={!!errors.description}
            />
            <CFormInput
              name="duration_months"
              value={formData.duration_months}
              onChange={handleChange}
              label="Duración (en meses)"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
              feedback={errors.duration_months}
              invalid={!!errors.duration_months}
            />
            <CFormInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              label="Precio (en USD)"
              type="number"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
              feedback={errors.price}
              invalid={!!errors.price}
            />
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
    </div>
  )
}

export default Programs