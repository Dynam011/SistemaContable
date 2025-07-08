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

const personalMock = [
  { id: 1, nombre_empleado: 'Juan Pérez' },
  { id: 2, nombre_empleado: 'Ana Gómez' }
]

const produccionMock = [
  {
    id: 1,
    producto_id: 1,
    producto: 'Papa Negra',
    fecha_siembra: '2025-05-01',
    fecha_cosecha: '2025-08-01',
    cantidad_esperada: 2000,
    cantidad_cosechada: 1950,
    area_cultivo: 3.5,
    costo_produccion: 12000,
    responsable_id: 1,
    responsable: 'Juan Pérez'
  },
  {
    id: 2,
    producto_id: 2,
    producto: 'Papa Blanca',
    fecha_siembra: '2025-06-10',
    fecha_cosecha: '2025-09-10',
    cantidad_esperada: 1500,
    cantidad_cosechada: 0,
    area_cultivo: 2.2,
    costo_produccion: 9000,
    responsable_id: 2,
    responsable: 'Ana Gómez'
  }
]

const Produccion = () => {
  const [produccion, setProduccion] = useState([])
  const [productos, setProductos] = useState([])
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({
    producto_id: '',
    fecha_siembra: '',
    fecha_cosecha: '',
    cantidad_esperada: '',
    cantidad_cosechada: '',
    area_cultivo: '',
    costo_produccion: '',
    responsable_id: ''
  })

  // Filtros
  const [filtroProducto, setFiltroProducto] = useState('')
  const [filtroResponsable, setFiltroResponsable] = useState('')
  const [filtroFechaSiembraDesde, setFiltroFechaSiembraDesde] = useState('')
  const [filtroFechaSiembraHasta, setFiltroFechaSiembraHasta] = useState('')
  const [filtroFechaCosechaDesde, setFiltroFechaCosechaDesde] = useState('')
  const [filtroFechaCosechaHasta, setFiltroFechaCosechaHasta] = useState('')

  useEffect(() => {
    setProduccion(produccionMock)
    setProductos(productosMock)
    setPersonal(personalMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddProduccion = (e) => {
    e.preventDefault()
    const producto = productos.find(p => p.id === parseInt(form.producto_id))
    const responsable = personal.find(p => p.id === parseInt(form.responsable_id))
    setProduccion([
      ...produccion,
      {
        id: produccion.length + 1,
        producto_id: parseInt(form.producto_id),
        producto: producto ? producto.nombre : '',
        fecha_siembra: form.fecha_siembra,
        fecha_cosecha: form.fecha_cosecha,
        cantidad_esperada: parseFloat(form.cantidad_esperada),
        cantidad_cosechada: parseFloat(form.cantidad_cosechada),
        area_cultivo: parseFloat(form.area_cultivo),
        costo_produccion: parseFloat(form.costo_produccion),
        responsable_id: parseInt(form.responsable_id),
        responsable: responsable ? responsable.nombre_empleado : ''
      }
    ])
    setVisible(false)
    setForm({
      producto_id: '',
      fecha_siembra: '',
      fecha_cosecha: '',
      cantidad_esperada: '',
      cantidad_cosechada: '',
      area_cultivo: '',
      costo_produccion: '',
      responsable_id: ''
    })
  }

  // Filtro funcional y visualmente ordenado
  const produccionFiltrada = produccion.filter((item) => {
    const matchProducto = filtroProducto ? item.producto_id === parseInt(filtroProducto) : true
    const matchResponsable = filtroResponsable ? item.responsable_id === parseInt(filtroResponsable) : true
    const matchSiembraDesde = filtroFechaSiembraDesde ? item.fecha_siembra >= filtroFechaSiembraDesde : true
    const matchSiembraHasta = filtroFechaSiembraHasta ? item.fecha_siembra <= filtroFechaSiembraHasta : true
    const matchCosechaDesde = filtroFechaCosechaDesde ? item.fecha_cosecha >= filtroFechaCosechaDesde : true
    const matchCosechaHasta = filtroFechaCosechaHasta ? item.fecha_cosecha <= filtroFechaCosechaHasta : true
    return matchProducto && matchResponsable && matchSiembraDesde && matchSiembraHasta && matchCosechaDesde && matchCosechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #F4F1BB 60%, #36C9C6 100%)', border: 'none', boxShadow: '0 2px 16px 0 #36C9C633' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#ED6A5A', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Producción</h5>
        <CButton color="light" style={{ color: '#ED6A5A', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nueva Producción
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros organizados */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#E6EBE0', borderRadius: 8, padding: 16 }}>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 180 }}
            label="Producto"
            value={filtroProducto}
            onChange={e => setFiltroProducto(e.target.value)}
          >
            <option value="">Todos los productos</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </CFormSelect>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 180 }}
            label="Responsable"
            value={filtroResponsable}
            onChange={e => setFiltroResponsable(e.target.value)}
          >
            <option value="">Todos los responsables</option>
            {personal.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre_empleado}</option>
            ))}
          </CFormSelect>
          <CInputGroup size="sm" style={{ maxWidth: 320 }}>
            <CInputGroupText>Siembra Desde</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaSiembraDesde}
              onChange={e => setFiltroFechaSiembraDesde(e.target.value)}
            />
            <CInputGroupText>Hasta</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaSiembraHasta}
              onChange={e => setFiltroFechaSiembraHasta(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup size="sm" style={{ maxWidth: 320 }}>
            <CInputGroupText>Cosecha Desde</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaCosechaDesde}
              onChange={e => setFiltroFechaCosechaDesde(e.target.value)}
            />
            <CInputGroupText>Hasta</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaCosechaHasta}
              onChange={e => setFiltroFechaCosechaHasta(e.target.value)}
            />
          </CInputGroup>
          {(filtroProducto || filtroResponsable || filtroFechaSiembraDesde || filtroFechaSiembraHasta || filtroFechaCosechaDesde || filtroFechaCosechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroProducto('')
              setFiltroResponsable('')
              setFiltroFechaSiembraDesde('')
              setFiltroFechaSiembraHasta('')
              setFiltroFechaCosechaDesde('')
              setFiltroFechaCosechaHasta('')
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
              <CTableHeaderCell>Siembra</CTableHeaderCell>
              <CTableHeaderCell>Cosecha</CTableHeaderCell>
              <CTableHeaderCell>Cant. Esperada</CTableHeaderCell>
              <CTableHeaderCell>Cant. Cosechada</CTableHeaderCell>
              <CTableHeaderCell>Área (ha)</CTableHeaderCell>
              <CTableHeaderCell>Costo</CTableHeaderCell>
              <CTableHeaderCell>Responsable</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {produccionFiltrada.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={9} className="text-center text-muted">
                  No hay registros de producción con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {produccionFiltrada.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}>
                    {item.producto}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha_siembra}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha_cosecha}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222', fontWeight: 600 }}>{item.cantidad_esperada}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#36C9C6', fontWeight: 600 }}>{item.cantidad_cosechada}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#ED6A5A', fontWeight: 600 }}>{item.area_cultivo}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#ED6A5A', fontWeight: 600 }}>${item.costo_produccion.toFixed(2)}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="secondary" style={{ fontSize: 13 }}>
                    {item.responsable}
                  </CBadge>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nueva producción */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#ED6A5A', color: '#fff' }}>
          <strong>Nueva Producción</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddProduccion}>
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
              type="date"
              label="Fecha de siembra"
              name="fecha_siembra"
              value={form.fecha_siembra}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="date"
              label="Fecha de cosecha"
              name="fecha_cosecha"
              value={form.fecha_cosecha}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="number"
              step="0.01"
              label="Cantidad esperada"
              name="cantidad_esperada"
              value={form.cantidad_esperada}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="number"
              step="0.01"
              label="Cantidad cosechada"
              name="cantidad_cosechada"
              value={form.cantidad_cosechada}
              onChange={handleInputChange}
            />
            <CFormInput
              className="mt-2"
              type="number"
              step="0.01"
              label="Área de cultivo (ha)"
              name="area_cultivo"
              value={form.area_cultivo}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="number"
              step="0.01"
              label="Costo de producción"
              name="costo_produccion"
              value={form.costo_produccion}
              onChange={handleInputChange}
              required
            />
            <CFormSelect
              className="mt-2"
              label="Responsable"
              name="responsable_id"
              value={form.responsable_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione responsable</option>
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

export default Produccion