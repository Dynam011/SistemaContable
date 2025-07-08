import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CFormSelect, CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const proveedoresMock = [
  { id: 1, nombre: 'Proveedor A' },
  { id: 2, nombre: 'Proveedor B' },
]

const productosMock = [
  { id: 1, nombre: 'Papa Negra' },
  { id: 2, nombre: 'Papa Blanca' },
  { id: 3, nombre: 'Papa Criolla' },
]

const comprasMock = [
  {
    id: 1,
    proveedor_id: 1,
    proveedor: 'Proveedor A',
    fecha_compra: '2025-07-07 10:00',
    total_compra: 1500.50,
    estado_compra: 'Pagada',
    detalle: [
      {
        id: 1,
        compra_id: 1,
        producto_id: 1,
        producto: 'Papa Negra',
        cantidad: 10,
        precio_unitario_compra: 100,
        subtotal: 1000
      },
      {
        id: 2,
        compra_id: 1,
        producto_id: 2,
        producto: 'Papa Blanca',
        cantidad: 5,
        precio_unitario_compra: 100.1,
        subtotal: 500.5
      }
    ]
  },
  {
    id: 2,
    proveedor_id: 2,
    proveedor: 'Proveedor B',
    fecha_compra: '2025-07-06 15:30',
    total_compra: 800.00,
    estado_compra: 'Pendiente',
    detalle: [
      {
        id: 3,
        compra_id: 2,
        producto_id: 3,
        producto: 'Papa Criolla',
        cantidad: 8,
        precio_unitario_compra: 100,
        subtotal: 800
      }
    ]
  }
]

const estadoColors = {
  'Pendiente': 'warning',
  'Pagada': 'success',
  'Anulada': 'danger'
}

