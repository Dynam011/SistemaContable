import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  useColorModes,
} from '@coreui/react'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      
      <CContainer className="border-bottom px-4" fluid>
    <span className="d-none d-md-inline-block" style={{ color: '#FC4A1A', fontWeight: 500, fontStyle: 'italic', fontSize: 16, letterSpacing: 1 }}>
          ...Para un futuro más productivo
        </span>
        <CHeaderNav className="d-none d-md-flex">
       
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          
          
          
        </CHeaderNav>
        <CHeaderNav>
          
        
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

    </CHeader>
  )
}

export default AppHeader
