import React, { useState } from 'react';
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CAlert,
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
  cilPencil,
  cilTrash,
  cilPlus,
  cilCheckCircle,
  cilXCircle,
} from '@coreui/icons';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

import avatar1 from 'src/assets/images/avatars/1.png';
import avatar2 from 'src/assets/images/avatars/2.png';
import avatar3 from 'src/assets/images/avatars/3.png';
import chef1 from 'src/assets/images/avatars/4.png';
import chef2 from 'src/assets/images/avatars/5.png';
import chef3 from 'src/assets/images/avatars/6.png';
import backgroundImage from 'src/assets/images/fondodashboard1.png';

import { Pie } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const eventTypes = [
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Exam', label: 'Exam' },
  { value: 'Intensive', label: 'Intensive' },
  { value: 'Masterclass', label: 'Masterclass' },
  { value: 'Graduation', label: 'Graduation' },
  { value: 'Course', label: 'Course' },
  // Add more if needed
];

const typeColors = {
  Workshop: '#1e90ff',
  Exam: '#ffce56',
  Intensive: '#42ff00',
  Masterclass: '#ff6384',
  Graduation: '#8e44ad',
  Course: '#00b894',
};

const InfoWidget = ({ title, value, color, icon, backgroundColor, textColor }) => (
  <CCard className={`mb-4`}>
    <CCardBody className="d-flex align-items-center" style={{ backgroundColor: backgroundColor }}>
      <CIcon icon={icon} size="xxl" className="me-3" style={{ color: textColor }} />
      <div>
        <div className="fs-5 fw-semibold" style={{ color: textColor }}>{value}</div>
        <div className="text-uppercase fw-bold small" style={{ color: textColor }}>{title}</div>
      </div>
    </CCardBody>
  </CCard>
);

