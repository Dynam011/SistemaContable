import React, { useState, useEffect } from 'react'
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
import { CIcon } from '@coreui/icons-react'
import { cilPencil, cilSettings, cilUser, cilExitToApp } from '@coreui/icons'

const getUserFromStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem('usuario'))
    return user
      ? {
          name:
            (user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.first_name || user.last_name || user.email || 'Usuario'),
          email: user.email || '',
          phone: user.phone || 'No registrado',
          role: user.rol_id || 'Usuario',
        }
      : {
          name: 'Usuario',
          email: '',
          phone: '',
          role: '',
        }
  } catch {
    return {
      name: 'Usuario',
      email: '',
      phone: '',
      role: '',
    }
  }
}

const Profile = () => {
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [logoutVisible, setLogoutVisible] = useState(false)
  const [profileData, setProfileData] = useState(getUserFromStorage())
  const [settings, setSettings] = useState({
    language: 'Español',
    notifications: true,
  })
  const [editFormData, setEditFormData] = useState(profileData)
  const [feedback, setFeedback] = useState({ type: '', message: '' }) // Nuevo estado para mensajes

  // Actualiza el perfil si cambia el usuario en localStorage
  useEffect(() => {
    setProfileData(getUserFromStorage())
  }, [])

  // Cuando abres el modal, copia los datos actuales al formulario temporal
  const openEditModal = () => {
    setEditFormData(profileData)
    setEditModalVisible(true)
  }

  // Cambios solo afectan el formulario temporal
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData({ ...editFormData, [name]: value })
  }

  // Guardar cambios: actualiza backend y luego el estado principal
  const handleSaveProfile = async () => {
    setFeedback({ type: '', message: '' })
    try {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('usuario'))

      const response = await fetch(`https://culinary-school-back.onrender.com/api/users/${user.id}`, {
        method: 'PUT', // o PATCH según tu backend
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      })
      if (!response.ok) throw new Error('Error al actualizar perfil')
      // Actualiza el estado y localStorage solo si el backend responde OK
      setProfileData(editFormData)
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('usuario')),
          ...editFormData,
        })
      )
      setEditModalVisible(false)
      setFeedback({ type: 'success', message: 'Perfil actualizado correctamente.' })
    } catch (error) {
      setEditModalVisible(false)
      setFeedback({ type: 'error', message: 'No se pudo actualizar el perfil.' })
   
    }
  }

  const handleSettingsChange = (e) => {
    const { name, checked } = e.target
    setSettings({ ...settings, [name]: checked })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.reload()
  }

  return (
    <div className="container mt-4">
      {/* Mensaje de feedback */}
      {feedback.message && (
        <div
          className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'} mt-2`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}
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
              <CCardText className="text-muted">{profileData.role}</CCardText>
              <CButton color="primary" className="me-2" onClick={openEditModal}>
                <CIcon icon={cilPencil} className="me-1" />
                Editar Perfil
              </CButton>
              <CButton color="secondary" onClick={() => setSettingsModalVisible(true)}>
                <CIcon icon={cilSettings} className="me-1" />
                Configuración
              </CButton>
              <CButton className="text-danger" onClick={() => setLogoutVisible(true)}>
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
              value={editFormData.name}
              onChange={handleEditChange}
            />
            <CFormInput
              className="mb-3"
              type="email"
              name="email"
              label="Correo Electrónico"
              value={editFormData.email}
              onChange={handleEditChange}
            />
            <CFormInput
              className="mb-3"
              type="text"
              name="phone"
              label="Teléfono"
              value={editFormData.phone}
              onChange={handleEditChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSaveProfile}>
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
          <CButton color="danger" onClick={handleLogout}>
            Cerrar Sesión
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Profile