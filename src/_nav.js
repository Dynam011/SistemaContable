import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilStorage,
  cilSchool,
  cilCheck,
  cilPenNib,
  cilCalendar,
  cilClipboard,
  cilAddressBook,
  cilApple,
  cilRestaurant,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilListNumbered,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,

  cilGroup,
  cilUser,

  cilWc,
  cilDollar,
  cilWallet,
  cilCart,
  cilLibrary,
  cilContact,
  cilDiamond,
  cilMenu,

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />
    
  },
  {
    component: CNavTitle,
    name: 'User Management',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    
  },{
    component: CNavItem,
    name: 'Enrollments',
    to: '/enrollments',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  
  {
    component: CNavTitle,
    name: 'Academic',
  },
  {
    component: CNavItem,
    name: 'Programs',
    to: '/customers',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'Subjects',
    to: '/invoices',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sections',
    to: '/payments',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schedules',
    to: '/payments',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Enrollments',
    to: '/enrollments',
    icon: <CIcon icon={cilPenNib} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Inventory & Products',
  },
  {
    component: CNavItem,
    name: 'Inventory',
    to: '/products',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Measurement Units',
    to: '/inventory-movements',
    icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Assessments',
  },
  {
    component: CNavItem,
    name: 'Assessments',
    to: '/suppliers',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Grades',
    to: '/suppliers',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Digital resources',
  },
  {
    component: CNavItem,
    name: 'Resources',
    to: '/repairs',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Recipes',
  },
  {
    component: CNavItem,
    name: 'Recipes',
    to: '/repairs',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,

  },
  
  {
    component: CNavItem,
    name: 'Sections',
    to: '/sections',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    

    name: 'Recipe Ingredients',
    to: '/repairs',
    icon: <CIcon icon={cilApple} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',

  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
    ],
  },

]

export default _nav
