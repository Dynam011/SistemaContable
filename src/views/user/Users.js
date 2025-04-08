import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons'

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer' },
  ])
  const [visible, setVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleEdit = (user) => {
    setCurrentUser(user)
    setVisible(true)
  }

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleSave = () => {
    if (currentUser.id) {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)))
    } else {
      setUsers([...users, { ...currentUser, id: users.length + 1 }])
    }
    setVisible(false)
    setCurrentUser(null)
  }

  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h5>Gestión de Usuarios</h5>
            </CCol>
            <CCol className="text-end">
              <CButton color="success" onClick={() => setVisible(true)}>
                <CIcon icon={cilUserPlus} className="me-2" />
                Añadir Usuario
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.id}</CTableDataCell>
                  <CTableDataCell>{user.name}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.role}</CTableDataCell>
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
                      onClick={() => handleDelete(user.id)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para añadir/editar usuario */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{currentUser?.id ? 'Editar Usuario' : 'Añadir Usuario'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Nombre</CFormLabel>
                <CFormInput
                  type="text"
                  value={currentUser?.name || ''}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="email"
                  value={currentUser?.email || ''}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Rol</CFormLabel>
                <CFormInput
                  type="text"
                  value={currentUser?.role || ''}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default Users