import CIcon from '@coreui/icons-react'
import {
  cilStorage,
  cilSchool,
  cilPenNib,
  cilCalendar,
  cilClipboard,
  cilAddressBook,
  cilRestaurant,
  cilChartPie,
  cilListNumbered,
  cilDescription,
  cilNotes,
  cilPencil,
  
  cilGroup
  ,

} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

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
  },

  
  {
    component: CNavTitle,
    name: 'Academic',
  },
  {
    component: CNavItem,
    name: 'Programs',
    to: '/programs',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  
  },
  {
    component: CNavItem,
    name: 'Subjects',
    to: '/subjects',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sections',
    to: '/sections',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schedules',
    to: '/schedules',
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
    to: '/inventory',
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
    to: '/assessments',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Grades',
    to: '/grades',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Digital resources',
  },
  {
    component: CNavItem,
    name: 'Resources',
    to: '/resources',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Recipes',
  },
  {
    component: CNavItem,
    name: 'Recipes',
    to: '/recipes',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,

  },
  



]

export default _nav
