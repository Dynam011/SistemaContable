import React, { useState, useEffect } from 'react'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilWarning } from '@coreui/icons'
export const UserList = (onUserAdded) => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [filterRole, setFilterRole] = useState('Show all')
  const [filterPhone, setFilterPhone] = useState('')
  const [filterStatus, setFilterStatus] = useState('Show all') // 
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users1, setusers] = useState([ {
    id: 1,
    first_name: 'Xavier',
    last_name: 'Castellanos',
    email: 'xaviercastellanos@example.com',
    password: 'password123',
    phone: '+58 4142341567',
    role_id: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    first_name: 'Jesus',
    last_name: 'Smith',
    email: 'jesus.smioth@example.com',
    password: 'password456',
    phone: '+58 4142341567',
    role_id: 'Chef',
    status: 'Inactive',
  },
  {
    id: 3,
    first_name: 'Bob',
    last_name: 'Johnson',
    email: 'bob.johnson@example.com',
    password: 'password789',
    phone: '+1 555 555 555',
    role_id: 'Estudiante',
    status: 'Active',
  },])
  const [id, setId] = useState('')
  const [first_name, setFirtsName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role_id, setRole_id] = useState('')
  const [status, setStatus] = useState('')

  const filteredUsers = users1.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(filterName.toLowerCase()) &&
      user.id.toString().includes(filterId) &&
      (filterRole === 'Show all' || user.role_id === filterRole) &&
      user.phone.includes(filterPhone) &&
      (filterStatus === 'Show all' || user.status === filterStatus) 
    )
  })

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/users')
      const data = await response.json()
      setusers(data)
    } catch (error) {
      console.error('An error occurred while fetching users.', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id, first_name, last_name, email, password, phone, role_id, status
        }),
      })
      if (!response.ok) {
        throw new Error('Server response error')
      }

      const newuser = await response.json()
      setId('')
      setFirtsName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setRole_id('')
      setStatus('')
      
      alert('User added successfully!')
      if (onUserAdded) {
        onUserAdded(newuser)
      }
    } catch (error) {
      console.error('An error occurred while adding the user. Please try again.', error)
    }
  }

  const handleEdit = async (user) => {
    setSelectedUser(user)
    setId(user.id)
    setFirtsName(user.first_name)
    setLastName(user.last_name)
    setEmail(user.email)
    setPhone(user.phone)
    setRole_id(user.role_id)
    setStatus(user.status) 
    setVisibleEdit(true)
  }

  const handleDelete = async (user) => {
    setSelectedUser(user)
    setVisibleDelete(true)
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedUser.id,
          first_name,
          last_name,
          email,
          password,
          phone,
          role_id,
          status,
        }),
      })
      if (!response.ok) {
        throw new Error('Error updating user')
      }

      const updatedUser = await response.json()
      alert('User updated successfully!')
      setVisibleEdit(false)
      fetchReports()
    } catch (error) {
      console.error('An error occurred while updating the user.', error)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${selectedUser.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Error deleting user')
      }

      alert('User deleted successfully!')
      setVisibleDelete(false)
      fetchReports()
    } catch (error) {
      console.error('An error occurred while deleting the user.', error)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Users</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="Show all">Filter by Role</option>
                <option value="Admin">Admin</option>
                <option value="Chef">Chef</option>
                <option value="Estudiante">Estudiante</option>
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Phone"
                value={filterPhone}
                onChange={(e) => setFilterPhone(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)} 
              >
                <option value="Show all">Filter by Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CButton color="info" style={{ color: 'white' }} onClick={() => setVisibleAdd(true)}>
                Add User
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Password</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Role ID</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredUsers.map((user, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{user.id}</CTableDataCell>
                <CTableDataCell>{user.first_name}</CTableDataCell>
                <CTableDataCell>{user.last_name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.password}</CTableDataCell>
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
                    onClick={() => handleDelete(user)}
                  >
        <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

       
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>
              <CModalTitle>Add User</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                value={id}
                onChange={(e) => setId(e.target.value)}
                label="ID"
                required
              />
              <CFormInput
                value={first_name}
                onChange={(e) => setFirtsName(e.target.value)}
                label="First Name"
                required
              />
              <CFormInput
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
                required
              />
              <CFormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                required
              />
              <CFormInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                required
              />
              <CFormInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Phone"
                required
              />
              <CFormSelect
                value={role_id}
                onChange={(e) => setRole_id(e.target.value)}
                label="Role"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Chef">Chef</option>
                <option value="Estudiante">Estudiante</option>
              </CFormSelect>
              <CFormSelect
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </CFormSelect>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">
                Save
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CForm onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <CModalHeader>
              <CModalTitle>Edit User</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                value={id}
                onChange={(e) => setId(e.target.value)}
                label="ID"
                disabled
              />
              <CFormInput
                value={first_name}
                onChange={(e) => setFirtsName(e.target.value)}
                label="First Name"
              />
              <CFormInput
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
              />
              <CFormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
              <CFormInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
              />
              <CFormInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Phone"
              />
              <CFormSelect
                value={role_id}
                onChange={(e) => setRole_id(e.target.value)}
                label="Role"
              >
                <option value="Admin">Admin</option>
                <option value="Chef">Chef</option>
                <option value="Estudiante">Estudiante</option>
              </CFormSelect>
              <CFormSelect
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </CFormSelect>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">
                Save Changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalBody>
            <p>Are you sure you want to delete this user?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleConfirmDelete}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}



export default UserList