const Compras = () => {
  const [compras, setCompras] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [productos, setProductos] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleDetalle, setVisibleDetalle] = useState(false)
  const [detalleSeleccionado, setDetalleSeleccionado] = useState([])
  const [form, setForm] = useState({
    proveedor_id: '',
    fecha_compra: '',
    total_compra: '',
    estado_compra: 'Pendiente'
  })
  const [detalleCompra, setDetalleCompra] = useState([])

  // Filtros
  const [filtroProveedor, setFiltroProveedor] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setCompras(comprasMock)
    setProveedores(proveedoresMock)
    setProductos(productosMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Detalle de compra handlers
  const handleDetalleChange = (idx, field, value) => {
    const updated = detalleCompra.map((item, i) =>
      i === idx
        ? {
            ...item,
            [field]: value,
            subtotal:
              field === 'cantidad' || field === 'precio_unitario_compra'
                ? (field === 'cantidad'
                    ? value
                    : item.cantidad || 0) *
                  (field === 'precio_unitario_compra'
                    ? value
                    : item.precio_unitario_compra || 0)
                : item.subtotal
          }
        : item
    )
    setDetalleCompra(updated)
  }

  const handleAddDetalle = () => {
    setDetalleCompra([
      ...detalleCompra,
      {
        producto_id: '',
        cantidad: '',
        precio_unitario_compra: '',
        subtotal: 0
      }
    ])
  }

  const handleRemoveDetalle = (idx) => {
    setDetalleCompra(detalleCompra.filter((_, i) => i !== idx))
  }

  const calcularTotal = () => {
    return detalleCompra.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)
  }

  const handleAddCompra = (e) => {
    e.preventDefault()
    const proveedor = proveedores.find(p => p.id === parseInt(form.proveedor_id))
    // Armar detalle con nombres de producto
    const detalleConNombres = detalleCompra.map((d, idx) => {
      const prod = productos.find(p => p.id === parseInt(d.producto_id))
      return {
        id: idx + 1,
        compra_id: compras.length + 1,
        producto_id: parseInt(d.producto_id),
        producto: prod ? prod.nombre : '',
        cantidad: parseInt(d.cantidad),
        precio_unitario_compra: parseFloat(d.precio_unitario_compra),
        subtotal: parseFloat(d.subtotal)
      }
    })
    setCompras([
      ...compras,
      {
        id: compras.length + 1,
        proveedor_id: parseInt(form.proveedor_id),
        proveedor: proveedor ? proveedor.nombre : '',
        fecha_compra: form.fecha_compra,
        total_compra: calcularTotal(),
        estado_compra: form.estado_compra,
        detalle: detalleConNombres
      }
    ])
    setVisible(false)
    setForm({
      proveedor_id: '',
      fecha_compra: '',
      total_compra: '',
      estado_compra: 'Pendiente'
    })
    setDetalleCompra([])
  }

  // Filtro creativo y funcional
  const comprasFiltradas = compras.filter((compra) => {
    const matchProveedor = filtroProveedor ? compra.proveedor_id === parseInt(filtroProveedor) : true
    const matchEstado = filtroEstado ? compra.estado_compra === filtroEstado : true
    const fechaCompra = compra.fecha_compra.slice(0, 10)
    const matchFechaDesde = filtroFechaDesde ? fechaCompra >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? fechaCompra <= filtroFechaHasta : true
    return matchProveedor && matchEstado && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #E6EBE0 60%, #9BC1BC 100%)', border: 'none', boxShadow: '0 2px 16px 0 #9BC1BC33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#ED6A5A', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Compras</h5>
        <CButton color="light" style={{ color: '#ED6A5A', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nueva Compra
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros */}
        <div className="mb-4 d-flex flex-wrap gap-2 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 12 }}>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 180 }}
            label="Proveedor"
            value={filtroProveedor}
            onChange={e => setFiltroProveedor(e.target.value)}
          >
            <option value="">Todos los proveedores</option>
            {proveedores.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </CFormSelect>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 150 }}
            label="Estado"
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option>Pendiente</option>
            <option>Pagada</option>
            <option>Anulada</option>
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
          {(filtroProveedor || filtroEstado || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroProveedor('')
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
              <CTableHeaderCell>Proveedor</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Total</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell>Detalle</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {comprasFiltradas.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center text-muted">
                  No hay compras registradas con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {comprasFiltradas.map((compra) => (
              <CTableRow key={compra.id}>
                <CTableDataCell>{compra.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}>
                    {compra.proveedor}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {compra.fecha_compra}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#ED6A5A', fontWeight: 600 }}>${compra.total_compra.toFixed(2)}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color={estadoColors[compra.estado_compra] || 'secondary'}>
                    {compra.estado_compra}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDetalleSeleccionado(compra.detalle || [])
                      setVisibleDetalle(true)
                    }}
                  >
                    Ver Detalle
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nueva compra */}
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader style={{ background: '#ED6A5A', color: '#fff' }}>
          <strong>Nueva Compra</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddCompra}>
          <CModalBody>
            <CFormSelect
              label="Proveedor"
              name="proveedor_id"
              value={form.proveedor_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione proveedor</option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </CFormSelect>
            <CFormInput
              className="mt-2"
              type="datetime-local"
              label="Fecha de compra"
              name="fecha_compra"
              value={form.fecha_compra}
              onChange={handleInputChange}
              required
            />
            <div className="mt-4 mb-2">
              <strong>Detalle de la compra</strong>
              <CButton color="success" size="sm" className="ms-2" onClick={handleAddDetalle}>
                + Agregar producto
              </CButton>
            </div>
            <CTable bordered small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Producto</CTableHeaderCell>
                  <CTableHeaderCell>Cantidad</CTableHeaderCell>
                  <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                  <CTableHeaderCell>Subtotal</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {detalleCompra.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan={5} className="text-center text-muted">
                      Agregue productos a la compra.
                    </CTableDataCell>
                  </CTableRow>
                )}
                {detalleCompra.map((item, idx) => (
                  <CTableRow key={idx}>
                    <CTableDataCell>
                      <CFormSelect
                        size="sm"
                        value={item.producto_id}
                        onChange={e => handleDetalleChange(idx, 'producto_id', e.target.value)}
                        required
                      >
                        <option value="">Seleccione producto</option>
                        {productos.map((p) => (
                          <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        size="sm"
                        type="number"
                        min={1}
                        value={item.cantidad}
                        onChange={e => handleDetalleChange(idx, 'cantidad', parseInt(e.target.value) || '')}
                        required
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        size="sm"
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.precio_unitario_compra}
                        onChange={e => handleDetalleChange(idx, 'precio_unitario_compra', parseFloat(e.target.value) || '')}
                        required
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span style={{ color: '#ED6A5A', fontWeight: 600 }}>
                        ${item.subtotal ? Number(item.subtotal).toFixed(2) : '0.00'}
                      </span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" size="sm" variant="outline" onClick={() => handleRemoveDetalle(idx)}>
                        Quitar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="text-end mt-2">
              <strong>Total: </strong>
              <span style={{ color: '#36C9C6', fontWeight: 700, fontSize: 18 }}>
                ${calcularTotal().toFixed(2)}
              </span>
            </div>
            <CFormSelect
              className="mt-2"
              label="Estado"
              name="estado_compra"
              value={form.estado_compra}
              onChange={handleInputChange}
              required
            >
              <option>Pendiente</option>
              <option>Pagada</option>
              <option>Anulada</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit" disabled={detalleCompra.length === 0}>
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal Detalle Compra */}
      <CModal visible={visibleDetalle} onClose={() => setVisibleDetalle(false)}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>Detalle de la Compra</strong>
        </CModalHeader>
        <CModalBody>
          <CTable bordered small>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell>Cantidad</CTableHeaderCell>
                <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                <CTableHeaderCell>Subtotal</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {detalleSeleccionado.length === 0 && (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center text-muted">
                    Sin productos en esta compra.
                  </CTableDataCell>
                </CTableRow>
              )}
              {detalleSeleccionado.map((item, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{item.producto}</CTableDataCell>
                  <CTableDataCell>{item.cantidad}</CTableDataCell>
                  <CTableDataCell>${Number(item.precio_unitario_compra).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>${Number(item.subtotal).toFixed(2)}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetalle(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Compras