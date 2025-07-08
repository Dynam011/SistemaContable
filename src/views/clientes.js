import { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const clientesMock = [
  {
    id: 1,
    nombre_cliente: 'Carlos Ramírez',
    direccion: 'Calle 123 #45-67',
    telefono: '3001112233',
    email: 'carlos@email.com',
    fecha_registro: '2025-07-01 09:30'
  },
  {
    id: 2,
    nombre_cliente: 'María López',
    direccion: 'Carrera 10 #20-30',
    telefono: '3002223344',
    email: 'maria@email.com',
    fecha_registro: '2025-07-05 14:15'
  }
]

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({
    nombre_cliente: '',
    direccion: '',
    telefono: '',
    email: '',
    fecha_registro: ''
  })

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroTelefono, setFiltroTelefono] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setClientes(clientesMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddCliente = (e) => {
    e.preventDefault()
    setClientes([
      ...clientes,
      {
        id: clientes.length + 1,
        ...form
      }
    ])
    setVisible(false)
    setForm({
      nombre_cliente: '',
      direccion: '',
      telefono: '',
      email: '',
      fecha_registro: ''
    })
  }

  // Filtro funcional y visualmente ordenado
  const clientesFiltrados = clientes.filter((item) => {
    const matchNombre = filtroNombre ? item.nombre_cliente.toLowerCase().includes(filtroNombre.toLowerCase()) : true
    const matchTelefono = filtroTelefono ? item.telefono.includes(filtroTelefono) : true
    const fechaRegistro = item.fecha_registro.slice(0, 10)
    const matchFechaDesde = filtroFechaDesde ? fechaRegistro >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? fechaRegistro <= filtroFechaHasta : true
    return matchNombre && matchTelefono && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #E6EBE0 60%, #9BC1BC 100%)', border: 'none', boxShadow: '0 2px 16px 0 #9BC1BC33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#ED6A5A', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Clientes</h5>
        <CButton color="light" style={{ color: '#ED6A5A', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nuevo Cliente
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros organizados */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}>
          <CFormInput
            size="sm"
            style={{ maxWidth: 200 }}
            label="Nombre"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
          />
          <CFormInput
            size="sm"
            style={{ maxWidth: 160 }}
            label="Teléfono"
            placeholder="Buscar por teléfono"
            value={filtroTelefono}
            onChange={e => setFiltroTelefono(e.target.value)}
          />
          <CInputGroup size="sm" style={{ maxWidth: 260 }}>
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
          {(filtroNombre || filtroTelefono || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroNombre('')
              setFiltroTelefono('')
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
              <CTableHeaderCell>Dirección</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Fecha Registro</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clientesFiltrados.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center text-muted">
                  No hay clientes registrados con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {clientesFiltrados.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}>
                    {item.nombre_cliente}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.direccion}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.telefono}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.email}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha_registro}
                  </span>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo cliente */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#ED6A5A', color: '#fff' }}>
          <strong>Nuevo Cliente</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddCliente}>
          <CModalBody>
            <CFormInput
              label="Nombre completo"
              name="nombre_cliente"
              value={form.nombre_cliente}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Dirección"
              name="direccion"
              value={form.direccion}
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
            <CFormInput
              className="mt-2"
              type="datetime-local"
              label="Fecha de registro"
              name="fecha_registro"
              value={form.fecha_registro}
              onChange={handleInputChange}
              required
            />
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

export default Clientes