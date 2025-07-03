import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import fondoLogin from 'src/assets/images/fondologin.jpg'

const Login = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
    document.body.style.background = `url(${fondoLogin}) center center / cover no-repeat`
  }, [])

  const handleLogin = async (e) => {
    console.log('funca')
    e.preventDefault()
    try {
      const response = await fetch('https://culinary-school-back.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginUsername, password: loginPassword }),
      })

      const data = await response.json()
      console.log('Respuesta del servidor:', data)
      if (response.ok) {
        localStorage.setItem('token', data.token)
        
        localStorage.setItem(
          'usuario',
          JSON.stringify({
            email: data.user.email,
            phone: data.user.phone,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            
            rol_id: data.user.rol_id,
            id: data.user.id,
          }),
        )
        window.location.href = '/#/dashboard'; // O usa navigate('/dashboard') si tienes el hook
      } else {
        setLoginError(data.message || 'Error al iniciar sesión')
        setShowErrorModal(true)
      }
    } catch (error) {
      setLoginError(data.message || 'Error al iniciar sesión')
      setShowErrorModal(true)
      console.error('Error al iniciar sesión:', error)
    }
  }

  const handleRegister = async () => {
    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError('Por favor, completa todos los campos.')
      return
    }
    if (!registerEmail.includes('@')) {
      setRegisterError('Por favor, introduce un email válido.')
      return
    }

    // Validación de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const passwordErrors = []

    if (registerPassword.length < 8) {
      passwordErrors.push('Al menos 8 caracteres.')
    }
    if (!/(?=.*[a-z])/.test(registerPassword)) {
      passwordErrors.push('Al menos una letra minúscula.')
    }
    if (!/(?=.*[A-Z])/.test(registerPassword)) {
      passwordErrors.push('Al menos una letra mayúscula.')
    }
    if (!/(?=.*\d)/.test(registerPassword)) {
      passwordErrors.push('Al menos un número.')
    }
    if (!/(?=.*[@$!%*?&])/.test(registerPassword)) {
      passwordErrors.push('Al menos un carácter especial.')
    }

    if (passwordErrors.length > 0) {
      setRegisterError(
        'La contraseña debe cumplir los siguientes requisitos:\n\n' +
          passwordErrors.map((error) => `${error}\n\n`).join(''),
      )
      return
    }

    setRegisterError('')

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password_hash: registerPassword,
        }),
      })

      if (response.ok) {
        const newUser = await response.json()
        console.log('Usuario registrado exitosamente:', newUser)
        alert('Registrado exitosamente! Por favor, inicia sesión.')
        setShowRegister(false) // Volver al formulario de inicio de sesión
      } else {
        const errorData = await response.json()
        setRegisterError(errorData.message || 'Error al registrar el usuario.')
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      setRegisterError('Error al conectar con el servidor.')
    }
  }

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setEmailError('Por favor, introduce tu correo electrónico.')
      return
    }
    if (!forgotPasswordEmail.includes('@')) {
      setEmailError('Por favor, introduce un correo electrónico válido.')
      return
    }
    setEmailError('')

    try {
      const response = await fetch(`http://localhost:5000/users?email=${forgotPasswordEmail}`)
      const users = await response.json()

      if (users.length > 0) {
        // Simulación de envío de correo electrónico exitoso
        alert(
          `Se ha enviado un código de restablecimiento a ${forgotPasswordEmail}. Por favor, verifica tu correo.`,
        )
        setShowForgotPassword(false) // Volver al formulario de inicio de sesión
        setForgotPasswordEmail('') // Limpiar datos
      } else {
        setEmailError('No se encontró ningún usuario con ese correo electrónico.')
      }
    } catch (error) {
      console.error('Error al verificar el correo electrónico:', error)
      setEmailError('Error al conectar con el servidor.')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '30%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          boxShadow: '3px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CCard
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '0 auto',
            border: 'none',
          }}
        >
          <CCardBody>
            {showForgotPassword ? (
              <CForm>
                <h1 className="text-center">Forgot Password</h1>
                <p className="text-body-secondary text-center">
                  Enter your email to reset your password.
                </p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    type="email"
                    placeholder="Email"
                    value={forgotPasswordEmail}
                    required
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  />
                </CInputGroup>
                {emailError && <p className="text-danger">{emailError}</p>}
                <CRow>
                  <CButton
                    style={{ backgroundColor: '#082d9c', color: 'white' }}
                    className="px-4 w-100 mb-2"
                    onClick={handleForgotPassword}
                  >
                    Send Reset Email
                  </CButton>
                  <CButton
                    style={{ backgroundColor: '#f00524', color: 'white' }}
                    className="px-4 w-100"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Login
                  </CButton>
                </CRow>
              </CForm>
            ) : showRegister ? (
              <CForm>
                <h1 className="text-center">Register</h1>
                <p className="text-body-secondary text-center">Create your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    autoComplete="username"
                    required
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    required
                    autoComplete="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    required
                    placeholder="Password"
                    autoComplete="new-password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </CInputGroup>
                {registerError && <p className="text-danger">{registerError}</p>}
                <CRow>
                  <CButton
                    style={{ backgroundColor: '#082d9c', color: 'white' }}
                    className="px-4 w-100 mb-2"
                    onClick={handleRegister}
                  >
                    Register
                  </CButton>
                  <CButton
                    className="px-4 w-100"
                    onClick={() => setShowRegister(false)}
                    style={{ backgroundColor: '#e64805', color: 'white' }}
                  >
                    Back to Login
                  </CButton>
                </CRow>
              </CForm>
            ) : (
              <CForm onSubmit={handleLogin}>
                <h1 className="text-center">Login</h1>
                <p className="text-body-secondary text-center">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    autoComplete="username"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </CInputGroup>
                {loginError && <p className="text-danger">{loginError}</p>}
                <CRow>
                  <CButton
                    style={{ backgroundColor: '#082d9c', color: 'white' }}
                    className="px-4 w-100 mb-2"
                    type="submit"
                  >
                    Login
                  </CButton>
                  <CButton
                    style={{ backgroundColor: '#0f802b', color: 'white' }}
                    className="px-4 w-100"
                    onClick={() => setShowRegister(true)}
                  >
                    Register Now
                  </CButton>
                  <CButton
                    color="white"
                    className="px-0"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </CButton>
                </CRow>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </div>
    </div>
  )
}

export default Login
