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
  CFormTextarea,
  CRow,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilCheckCircle, cilWarning, cilCreditCard } from '@coreui/icons'

const Enrollment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    startDate: '',
    comments: '',
    paymentMethod: '',
    cardNumber: '',
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const courses = [
    { name: 'Cocina Básica', cost: 100 },
    { name: 'Repostería Avanzada', cost: 150 },
    { name: 'Cocina Internacional', cost: 200 },
    { name: 'Chef Profesional', cost: 300 },
  ]

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName) newErrors.fullName = 'El nombre completo es obligatorio.'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.'
    if (!formData.phone || !/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = 'El número de teléfono no es válido.'
    if (!formData.course) newErrors.course = 'Debe seleccionar un curso.'
    if (!formData.startDate) newErrors.startDate = 'Debe seleccionar una fecha de inicio.'
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Debe seleccionar un método de pago.'
    if (formData.paymentMethod === 'Tarjeta de Crédito' && !formData.cardNumber) {
      newErrors.cardNumber = 'Debe ingresar el número de tarjeta.'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      setErrorMessage('Por favor, corrija los errores antes de enviar.')
    } else {
      setErrors({})
      setSuccessMessage('¡Inscripción realizada con éxito!')
      setErrorMessage('')
      console.log('Datos enviados:', formData)
      // Simulación de envío al backend
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          course: '',
          startDate: '',
          comments: '',
          paymentMethod: '',
          cardNumber: '',
        })
      }, 2000)
    }
  }

  const selectedCourse = courses.find((course) => course.name === formData.course)

  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardHeader>
          <h5>Formulario de Inscripción</h5>
        </CCardHeader>
        <CCardBody>
          {successMessage && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon icon={cilCheckCircle} className="me-2" />
              {successMessage}
            </CAlert>
          )}
          {errorMessage && (
            <CAlert color="danger" className="d-flex align-items-center">
              <CIcon icon={cilWarning} className="me-2" />
              {errorMessage}
            </CAlert>
          )}
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Nombre Completo</CFormLabel>
                <CFormInput
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  invalid={!!errors.fullName}
                />
                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
              </CCol>
              <CCol md={6}>
                <CFormLabel>Correo Electrónico</CFormLabel>
                <CFormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  invalid={!!errors.email}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Número de Teléfono</CFormLabel>
                <CFormInput
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  invalid={!!errors.phone}
                />
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
              </CCol>
              <CCol md={6}>
                <CFormLabel>Curso</CFormLabel>
                <CFormSelect
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  invalid={!!errors.course}
                >
                  <option value="">Seleccione un curso</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course.name}>
                      {course.name} - ${course.cost}
                    </option>
                  ))}
                </CFormSelect>
                {errors.course && <small className="text-danger">{errors.course}</small>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Fecha de Inicio</CFormLabel>
                <CFormInput
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  invalid={!!errors.startDate}
                />
                {errors.startDate && <small className="text-danger">{errors.startDate}</small>}
              </CCol>
             

              <CCol md={6}>
                <CFormLabel>Método de Pago</CFormLabel>
                <CFormSelect
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  invalid={!!errors.paymentMethod}
                >
                  <option value="">Seleccione un método de pago</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                  <option value="Efectivo">Efectivo</option>
                </CFormSelect>
                {errors.paymentMethod && <small className="text-danger">{errors.paymentMethod}</small>}
              </CCol>
              {formData.paymentMethod === 'Tarjeta de Crédito' && (
                <CCol md={6}>
                  <CFormLabel>Número de Tarjeta</CFormLabel>
                  <CFormInput
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    invalid={!!errors.cardNumber}
                  />
                  {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
                </CCol>
              )}
            </CRow>
            {selectedCourse && (
              <CRow className="mb-3">
                <CCol>
                  <h6>
                    Costo del Curso: <strong>${selectedCourse.cost}</strong>
                  </h6>
                </CCol>
                <CCol md={6}>
                <CFormLabel>Comentarios o Preguntas</CFormLabel>
                <CFormTextarea
                  name="comments"
                  rows="3"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </CCol>
              </CRow>
            )}
            <CButton type="submit" color="primary">
              Enviar Inscripción
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Enrollment