import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

import fondoLogin from 'src/assets/images/fondologin.jpg';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.background = `url(${fondoLogin}) center center / cover no-repeat`;
  }, []);

  const handleLogin = () => {
    if (!loginUsername || !loginPassword) {
      setLoginError('Please enter both username and password.');
      return;
    }
    setLoginError('');
    console.log('Logging in with:', loginUsername, loginPassword);
    // Simulación de inicio de sesión
    setTimeout(() => {
      alert('Logged in successfully!');
    }, 1000);
  };

  const handleRegister = () => {
    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError('Please fill in all fields.');
      return;
    }
    if (!registerEmail.includes('@')) {
      setRegisterError('Please enter a valid email.');
      return;
    }

    // Validación de contraseña robusta
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordErrors = [];

    if (registerPassword.length < 8) {
      passwordErrors.push('At least 8 characters.');
    }
    if (!/(?=.*[a-z])/.test(registerPassword)) {
      passwordErrors.push('At least one lowercase letter.');
    }
    if (!/(?=.*[A-Z])/.test(registerPassword)) {
      passwordErrors.push('At least one uppercase letter.');
    }
    if (!/(?=.*\d)/.test(registerPassword)) {
      passwordErrors.push('At least one number.');
    }
    if (!/(?=.*[@$!%*?&])/.test(registerPassword)) {
      passwordErrors.push('At least one special character.');
    }

    if (passwordErrors.length > 0) {
      setRegisterError(
        'Password must meet the following requirements:\n\n' +
          passwordErrors.map((error) => `${error}\n\n`).join('')
      );
      return;
    }

    setRegisterError('');
    console.log('Registering with:', registerUsername, registerEmail, registerPassword);
    // Simulación de registro exitoso
    setTimeout(() => {
      alert('Registered successfully! Please log in.');
      setShowRegister(false); // Redirigir al formulario de inicio de sesión
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!forgotPasswordEmail.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    console.log('Sending reset password email to:', forgotPasswordEmail);
    // Simulación de envío de correo
    setTimeout(() => {
      alert(`Reset password email sent to: ${forgotPasswordEmail}`);
      setShowForgotPassword(false);
    }, 1000);
  };

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
              <CForm>
                <h1 className="text-center">Login</h1>
                <p className="text-body-secondary text-center">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    autoComplete="username"
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </CInputGroup>
                {loginError && <p className="text-danger">{loginError}</p>}
                <CRow>
                  <CButton
                    style={{ backgroundColor: '#082d9c', color: 'white' }}
                    className="px-4 w-100 mb-2"
                    onClick={handleLogin}
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
  );
};

export default Login;