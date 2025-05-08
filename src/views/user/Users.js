import React, { useEffect } from 'react'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CRow,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'

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

  // Fetch users from localDB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data) // Inicializa la lista filtrada con todos los usuarios
      } catch (error) {
        console.error('Error fetching users:', error)
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

  const handleSubmt = async (e) => {
    e.preventDefault()
    try {
      const method = selectedUser ? 'PUT' : 'POST' // Determina si es una creación o edición
      const url = selectedUser
        ? `http://localhost:5000/users/${selectedUser.id}`
        : 'http://localhost:5000/users'

      // Generar un ID único e incremental si es un nuevo usuario
      if (!selectedUser) {
        const maxId = users.reduce((max, user) => Math.max(max, parseInt(user.id, 10)), 0)
        formData.id = (maxId + 1).toString()
      }

      // Asegurar que el campo `status` tenga un valor predeterminado
      if (!formData.status) {
        formData.status = 'active'
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(selectedUser ? 'Failed to update user' : 'Failed to add user')
      }

      const user = await response.json()

      if (selectedUser) {
        // Actualiza el usuario en la lista
        setUsers(users.map((u) => (u.id === user.id ? user : u)))
        setVisibleEdit(false)
      } else {
        // Añade el nuevo usuario a la lista
        setUsers([...users, user])
        setVisibleAdd(false)
      }

      // Limpia el formulario y el estado seleccionado
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
      console.error('Error saving user:', error)
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
      const response = await fetch(`http://localhost:500/users/${selectedUser.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setVisibleDelete(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const confirmDelete = (user) => {
    setSelectedUser(user)
    setVisibleDelete(true)
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Users</h4>
      </CCardHeader>
      <CCardBody>
        <CContainer>
          <CRow>
            <CCol sm="auto">
              <CFormInput
                type="text"
                placeholder="Search by ID"
                name="id"
                value={searchFilters.id}
                onChange={handleSearchChange}
                className="me-2"
              />
            </CCol>
            <CCol sm="auto">
              <CFormInput
                type="text"
                placeholder="Search by First Name"
                name="first_name"
                value={searchFilters.first_name}
                onChange={handleSearchChange}
                className="me-2"
              />
            </CCol>
            <CCol sm="auto">
              <CFormInput
                type="text"
                placeholder="Search by Last Name"
                name="last_name"
                value={searchFilters.last_name}
                onChange={handleSearchChange}
                className="me-2"
              />
            </CCol>
            <CCol sm="auto">
              <CFormInput
                type="text"
                placeholder="Search by Email"
                name="email"
                value={searchFilters.email}
                onChange={handleSearchChange}
                className="me-2"
              />
            </CCol>
            <CCol sm="auto">
              <CFormSelect
                name="role_id"
                value={searchFilters.role_id}
                onChange={handleSearchChange}
                className="me-2"
              >
                <option value="">Filter by Role</option>
                <option value="1">Admin</option>
                <option value="2">Chef</option>
                <option value="3">Student</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CContainer>

        <CButton color="success" onClick={handleAdd}>
          <CIcon icon={cilPlus} className="me-2" />
          Add User
        </CButton>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredUsers.map((user) => (
              <CTableRow key={user.id}>
                <CTableDataCell>{user.id}</CTableDataCell>
                <CTableDataCell>{user.first_name}</CTableDataCell>
                <CTableDataCell>{user.last_name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.role_id}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => confirmDelete(user)}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Modal para Añadir/Editar Usuario */}
        <CModal visible={visibleAdd || visibleEdit} onClose={() => setVisibleAdd(false) || setVisibleEdit(false)}>
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>
              <CModalTitle>{selectedUser ? 'Edit User' : 'Add User'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                label="First Name"
                required
              />
              <CFormInput
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                label="Last Name"
                required
              />
              <CFormInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                required
              />
              <CFormInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                label="Phone"
                required
              />
              <CFormSelect
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                label="Role"
                required
              >
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Chef</option>
                <option value="3">Student</option>
              </CFormSelect>
              <CFormSelect
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </CFormSelect>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleAdd(false) || setVisibleEdit(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">
                Save
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        {/* Modal de Confirmación para Eliminar */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Are you sure you want to delete the user <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDelete}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default UserList