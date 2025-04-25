import React from 'react';
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilUserPlus,
  cilBook,
  cilMoney,
  cilCalendar,
  cilChartLine,
  cilListNumbered,
  cilRestaurant,
  cilUser,
  cilDollar,
} from '@coreui/icons';

import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import chef1 from 'src/assets/images/avatars/4.jpg';
import chef2 from 'src/assets/images/avatars/5.jpg';
import backgroundImage from 'src/assets/images/fondodashboard1.png';


const InfoWidget = ({ title, value, color, icon, backgroundColor, textColor }) => (
  <CCard className={`mb-4`}> 
    <CCardBody className="d-flex align-items-center" style={{ backgroundColor: backgroundColor }}>
      <CIcon icon={icon} size="xxl" className="me-3" style={{ color: textColor }} /> {/* Estilo al icono */}
      <div>
        <div className="fs-5 fw-semibold" style={{ color: textColor }}>{value}</div> {/* Estilo al valor */}
        <div className="text-uppercase fw-bold small" style={{ color: textColor }}>{title}</div> {/* Estilo al título */}
      </div>
    </CCardBody>
  </CCard>
);

const EnrollmentTrendChart = () => (
  <CCard className="mb-4">
    <CCardHeader>
      <CIcon icon={cilChartLine} className="me-2" /> Enrollment Trend
    </CCardHeader>
    <CCardBody style={{ height: '250px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }}>
      Enrollment trend chart
    </CCardBody>
  </CCard>
);

const PopularCoursesChart = () => (
  <CCard className="mb-4">
    <CCardHeader>
      <CIcon icon={cilListNumbered} className="me-2" /> Most Popular Courses
    </CCardHeader>
    <CCardBody style={{ height: '250px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }}>
      Most popular courses chart
    </CCardBody>
  </CCard>
);

const NewStudentsTable = ({ students }) => (
  <CCard className="mb-4">
    <CCardHeader>
      <CIcon icon={cilUserPlus} className="me-2" /> New Students
    </CCardHeader>
    <CCardBody>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Course</CTableHeaderCell>
            <CTableHeaderCell>Enrollment Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {students.map((student, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div className="d-flex align-items-center">
                  <CAvatar size="xl" src={student.avatar} className="me-2" />
                  <span>{student.name}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell>{student.course}</CTableDataCell>
              <CTableDataCell>{student.enrollmentDate}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
);

const RecentPaymentsTable = ({ payments }) => (
  <CCard className="mb-4">
    <CCardHeader>
      <CIcon icon={cilMoney} className="me-2" /> Recent Payments
    </CCardHeader>
    <CCardBody>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Student</CTableHeaderCell>
            <CTableHeaderCell>Course</CTableHeaderCell>
            <CTableHeaderCell>Amount</CTableHeaderCell>
            <CTableHeaderCell>Payment Date</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {payments.map((payment, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{payment.student}</CTableDataCell>
              <CTableDataCell>{payment.course}</CTableDataCell>
              <CTableDataCell>${payment.amount}</CTableDataCell>
              <CTableDataCell>{payment.date}</CTableDataCell>
              <CTableDataCell>{payment.status}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
);

const EventsCalendar = () => (
  <CCard className="mb-4">
    <CCardHeader>
      <CIcon icon={cilCalendar} className="me-2" /> Events Calendar
    </CCardHeader>
    <CCardBody style={{ height: '300px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }}>
      Events chart
    </CCardBody>
  </CCard>
);

const RegisteredChefsTable = ({ chefs }) => (
  <CCard className="mb-4">
    <CCardHeader>
      <CIcon icon={cilRestaurant} className="me-2" /> Registered Chefs
    </CCardHeader>
    <CCardBody>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Photo</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Specialty</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {chefs.map((chef, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <CAvatar size="xl" src={chef.avatar} className="me-2" />
              </CTableDataCell>
              <CTableDataCell>{chef.name}</CTableDataCell>
              <CTableDataCell>{chef.specialty}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
);

const DashboardCulinario = () => {
  const totalStudents = 250;
  const newEnrollmentsThisMonth = 40;
  const activeCourses = 15;
  const pendingPayments = 15;
  const activeChefs = 10;
  const totalRevenueThisMonth = 12500;
  const totalExpensesThisMonth = 3800; 

  const newStudentsData = [
    { avatar: avatar1, name: 'Nesly Contreras', course: 'Basic Cooking', enrollmentDate: '2025-04-12' },
    { avatar: avatar2, name: 'Isaac Alba', course: 'Advanced Pastry', enrollmentDate: '2025-04-10' },
    { avatar: avatar3, name: 'Jesus Delgado', course: 'Artisanal Bakery', enrollmentDate: '2025-04-08' },
  ];

  const recentPaymentsData = [
    { student: 'Nesly Contreras', course: 'Basic Cooking', amount: 150, date: '2025-04-11', status: 'Paid' },
    { student: 'Isaac Alba', course: 'Advanced Pastry', amount: 200, date: '2025-04-09', status: 'Paid' },
    { student: 'Jesus Delgado', course: 'International Cuisine', amount: 100, date: '2025-04-07', status: 'Pending' },
  ];

  const registeredChefsData = [
    { avatar: chef1, name: 'Martín Zubizarreta', specialty: 'Author Cuisine' },
    { avatar: chef2, name: 'Isabella Rossi', specialty: 'Fine Pastry' },
    { avatar: avatar1, name: 'Kenji Tanaka', specialty: 'Japanese Cuisine' },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        minHeight: '100vh', 
        padding: '50px', 
      }}
    >
      <CRow className="mb-4">
        <CCol md={3}>
          <InfoWidget
            title="Active Students"
            value={totalStudents}
            textColor="00aeff" 
            icon={cilUserPlus}
          />
        </CCol>
        <CCol md={3}>
          <InfoWidget
            title="New Enrollments (April)"
            value={newEnrollmentsThisMonth}
            textColor="1ad911"
            icon={cilUserPlus}
          
          />
        </CCol>
        <CCol md={3}>
          <InfoWidget title="Active Courses" value={activeCourses} textColor="f6e704" icon={cilBook}  />
        </CCol>
        <CCol md={3}>
          <InfoWidget title="Pending Payments" value={pendingPayments} textColor="ff0000" icon={cilMoney} />
        </CCol>
        <CCol md={3}>
          <InfoWidget title="Active Chefs" value={activeChefs} textColor="8700ff" icon={cilUser} />
        </CCol>
        <CCol md={3}>
          <InfoWidget
            title="Total Revenue (April)"
            value={`$${totalRevenueThisMonth}`}
            textColor="42ff00"
            icon={cilDollar}
            
          />
        </CCol>
        <CCol md={3}>
          <InfoWidget
            title="Total Expenses (April)"
            value={`$${totalExpensesThisMonth}`}
             textColor="e20000"
            icon={cilMoney}
            
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <EnrollmentTrendChart />
        </CCol>
        <CCol md={6}>
          <PopularCoursesChart />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <NewStudentsTable students={newStudentsData} />
        </CCol>
        <CCol md={6}>
          <RecentPaymentsTable payments={recentPaymentsData} />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={12}>
          <RegisteredChefsTable chefs={registeredChefsData} />
        </CCol>
      </CRow>

      <EventsCalendar />
    </div>
  );
};

export default DashboardCulinario;