
import React from 'react'

const Enrollmentslist = React.lazy(() => import('./views/enrollments/Enrollmentslist'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/user/Profile'))
const Users = React.lazy(() => import('./views/user/Users'))
const Sections = React.lazy(() => import('./views/sections/sections'))
const Enrollment = React.lazy(() => import('./views/enrollments/enrollment'))



const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: Users },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/enrollments', name: 'Enrollments', element: Enrollment},
  {path: '/sections', name: 'Sections', element: Sections},

]

export default routes
