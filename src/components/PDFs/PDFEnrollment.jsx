import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

// Cambia la ruta por la de tu logo real si es necesario
import logo from 'src/assets/images/icon.png'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#23262F',
    color: '#F5F6FA',
    padding: 32,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    borderBottom: '2px solid #FFB347',
    paddingBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFB347',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: '#A3A7B7',
    marginBottom: 8,
    marginTop: 2,
  },
  section: {
    marginTop: 18,
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#181A20',
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid #FFB347',
    backgroundColor: '#23262F',
    padding: 6,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #31344b',
    padding: 6,
  },
  cell: {
    flex: 1,
    paddingRight: 4,
    fontSize: 10,
  },
  cellHeader: {
    flex: 1,
    color: '#FFB347',
    fontWeight: 'bold',
    fontSize: 11,
    paddingRight: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 32,
    right: 32,
    textAlign: 'center',
    fontSize: 10,
    color: '#A3A7B7',
  },
})

const PDFEnrollment = ({
  fecha = new Date().toLocaleDateString(),
}) => {
  const [enrollments, setEnrollments] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        // Fetch enrollments
        const enrollmentsRes = await fetch('http://localhost:4000/api/enrollments', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!enrollmentsRes.ok) throw new Error('Error al obtener las matrículas')
        const enrollmentsData = await enrollmentsRes.json()
        setEnrollments(enrollmentsData)

        // Fetch users
        const usersRes = await fetch('http://localhost:4000/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!usersRes.ok) throw new Error('Error al obtener los usuarios')
        const usersData = await usersRes.json()
        setUsers(usersData)
      } catch (e) {
        setEnrollments([])
        setUsers([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Helper para obtener nombre y email del estudiante
  const getStudentInfo = (student_id) => {
    const user = users.find((u) => u.id === student_id)
    if (!user) return { name: '-', email: '-' }
    return {
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
      email: user.email || '-',
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.title}>Reporte de Matrículas</Text>
            <Text style={styles.subtitle}>{fecha}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ color: '#FFB347', fontWeight: 'bold', fontSize: 13, marginBottom: 2 }}>
            Detalle de todas las matrículas registradas en el sistema.
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#FFB347', fontWeight: 'bold', fontSize: 13, marginBottom: 6 }}>
            Lista de Matrículas
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cellHeader, { flex: 1 }]}>ID</Text>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Estudiante</Text>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Email</Text>
            <Text style={styles.cellHeader}>Sección</Text>
            <Text style={styles.cellHeader}>Fecha</Text>
            <Text style={styles.cellHeader}>Estado</Text>
            <Text style={styles.cellHeader}>Pago</Text>
          </View>
          {loading ? (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 8, color: '#A3A7B7', textAlign: 'center' }]}>
                Cargando matrículas...
              </Text>
            </View>
          ) : enrollments.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 8, color: '#A3A7B7', textAlign: 'center' }]}>
                No hay matrículas registradas.
              </Text>
            </View>
          ) : (
            enrollments.map((enr, idx) => {
              const student = getStudentInfo(enr.student_id)
              return (
                <View style={styles.tableRow} key={enr.id || idx}>
                  <Text style={[styles.cell, { flex: 1 }]}>{enr.id}</Text>
                  <Text style={[styles.cell, { flex: 2 }]}>{student.name}</Text>
                  <Text style={[styles.cell, { flex: 2 }]}>{student.email}</Text>
                  <Text style={styles.cell}>{enr.section_name || enr.section_id || '-'}</Text>
                  <Text style={styles.cell}>{enr.enrollment_date ? new Date(enr.enrollment_date).toLocaleDateString() : '-'}</Text>
                  <Text style={styles.cell}>{enr.status || '-'}</Text>
                  <Text style={styles.cell}>{enr.payment_status || '-'}</Text>
                </View>
              )
            })
          )}
        </View>

        <Text style={styles.footer}>
          Escuela Culinaria | Reporte generado el {fecha}
        </Text>
      </Page>
    </Document>
  )
}

export default PDFEnrollment