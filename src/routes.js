import React from 'react'

const Enrollmentslist = React.lazy(() => import('./views/enrollments/Enrollmentslist'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Subjects = React.lazy(() => import('./views/subjects/subjects'))
const Profile = React.lazy(() => import('./views/user/Profile'))
const PDF = React.lazy(() => import('./views/pages/PDFTest'))
const Users = React.lazy(() => import('./views/user/Users'))
const Sections = React.lazy(() => import('./views/sections/sections'))
const Enrollment = React.lazy(() => import('./views/enrollments/enrollment'))
const Programs = React.lazy(() => import('./views/programs/programs'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: Users },
{ path: '/pdf', name: 'Pdf', element: PDF },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/programs', name: 'Programs', element: Programs },
  { path: '/enrollments', name: 'Enrollments', element: Enrollment },
  { path: '/sections', name: 'Sections', element: Sections },
   { path: '/subjects', name: 'Subjects', element: Subjects },
]

export default routes

