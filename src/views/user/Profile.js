import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSettings, cilUser } from '@coreui/icons'

const Profile = () => {
  return (
    <div className="container mt-4">
      <CRow>
        {/* Avatar and Basic Info */}
        <CCol md={4}>
          <CCard className="text-center">
            <CCardImage
              orientation="top"
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="rounded-circle mx-auto mt-3"
              style={{ width: '150px', height: '150px' }}
            />
            <CCardBody>
              <CCardTitle>John Doe</CCardTitle>
              <CCardText className="text-muted">Software Engineer</CCardText>
              <CButton color="primary" className="me-2">
                <CIcon icon={cilPencil} className="me-1" />
                Editar Perfil
              </CButton>
              <CButton color="secondary">
                <CIcon icon={cilSettings} className="me-1" />
                Configuración
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
                  <strong>Nombre:</strong> John Doe
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Email:</strong> john.doe@example.com
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Teléfono:</strong> +1 234 567 890
                </CListGroupItem>
                <CListGroupItem>
                  <strong>Dirección:</strong> 123 Main Street, Springfield
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
                  <strong>Idioma:</strong> Español
                </CListGroupItem>
                <CListGroupItem>
                  <CIcon icon={cilSettings} className="me-2" />
                  <strong>Notificaciones:</strong> Activadas
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Profile