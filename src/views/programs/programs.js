import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CButton,
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
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilWarning ,cilPlus, cilPencil, cilTrash } from '@coreui/icons'

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

  // Fetch culinary programs from localDB
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:4000/api/programs',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
         });
        if (!response.ok) {
          throw new Error(`Failed to fetch programs: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setPrograms(data)
      } catch (error) {
        console.error('Error fetching programs:', error)
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
        ? `http://localhost:5000/culinary_programs/${editProgram.id}`
        : 'http://localhost:5000/culinary_programs'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(editProgram ? 'Failed to update program' : 'Failed to create program')
      }

      const program = await response.json()

      if (editProgram) {
        setPrograms(programs.map((p) => (p.id === program.id ? program : p)))
      } else {
        setPrograms([...programs, program])
      }

      setModalVisible(false)
      setEditProgram(null)
      setFormData({
        name: '',
        description: '',
        duration_months: '',
        price: '',
      })
      setAlertMessage(editProgram ? 'Programa actualizado con éxito.' : 'Programa creado con éxito.')
    } catch (error) {
      console.error('Error saving program:', error)
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
      const response = await fetch(`http://localhost:5000/culinary_programs/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete program')
      }
      setPrograms(programs.filter((program) => program.id !== id))
      setAlertMessage('Programa eliminado con éxito.')
    } catch (error) {
      console.error('Error deleting program:', error)
      setAlertMessage('Error al eliminar el programa.')
    }
  }

  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h5>Programas Culinarios</h5>
            </CCol>
            <CCol className="text-end">
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Crear Programa
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {alertMessage && (
            <CAlert color="info" className="d-flex align-items-center">
              <CIcon icon={cilWarning} className="me-2" />
              {alertMessage}
            </CAlert>
          )}
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell>Duración</CTableHeaderCell>
                <CTableHeaderCell>Precio</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {programs.map((program) => (
                <CTableRow key={program.id}>
                  <CTableDataCell>{program.id}</CTableDataCell>
                  <CTableDataCell>{program.name}</CTableDataCell>
                  <CTableDataCell>{program.description}</CTableDataCell>
                  <CTableDataCell>{program.duration_months}</CTableDataCell>
                  <CTableDataCell>${program.price}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(program)}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(program.id)}
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

      {/* Modal para Crear/Editar Programa */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>{editProgram ? 'Editar Programa' : 'Crear Programa'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Nombre del Programa"
              required
            />
            
            <CFormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              label="Descripción"
              rows="3"
              required
            />
            <CFormInput
              name="duration_months"
              value={formData.duration_months}
              onChange={handleChange}
              label="Duración (en meses)"
              required
            />
            <CFormInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              label="Precio (en USD)"
              type="number"
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CContainer>
  )
}

export default Programs