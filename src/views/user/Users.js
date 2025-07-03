import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
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
import { cilPencil, cilTrash, cilPlus, cilCloudDownload } from '@coreui/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFReportUsers from '../../components/PDFs/PDFReportUsers'

const darkColors = {
  card: '#23262F',
  accent: '#FFB347',
  text: '#F5F6FA',
  secondary: '#A3A7B7',
  border: '#31344b',
}


const UserList = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchFilters, setSearchFilters] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    role_id: '',
  })
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    role_id: '',
    status: '',
  })
  const [alert, setAlert] = useState({ type: '', message: '' })

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://culinary-school-back.onrender.com/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (error) {
        setAlert({ type: 'danger', message: 'Error fetching users.' })
      }
    }
    fetchUsers()
  }, [])

  // Filtrar usuarios en tiempo real
  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        (searchFilters.id === '' || user.id.toString().includes(searchFilters.id)) &&
        (searchFilters.first_name === '' ||
          user.first_name.toLowerCase().includes(searchFilters.first_name.toLowerCase())) &&
        (searchFilters.last_name === '' ||
          user.last_name.toLowerCase().includes(searchFilters.last_name.toLowerCase())) &&
        (searchFilters.email === '' ||
          user.email.toLowerCase().includes(searchFilters.email.toLowerCase())) &&
        (searchFilters.role_id === '' || user.role_id.toString() === searchFilters.role_id)
      )
    })
    setFilteredUsers(filtered)
  }, [searchFilters, users])

  const handleSearchChange = (e) => {
    const { name, value } = e.target
    setSearchFilters({ ...searchFilters, [name]: value })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = selectedUser ? 'PUT' : 'POST'
      const url = selectedUser
        ? `https://culinary-school-back.onrender.com/api/users/${selectedUser.id}`
        : 'https://culinary-school-back.onrender.com/api/users'

      if (!formData.status) {
        formData.status = 'active'
      }

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
        throw new Error(selectedUser ? 'Failed to update user' : 'Failed to add user')
      }

      const user = await response.json()

      if (selectedUser) {
        setUsers(users.map((u) => (u.id === user.id ? user : u)))
        setVisibleEdit(false)
        setAlert({ type: 'success', message: 'User updated successfully!' })
      } else {
        setUsers([...users, user])
        setVisibleAdd(false)
        setAlert({ type: 'success', message: 'User added successfully!' })
      }

      setSelectedUser(null)
      setFormData({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        role_id: '',
        status: '',
      })
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error saving user.' })
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      role_id: user.role_id,
      status: user.status,
    })
    setVisibleEdit(true)
  }

  const handleAdd = () => {
    setSelectedUser(null)
    setFormData({
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      role_id: '',
      status: '',
    })
    setVisibleAdd(true)
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`https://culinary-school-back.onrender.com/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setVisibleDelete(false)
      setSelectedUser(null)
      setAlert({ type: 'success', message: 'User deleted successfully!' })
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error deleting user.' })
    }
  }

  const confirmDelete = (user) => {
    setSelectedUser(user)
    setVisibleDelete(true)
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
                Usuarios
              </h3>
              <div style={{ display: 'flex', gap: 10 }}>
                <PDFDownloadLink
                  document={
                    <PDFReportUsers
                      users={filteredUsers}
                      fecha={new Date().toLocaleDateString()}
                    />
                  }
                  fileName={`usuarios_${new Date().toISOString().slice(0, 10)}.pdf`}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {({ loading }) => (
                    <CButton
                      color="info"
                      style={{
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: 8,
                        boxShadow: '0 2px 8px #00bfff44',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <CIcon icon={cilCloudDownload} />
                      {loading ? 'Generando PDF...' : 'Descargar PDF'}
                    </CButton>
                  )}
                </PDFDownloadLink>
                <CButton
                  color="warning"
                  style={{
                    color: darkColors.background,
                    fontWeight: 600,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px #ffb34744',
                  }}
                  onClick={handleAdd}
                >
                  <CIcon icon={cilPlus} className="me-2" />
                  Nuevo Usuario
                </CButton>
              </div>
            </div>
            <CForm className="my-3">
              <CRow className="g-2">
                <CCol xs={6} md={2}>
                  <CFormInput
                    type="text"
                    placeholder="ID"
                    name="id"
                    value={searchFilters.id}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={2}>
                  <CFormInput
                    type="text"
                    placeholder="Nombre"
                    name="first_name"
                    value={searchFilters.first_name}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={2}>
                  <CFormInput
                    type="text"
                    placeholder="Apellido"
                    name="last_name"
                    value={searchFilters.last_name}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={3}>
                  <CFormInput
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={searchFilters.email}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  />
                </CCol>
                <CCol xs={6} md={3}>
                  <CFormSelect
                    name="role_id"
                    value={searchFilters.role_id}
                    onChange={handleSearchChange}
                    style={{
                      background: darkColors.card,
                      color: darkColors.text,
                      borderColor: darkColors.border,
                    }}
                  >
                    <option value="">Rol</option>
                    <option value="1">Admin</option>
                    <option value="2">Chef</option>
                    <option value="3">Student</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CForm>
            {alert.message && (
              <CAlert color={alert.type} className="mb-4" dismissible onClose={() => setAlert({ type: '', message: '' })}>
                {alert.message}
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
                <CTableRow style={{ background: '#23262F' }}>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Nombre</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Apellido</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Email</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Teléfono</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Rol</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent }}>Estado</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: darkColors.accent, textAlign: 'center' }}>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredUsers.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={8} className="text-center" style={{ color: darkColors.secondary }}>
                      No hay usuarios registrados.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.id}</CTableDataCell>
                      <CTableDataCell>{user.first_name}</CTableDataCell>
                      <CTableDataCell>{user.last_name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.phone}</CTableDataCell>
                      <CTableDataCell>
                        {user.role_id === 1
                          ? 'Admin'
                          : user.role_id === 2
                          ? 'Chef'
                          : user.role_id === 3
                          ? 'Student'
                          : user.role_id}
                      </CTableDataCell>
                      <CTableDataCell>{user.status}</CTableDataCell>
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
                          onClick={() => handleEdit(user)}
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
                          onClick={() => confirmDelete(user)}
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

      {/* Modal para Añadir/Editar Usuario */}
      <CModal visible={visibleAdd || visibleEdit} onClose={() => { setVisibleAdd(false); setVisibleEdit(false); }}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader style={{ background: darkColors.card }}>
            <CModalTitle style={{ color: darkColors.accent }}>
              {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </CModalTitle>
          </CModalHeader>
          <CModalBody style={{ background: darkColors.card }}>
            <CFormInput
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              label="Nombre"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
            />
            <CFormInput
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              label="Apellido"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
            />
            <CFormInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
            />
            <CFormInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Teléfono"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
            />
            <CFormSelect
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              label="Rol"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
            >
              <option value="">Selecciona Rol</option>
              <option value="1">Admin</option>
              <option value="2">Chef</option>
              <option value="3">Student</option>
            </CFormSelect>
            <CFormSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Estado"
              required
              style={{ background: darkColors.background, color: darkColors.text, borderColor: darkColors.border }}
              className="mb-3"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter style={{ background: darkColors.card }}>
            <CButton color="secondary" onClick={() => { setVisibleAdd(false); setVisibleEdit(false); }}>
              Cancelar
            </CButton>
            <CButton color="warning" type="submit" style={{ color: darkColors.background, fontWeight: 600 }}>
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal de Confirmación para Eliminar */}
      <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
        <CModalHeader style={{ background: darkColors.card }}>
          <CModalTitle style={{ color: darkColors.accent }}>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: darkColors.card, color: darkColors.text }}>
          <p>
            ¿Estás seguro de que deseas eliminar al usuario{' '}
            <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>?
          </p>
        </CModalBody>
        <CModalFooter style={{ background: darkColors.card }}>
          <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default UserList