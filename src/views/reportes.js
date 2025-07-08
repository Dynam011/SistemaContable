import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CFormTextarea, CFormSelect, CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const personalMock = [
  { id: 1, nombre_empleado: 'Juan Pérez' },
  { id: 2, nombre_empleado: 'Ana Gómez' }
]

const reportesMock = [
  {
    id: 1,
    nombre_reporte: 'Reporte de Ventas Mensuales',
    fecha_generacion: '2025-07-01 10:00',
    contenido_reporte: 'Resumen de ventas de junio...',
    generado_por: 1,
    nombre_personal: 'Juan Pérez'
  },
  {
    id: 2,
    nombre_reporte: 'Reporte de Compras',
    fecha_generacion: '2025-07-05 15:30',
    contenido_reporte: 'Resumen de compras de julio...',
    generado_por: 2,
    nombre_personal: 'Ana Gómez'
  }
]

const Reportes = () => {
  const [reportes, setReportes] = useState([])
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({
    nombre_reporte: '',
    fecha_generacion: '',
    contenido_reporte: '',
    generado_por: ''
  })

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroPersonal, setFiltroPersonal] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setReportes(reportesMock)
    setPersonal(personalMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddReporte = (e) => {
    e.preventDefault()
    const persona = personal.find(p => p.id === parseInt(form.generado_por))
    setReportes([
      ...reportes,
      {
        id: reportes.length + 1,
        ...form,
        generado_por: parseInt(form.generado_por),
        nombre_personal: persona ? persona.nombre_empleado : ''
      }
    ])
    setVisible(false)
    setForm({
      nombre_reporte: '',
      fecha_generacion: '',
      contenido_reporte: '',
      generado_por: ''
    })
  }

  // Filtro funcional y visualmente ordenado
  const reportesFiltrados = reportes.filter((item) => {
    const matchNombre = filtroNombre ? item.nombre_reporte.toLowerCase().includes(filtroNombre.toLowerCase()) : true
    const matchPersonal = filtroPersonal ? item.generado_por === parseInt(filtroPersonal) : true
    const fechaGen = item.fecha_generacion.slice(0, 10)
    const matchFechaDesde = filtroFechaDesde ? fechaGen >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? fechaGen <= filtroFechaHasta : true
    return matchNombre && matchPersonal && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #E6EBE0 60%, #F4F1BB 100%)', border: 'none', boxShadow: '0 2px 16px 0 #ED6A5A33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#36C9C6', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Reportes</h5>
        <CButton color="light" style={{ color: '#36C9C6', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nuevo Reporte
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros organizados */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}>
          <CFormInput
            size="sm"
            style={{ maxWidth: 220 }}
            label="Nombre"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
          />
          <CFormSelect
            size="sm"
            style={{ maxWidth: 180 }}
            label="Generado por"
            value={filtroPersonal}
            onChange={e => setFiltroPersonal(e.target.value)}
          >
            <option value="">Todo el personal</option>
            {personal.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre_empleado}</option>
            ))}
          </CFormSelect>
          <CInputGroup size="sm" style={{ maxWidth: 320 }}>
            <CInputGroupText>Desde</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaDesde}
              onChange={e => setFiltroFechaDesde(e.target.value)}
            />
            <CInputGroupText>Hasta</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaHasta}
              onChange={e => setFiltroFechaHasta(e.target.value)}
            />
          </CInputGroup>
          {(filtroNombre || filtroPersonal || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroNombre('')
              setFiltroPersonal('')
              setFiltroFechaDesde('')
              setFiltroFechaHasta('')
            }}>
              Limpiar filtros
            </CButton>
          )}
        </div>
        {/* Tabla */}
        <CTable hover responsive bordered align="middle" className="shadow-sm" style={{ background: '#fff', borderRadius: 8 }}>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Fecha Generación</CTableHeaderCell>
              <CTableHeaderCell>Contenido</CTableHeaderCell>
              <CTableHeaderCell>Generado por</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {reportesFiltrados.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center text-muted">
                  No hay reportes registrados con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {reportesFiltrados.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}>
                    {item.nombre_reporte}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha_generacion}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>
                    {item.contenido_reporte.length > 60
                      ? item.contenido_reporte.slice(0, 60) + '...'
                      : item.contenido_reporte}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="secondary">{item.nombre_personal}</CBadge>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo reporte */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>Nuevo Reporte</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddReporte}>
          <CModalBody>
            <CFormInput
              label="Nombre del reporte"
              name="nombre_reporte"
              value={form.nombre_reporte}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="datetime-local"
              label="Fecha de generación"
              name="fecha_generacion"
              value={form.fecha_generacion}
              onChange={handleInputChange}
              required
            />
            <CFormTextarea
              className="mt-2"
              label="Contenido del reporte"
              name="contenido_reporte"
              value={form.contenido_reporte}
              onChange={handleInputChange}
              rows={4}
              required
            />
            <CFormSelect
              className="mt-2"
              label="Generado por"
              name="generado_por"
              value={form.generado_por}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione personal</option>
              {personal.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre_empleado}</option>
              ))}
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Reportes