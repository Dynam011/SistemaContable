import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CFormSelect, CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const productosMock = [
  { id: 1, nombre: 'Papa Negra' },
  { id: 2, nombre: 'Papa Blanca' },
  { id: 3, nombre: 'Papa Criolla' },
]

const inventarioMock = [
  {
    id: 1,
    producto_id: 1,
    producto: 'Papa Negra',
    cantidad_disponible: 1200,
    fecha_ultima_actualizacion: '2025-07-07 09:00'
  },
  {
    id: 2,
    producto_id: 2,
    producto: 'Papa Blanca',
    cantidad_disponible: 800,
    fecha_ultima_actualizacion: '2025-07-06 16:30'
  }
]

const Inventario = () => {
  const [inventario, setInventario] = useState([])
  const [productos, setProductos] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({
    producto_id: '',
    cantidad_disponible: '',
    fecha_ultima_actualizacion: ''
  })

  // Filtros
  const [filtroProducto, setFiltroProducto] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setInventario(inventarioMock)
    setProductos(productosMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddInventario = (e) => {
    e.preventDefault()
    const producto = productos.find(p => p.id === parseInt(form.producto_id))
    setInventario([
      ...inventario,
      {
        id: inventario.length + 1,
        producto_id: parseInt(form.producto_id),
        producto: producto ? producto.nombre : '',
        cantidad_disponible: parseInt(form.cantidad_disponible),
        fecha_ultima_actualizacion: form.fecha_ultima_actualizacion
      }
    ])
    setVisible(false)
    setForm({
      producto_id: '',
      cantidad_disponible: '',
      fecha_ultima_actualizacion: ''
    })
  }

  // Filtro funcional
  const inventarioFiltrado = inventario.filter((item) => {
    const matchProducto = filtroProducto ? item.producto_id === parseInt(filtroProducto) : true
    const fechaActualizacion = item.fecha_ultima_actualizacion.slice(0, 10)
    const matchFechaDesde = filtroFechaDesde ? fechaActualizacion >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? fechaActualizacion <= filtroFechaHasta : true
    return matchProducto && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #F4F1BB 60%, #9BC1BC 100%)', border: 'none', boxShadow: '0 2px 16px 0 #9BC1BC33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#36C9C6', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Inventario</h5>
        <CButton color="light" style={{ color: '#36C9C6', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nuevo Registro
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros */}
        <div className="mb-4 d-flex flex-wrap gap-2 align-items-end" style={{ background: '#E6EBE0', borderRadius: 8, padding: 12 }}>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 200 }}
            label="Producto"
            value={filtroProducto}
            onChange={e => setFiltroProducto(e.target.value)}
          >
            <option value="">Todos los productos</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </CFormSelect>
          <CInputGroup size="sm" style={{ maxWidth: 500 }}>
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
          {(filtroProducto || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroProducto('')
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
              <CTableHeaderCell>Producto</CTableHeaderCell>
              <CTableHeaderCell>Cantidad Disponible</CTableHeaderCell>
              <CTableHeaderCell>Última Actualización</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {inventarioFiltrado.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={4} className="text-center text-muted">
                  No hay registros de inventario con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {inventarioFiltrado.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#ED6A5A', color: '#fff' }}>
                    {item.producto}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#36C9C6', fontWeight: 600 }}>{item.cantidad_disponible}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha_ultima_actualizacion}
                  </span>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo registro */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>Nuevo Registro de Inventario</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddInventario}>
          <CModalBody>
            <CFormSelect
              label="Producto"
              name="producto_id"
              value={form.producto_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </CFormSelect>
            <CFormInput
              className="mt-2"
              type="number"
              min={0}
              label="Cantidad disponible"
              name="cantidad_disponible"
              value={form.cantidad_disponible}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="datetime-local"
              label="Fecha de última actualización"
              name="fecha_ultima_actualizacion"
              value={form.fecha_ultima_actualizacion}
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

export default Inventario