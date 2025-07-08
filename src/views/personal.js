import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CBadge, CInputGroup, CInputGroupText, CFormSelect
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const personalMock = [
  {
    id: 1,
    nombre_empleado: 'Juan Pérez',
    cargo: 'Supervisor de Siembra',
    fecha_contratacion: '2023-03-15',
    salario: 1800.00,
    telefono: '3001234567',
    email: 'juan.perez@email.com',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre_empleado: 'Ana Gómez',
    cargo: 'Contadora',
    fecha_contratacion: '2024-01-10',
    salario: 2200.00,
    telefono: '3009876543',
    email: 'ana.gomez@email.com',
    estado: 'Inactivo'
  }
]

const estadosPersonal = ['Activo', 'Inactivo', 'Vacaciones', 'Suspendido']

const Personal = () => {
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({
    nombre_empleado: '',
    cargo: '',
    fecha_contratacion: '',
    salario: '',
    telefono: '',
    email: '',
    estado: 'Activo'
  })

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroCargo, setFiltroCargo] = useState('')
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setPersonal(personalMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddPersonal = (e) => {
    e.preventDefault()
    setPersonal([
      ...personal,
      {
        id: personal.length + 1,
        ...form,
        salario: parseFloat(form.salario)
      }
    ])
    setVisible(false)
    setForm({
      nombre_empleado: '',
      cargo: '',
      fecha_contratacion: '',
      salario: '',
      telefono: '',
      email: '',
      estado: 'Activo'
    })
  }

  // Filtro funcional y visualmente ordenado
  const personalFiltrado = personal.filter((item) => {
    const matchEstado = filtroEstado ? item.estado === filtroEstado : true
    const matchCargo = filtroCargo ? item.cargo.toLowerCase().includes(filtroCargo.toLowerCase()) : true
    const matchNombre = filtroNombre ? item.nombre_empleado.toLowerCase().includes(filtroNombre.toLowerCase()) : true
    const matchFechaDesde = filtroFechaDesde ? item.fecha_contratacion >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? item.fecha_contratacion <= filtroFechaHasta : true
    return matchEstado && matchCargo && matchNombre && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #F4F1BB 60%, #ED6A5A 100%)', border: 'none', boxShadow: '0 2px 16px 0 #ED6A5A33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#36C9C6', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Personal</h5>
        <CButton color="light" style={{ color: '#36C9C6', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nuevo Empleado
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros organizados */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#E6EBE0', borderRadius: 8, padding: 16 }}>
          <CFormInput
            size="sm"
            style={{ maxWidth: 180 }}
            label="Nombre"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
          />
          <CFormInput
            size="sm"
            style={{ maxWidth: 160 }}
            label="Cargo"
            placeholder="Buscar por cargo"
            value={filtroCargo}
            onChange={e => setFiltroCargo(e.target.value)}
          />
          <CFormSelect
            size="sm"
            style={{ maxWidth: 150 }}
            label="Estado"
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            {estadosPersonal.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </CFormSelect>
          <CInputGroup size="sm" style={{ maxWidth: 400 }}>
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
          {(filtroNombre || filtroCargo || filtroEstado || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroNombre('')
              setFiltroCargo('')
              setFiltroEstado('')
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
              <CTableHeaderCell>Cargo</CTableHeaderCell>
              <CTableHeaderCell>Fecha Contratación</CTableHeaderCell>
              <CTableHeaderCell>Salario</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {personalFiltrado.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={8} className="text-center text-muted">
                  No hay empleados registrados con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {personalFiltrado.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#ED6A5A', color: '#fff' }}>
                    {item.nombre_empleado}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#36C9C6', fontWeight: 600 }}>{item.cargo}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha_contratacion}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#ED6A5A', fontWeight: 600 }}>${item.salario.toFixed(2)}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.telefono}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.email}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color={
                    item.estado === 'Activo' ? 'success'
                    : item.estado === 'Inactivo' ? 'secondary'
                    : item.estado === 'Vacaciones' ? 'warning'
                    : 'danger'
                  }>
                    {item.estado}
                  </CBadge>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo empleado */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>Nuevo Empleado</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddPersonal}>
          <CModalBody>
            <CFormInput
              label="Nombre completo"
              name="nombre_empleado"
              value={form.nombre_empleado}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Cargo"
              name="cargo"
              value={form.cargo}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="date"
              label="Fecha de contratación"
              name="fecha_contratacion"
              value={form.fecha_contratacion}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="number"
              step="0.01"
              label="Salario"
              name="salario"
              value={form.salario}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
            <CFormSelect
              className="mt-2"
              label="Estado"
              name="estado"
              value={form.estado}
              onChange={handleInputChange}
              required
            >
              {estadosPersonal.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
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

export default Personal