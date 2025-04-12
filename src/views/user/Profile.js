import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CCardText,
  CRow,
  CCol,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormCheck,

} from '@coreui/react'
import {CIcon} from '@coreui/icons-react'
import { cilPencil, cilSettings, cilUser, cilExitToApp} from '@coreui/icons'

const Profile = () => {
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [logoutVisible, setLogoutVisible] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main Street, Springfield',
  })
  const [settings, setSettings] = useState({
    language: 'Español',
    notifications: true,
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSettingsChange = (e) => {
    const { name, checked } = e.target
    setSettings({ ...settings, [name]: checked })
  }

  return (
    <div className="container mt-4">
      <CRow>
        {/* Avatar and Basic Info */}
        <CCol md={4}>
          <CCard className="text-center">
            <CCardImage
              orientation="top"
              src="https://cdn-icons-png.flaticon.com/512/4645/4645949.png"
              alt="User Avatar"
              className="rounded-circle mx-auto mt-3"
              style={{ width: '150px', height: '150px' }}
            />
            <CCardBody>
              <CCardTitle>{profileData.name}</CCardTitle>
              <CCardText className="text-muted">Admin</CCardText>
              <CButton color="primary" className="me-2" onClick={() => setEditModalVisible(true)}>
                <CIcon icon={cilPencil} className="me-1" />
                Editar Perfil
              </CButton>
              <CButton color="secondary" onClick={() => setSettingsModalVisible(true)}>
                <CIcon icon={cilSettings} className="me-1" />
                Configuración
              </CButton>
              <CButton className="text-danger"  onClick={() => setLogoutVisible(true)}>
                <CIcon icon={cilExitToApp} className="me-2" />
                Logout
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Profile Details */}
        <CCol md={8}>
          <CCard>
            <CCardHeader>
              <h5>Información Personal</h5>
            </CCardHeader>
            <CCardBody>
              <CListGroup flush>
                <CListGroupItem>
                  <strong>Nombre:</strong> {profileData.name}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Email:</strong> {profileData.email}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Teléfono:</strong> {profileData.phone}
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Dirección:</strong> {profileData.address}
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

          <CCard className="mt-4">
            <CCardHeader>
              <h5>Preferencias</h5>
            </CCardHeader>
            <CCardBody>
              <CListGroup flush>
                <CListGroupItem>
                  <CIcon icon={cilUser} className="me-2" />
                  <strong>Idioma:</strong> {settings.language}
                </CListGroupItem>
                <CListGroupItem>
                  <CIcon icon={cilSettings} className="me-2" />
                  <strong>Notificaciones:</strong> {settings.notifications ? 'Activadas' : 'Desactivadas'}
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal para Editar Perfil */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Perfil</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              className="mb-3"
              type="text"
              name="name"
              label="Nombre"
              value={profileData.name}
              onChange={handleEditChange}
            />
            <CFormInput
              className="mb-3"
              type="email"
              name="email"
              label="Correo Electrónico"
              value={profileData.email}
              onChange={handleEditChange}
            />
            <CFormInput
              className="mb-3"
              type="text"
              name="phone"
              label="Teléfono"
              value={profileData.phone}
              onChange={handleEditChange}
            />
            <CFormInput
              className="mb-3"
              type="text"
              name="address"
              label="Dirección"
              value={profileData.address}
              onChange={handleEditChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={() => setEditModalVisible(false)}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para Configuración */}
      <CModal visible={settingsModalVisible} onClose={() => setSettingsModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Configuración</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormCheck
              className="mb-3"
              type="checkbox"
              name="notifications"
              label="Activar Notificaciones"
              checked={settings.notifications}
              onChange={handleSettingsChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setSettingsModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={() => setSettingsModalVisible(false)}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>
        
        {/* Modal para Logout */}
      <CModal visible={logoutVisible} onClose={() => setLogoutVisible(false)}>
        <CModalHeader>
          <CModalTitle>¿Estás seguro?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>¿Quieres cerrar sesión?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLogoutVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={() => setLogoutVisible(false)}>
            Cerrar Sesión
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Profile