const EnrollmentTrendChart = () => {
  const data = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
    datasets: [
      {
        label: 'Enrollments',
        data: [20, 25, 22, 30, 28, 35, 40],
        borderColor: '#1e90ff',
        backgroundColor: 'rgba(30,144,255,0.2)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: '#1e90ff',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: 'circle',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        color: '#fff',
        font: { size: 18, weight: 'bold' },
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      x: {
        title: { display: false },
        ticks: { color: '#fff', font: { size: 13 } },
        grid: { color: '#333' },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Enrollments',
          color: '#fff',
          font: { size: 15, weight: 'bold' },
        },
        ticks: { color: '#fff', font: { size: 13 } },
        grid: { color: '#333' },
        beginAtZero: true,
        max: 60, 
      },
    },
  };

  return (
    <CCard className="mb-4" style={{ background: 'rgba(30, 30, 40, 0.7)', borderRadius: 18 }}>
      <CCardHeader style={{ background: 'transparent', borderBottom: 'none', color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
        <CIcon icon={cilChartLine} className="me-2" /> Enrollment Trend Monthly
      </CCardHeader>
      <CCardBody style={{
        height: '260px',
        background: 'transparent',
        color: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: 500 }}>
          <Line data={data} options={options} height={180} />
        </div>
      </CCardBody>
    </CCard>
  );
};

const PopularCoursesChart = () => {
  const data = {
    labels: ['Basic Cooking', 'Advanced Pastry', 'Artisanal Bakery', 'International Cuisine'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          '#1e90ff',
          '#ff6384',
          '#36a2eb',
          '#ffce56',
        ],
        borderColor: '#222',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${data.labels[context.dataIndex]}: ${context.parsed}`;
          }
        }
      }
    },
    cutout: '65%',
  };

  return (
    <CCard className="mb-4" style={{
      background: 'rgba(7, 6, 12, 0.68)',
      borderRadius: 18,
      minHeight: 320,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CCardHeader style={{
        background: 'transparent',
        borderBottom: 'none',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
        textAlign: 'center'
      }}>
        <CIcon icon={cilListNumbered} className="me-2" /> Most Popular Courses
      </CCardHeader>
      <CCardBody style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        minHeight: 220,
        padding: 0,
      }}>
        {/* Círculo a la izquierda */}
        <div style={{
          width: 180,
          height: 180,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '50%',
          boxShadow: '0 4px 24px 0 #1e90ff33',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 32,
        }}>
          <Pie data={data} options={options} />
        </div>
        {/* Tabla a la derecha */}
        <div style={{ width: '100%', maxWidth: 320 }}>
          <table style={{ width: '100%', color: '#fff', fontSize: 16, borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', fontWeight: 600, color: '#b0b0b0', paddingBottom: 4 }}>Course</th>
                <th style={{ textAlign: 'right', fontWeight: 600, color: '#b0b0b0', paddingBottom: 4 }}>Students</th>
              </tr>
            </thead>
            <tbody>
              {data.labels.map((label, idx) => (
                <tr key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <td style={{ padding: '6px 0 6px 12px', borderRadius: '8px 0 0 8px', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: data.datasets[0].backgroundColor[idx],
                      marginRight: 10,
                      border: `2px solid ${data.datasets[0].borderColor[idx]}`,
                    }} />
                    {label}
                  </td>
                  <td style={{ textAlign: 'right', padding: '6px 12px 6px 0', borderRadius: '0 8px 8px 0', fontWeight: 700 }}>
                    {data.datasets[0].data[idx]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
  );
};

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

const DynamicEventsCalendar = () => {
  const [date, setDate] = useState(new Date());

  // Formatea la fecha a YYYY-MM-DD
  const formatDate = (d) => d.toISOString().split('T')[0];

  // Eventos del día seleccionado
  const dayEvents = events.filter(
    (event) => event.date === formatDate(date)
  );
  
  // Próximos eventos (a partir de hoy)
  const today = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Marca los días con eventos
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasEvent = events.some(event => event.date === formatDate(date));
      return hasEvent ? (
        <div style={{
          marginTop: 2,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'blue',
          marginLeft: 'auto',
          marginRight: 'auto'
        }} />
      ) : null;
    }
    return null;
  };

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>
          <CIcon icon={cilCalendar} className="me-2" /> Academy Events Calendar
        </span>
        <CButton color="info" size="sm" variant="outline" style={{ borderRadius: 20 }}>
          <CIcon icon={cilUser} className="me-1" /> Edit Events
        </CButton>
      </CCardHeader>
      <CCardBody style={{ backgroundColor: 'black', color: 'grey', minHeight: 320 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {/* Calendario a la izquierda */}
          <div>
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              
              locale="en-US"
              minDetail="month"
              next2Label={null}
              showNeighboringMonth={false}
              style={{ borderRadius: 8 }}
            />
            <div style={{ marginTop: 12, color: '#fff', fontWeight: 'bold' }}>
              {dayEvents.length > 0 ? 'Events for this day:' : 'No events for this day.'}
            </div>
            <ul style={{ paddingLeft: 16 }}>
              {dayEvents.map((event, idx) => (
                <li key={idx} style={{ color: typeColors[event.type] || '#fff', marginBottom: 6 }}>
                  <span style={{ fontWeight: 'bold' }}>{event.type}</span>: {event.title}
                  <div style={{ color: '#ccc', fontSize: 13 }}>{event.description}</div>
                </li>
              ))}
            </ul>
          </div>
          {/* Próximos eventos a la derecha */}
          <div style={{ minWidth: 260, flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: 8 }}>Upcoming Events</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {upcomingEvents.map((event, idx) => (
                <li key={idx} style={{ marginBottom: 16, borderLeft: `4px solid ${typeColors[event.type] || '#fff'}`, paddingLeft: 10 }}>
                  <div style={{ fontWeight: 'bold', color: typeColors[event.type] || '#fff' }}>
                    {event.type} &mdash; {event.title}
                  </div>
                  <div style={{ fontSize: 15, color: '#fff' }}>
                    {event.date}
                  </div>
                  <div style={{ fontSize: 14, color: '#ccc' }}>
                    {event.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

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
    { avatar: chef1, name: 'Isabella Salvadora', specialty: 'Author Cuisine' },
    { avatar: chef2, name: 'Body Balastro', specialty: 'Fine Pastry' },
    { avatar: chef3, name: 'Kenji Tanaka', specialty: 'Japanese Cuisine' },
  ];

  // --- EVENTS STATE & MODAL ---
  const [events, setEvents] = useState([
    { date: '2025-07-10', type: 'Workshop', title: 'Sourdough Bread Workshop', description: 'Hands-on sourdough techniques with Chef Isabella.', chef: 'Isabella Salvadora' },
    { date: '2025-07-15', type: 'Exam', title: 'Pastry Final Exam', description: 'Final practical exam for Advanced Pastry students.', chef: 'Body Balastro' },
    { date: '2025-07-20', type: 'Intensive', title: 'Summer Intensive: World Cuisine', description: 'One-week culinary bootcamp covering global dishes.', chef: 'Kenji Tanaka' },
    { date: '2025-07-25', type: 'Masterclass', title: 'Masterclass: Japanese Knife Skills', description: 'Special guest: Chef Kenji Tanaka.', chef: 'Kenji Tanaka' },
    { date: '2025-08-02', type: 'Workshop', title: 'Chocolate Art Workshop', description: 'Chocolate tempering and decoration.', chef: 'Body Balastro' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // null for new
  const [showAlert, setShowAlert] = useState({ show: false, type: '', message: '' });

  // --- MODAL DE CONFIRMACIÓN PARA ELIMINAR ---
  const [deleteIdx, setDeleteIdx] = useState(null);

  // --- EVENT HANDLERS ---
  const handleEditEvent = (event, idx) => {
    setEditingEvent({ ...event, idx });
    setShowModal(true);
  };
  const handleAddEvent = () => {
    setEditingEvent({ date: '', type: '', title: '', description: '', chef: '' });
    setShowModal(true);
  };
  const handleDeleteEvent = (idx) => {
    setDeleteIdx(idx);
  };
  const confirmDeleteEvent = () => {
    setEvents(events => events.filter((_, i) => i !== deleteIdx));
    setShowAlert({ show: true, type: 'danger', message: 'Event deleted successfully.' });
    setDeleteIdx(null);
  };
  const cancelDeleteEvent = () => {
    setDeleteIdx(null);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setEditingEvent(null);
  };
  const handleModalSave = () => {
    if (!editingEvent.date || !editingEvent.type || !editingEvent.title || !editingEvent.chef) {
      setShowAlert({ show: true, type: 'danger', message: 'Please fill all required fields.' });
      return;
    }
    setEvents(events => {
      if (editingEvent.idx !== undefined) {
        // Edit
        const updated = [...events];
        updated[editingEvent.idx] = { ...editingEvent };
        delete updated[editingEvent.idx].idx;
        return updated;
      } else {
        // Add
        return [...events, { ...editingEvent }];
      }
    });
    setShowModal(false);
    setEditingEvent(null);
    setShowAlert({ show: true, type: 'success', message: 'Event saved successfully.' });
  };

  // --- CALENDAR & EVENTS LOGIC (use events state) ---
  // ...existing code...
  // Replace all references to "events" with the state variable above in DynamicEventsCalendar

  // --- DYNAMIC EVENTS CALENDAR COMPONENT (INLINE) ---
  const [calendarDate, setCalendarDate] = useState(new Date());
  const formatDate = (d) => d.toISOString().split('T')[0];
  const dayEvents = events.filter(event => event.date === formatDate(calendarDate));
  const today = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasEvent = events.some(event => event.date === formatDate(date));
      return hasEvent ? (
        <div style={{
          marginTop: 2,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'blue',
          marginLeft: 'auto',
          marginRight: 'auto'
        }} />
      ) : null;
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '50px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: 1440, width: '100%', margin: '0 auto', padding: '0 24px' }}>
        <CRow className="mb-4" style={{ justifyContent: 'center' }}>
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
            <InfoWidget title="Active Courses" value={activeCourses} textColor="f6e704" icon={cilBook} />
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

        <CRow className="mb-4" style={{ justifyContent: 'center' }}>
          <CCol md={6}>
            <EnrollmentTrendChart />
          </CCol>
          <CCol md={6}>
            <PopularCoursesChart />
          </CCol>
        </CRow>

        <CRow className="mb-4" style={{ justifyContent: 'center' }}>
          <CCol md={6}>
            <NewStudentsTable students={newStudentsData} />
          </CCol>
          <CCol md={6}>
            <RecentPaymentsTable payments={recentPaymentsData} />
          </CCol>
        </CRow>

        <CRow className="mb-4" style={{ justifyContent: 'center' }}>
          <CCol md={12}>
            <RegisteredChefsTable chefs={registeredChefsData} />
          </CCol>
        </CRow>

        {/* ALERT FOR CONFIRMATION */}
        {showAlert.show && (
          <CAlert color={showAlert.type} dismissible onClose={() => setShowAlert({ show: false })}>
            {showAlert.message}
          </CAlert>
        )}

        {/* DYNAMIC EVENTS CALENDAR */}
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <span>
              <CIcon icon={cilCalendar} className="me-2" /> Academy Events Calendar
            </span>
            <CButton color="info" size="sm" variant="outline" style={{ borderRadius: 20 }} onClick={handleAddEvent}>
              <CIcon icon={cilPencil} className="me-1" /> Add Events
            </CButton>
          </CCardHeader>
          <CCardBody style={{
            backgroundColor: 'black',
            color: 'grey',
            minHeight: 320,
            padding: 0,
          }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0,
                flexDirection: 'row',
                width: '100%',
                minHeight: 320,
              }}
            >
              {/* Calendar */}
              <div style={{
                flex: '1 1 320px',
                minWidth: 320,
                maxWidth: 400,
                padding: 24,
                boxSizing: 'border-box',
                borderRight: '1px solid #222',
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Calendar
                  onChange={setCalendarDate}
                  value={calendarDate}
                  tileContent={tileContent}
                  locale="en-US"
                  minDetail="month"
                  next2Label={null}
                  showNeighboringMonth={false}
                  style={{ borderRadius: 8 }}
                />
                <div style={{ marginTop: 12, color: '#fff', fontWeight: 'bold' }}>
                  {dayEvents.length > 0 ? 'Events for this day:' : 'No events for this day.'}
                </div>
                <div style={{
                  maxHeight: 120,
                  overflowY: 'auto',
                  width: '100%',
                  paddingRight: 8,
                }}>
                  <ul style={{ paddingLeft: 16, marginBottom: 0 }}>
                    {dayEvents.map((event, idx) => (
                      <li key={idx} style={{ color: typeColors[event.type] || '#fff', marginBottom: 6 }}>
                        <span style={{ fontWeight: 'bold' }}>{event.type}</span>: {event.title}
                        <div style={{ color: '#ccc', fontSize: 13 }}>{event.description}</div>
                        <div style={{ color: '#aaa', fontSize: 13 }}>Chef: {event.chef}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Upcoming events with edit/delete */}
              <div style={{
                flex: '2 1 320px',
                minWidth: 260,
                padding: 24,
                boxSizing: 'border-box',
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}>
                <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: 8 }}>Upcoming Events</div>
                <div style={{
                  overflowY: 'auto',
                  maxHeight: 260,
                  minHeight: 120,
                  paddingRight: 8,
                }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {upcomingEvents.map((event, idx) => (
                      <li key={idx} style={{
                        marginBottom: 16,
                        borderLeft: `4px solid ${typeColors[event.type] || '#fff'}`,
                        paddingLeft: 10,
                        background: 'rgba(30,30,30,0.2)',
                        borderRadius: 6,
                        paddingTop: 6,
                        paddingBottom: 6,
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        <div style={{ fontWeight: 'bold', color: typeColors[event.type] || '#fff' }}>
                          {event.type} &mdash; {event.title}
                        </div>
                        <div style={{ fontSize: 15, color: '#fff' }}>
                          {event.date}
                        </div>
                        <div style={{ fontSize: 14, color: '#ccc' }}>
                          {event.description}
                        </div>
                        <div style={{ fontSize: 13, color: '#aaa' }}>
                          Chef: {event.chef}
                        </div>
                        <div className="mt-1">
                          <CButton size="sm" color="warning" variant="outline" className="me-2"
                            onClick={() => handleEditEvent(event, events.findIndex(e => e === event))}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton size="sm" color="danger" variant="outline"
                            onClick={() => handleDeleteEvent(events.findIndex(e => e === event))}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* EDIT/ADD EVENT MODAL */}
        <CModal visible={showModal} onClose={handleModalClose} alignment="center">
          <CModalHeader closeButton>
            {editingEvent && editingEvent.idx !== undefined ? 'Edit Event' : 'Add Event'}
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CFormInput
                type="date"
                label="Date"
                value={editingEvent?.date || ''}
                onChange={e => setEditingEvent(ev => ({ ...ev, date: e.target.value }))}
                required
                className="mb-2"
              />
              <CFormSelect
                label="Type"
                value={editingEvent?.type || ''}
                options={[{ label: 'Select type', value: '' }, ...eventTypes.map(t => ({ label: t.label, value: t.value }))]}
                onChange={e => setEditingEvent(ev => ({ ...ev, type: e.target.value }))}
                required
                className="mb-2"
              />
              <CFormInput
                label="Title"
                value={editingEvent?.title || ''}
                onChange={e => setEditingEvent(ev => ({ ...ev, title: e.target.value }))}
                required
                className="mb-2"
              />
              <CFormTextarea
                label="Description"
                value={editingEvent?.description || ''}
                onChange={e => setEditingEvent(ev => ({ ...ev, description: e.target.value }))}
                rows={2}
                className="mb-2"
              />
              <CFormSelect
                label="Chef in Charge"
                value={editingEvent?.chef || ''}
                options={[
                  { label: 'Select chef', value: '' },
                  ...registeredChefsData.map(c => ({ label: c.name, value: c.name }))
                ]}
                onChange={e => setEditingEvent(ev => ({ ...ev, chef: e.target.value }))}
                required
                className="mb-2"
              />
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleModalClose}>
              Cancel
            </CButton>
            <CButton color="success" onClick={handleModalSave}>
              <CIcon icon={cilCheckCircle} className="me-1" /> Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* CONFIRM DELETE MODAL */}
        <CModal visible={deleteIdx !== null} onClose={cancelDeleteEvent} alignment="center">
          <CModalHeader closeButton>
            Confirm Delete
          </CModalHeader>
          <CModalBody>
            <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>
              Are you sure you want to delete this event?
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={cancelDeleteEvent}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={confirmDeleteEvent}>
              <CIcon icon={cilTrash} className="me-1" /> Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </div>
  );
};

export default DashboardCulinario;