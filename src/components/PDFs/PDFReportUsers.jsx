import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

// Puedes cambiar esta ruta por la de tu logo real
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

// Componente para obtener datos del backend y renderizar el PDF
const PDFReportUsers = ({
  programName = 'Escuela Gastronómica',

  fecha = new Date().toLocaleDateString(),
}) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        // Puedes ajustar la URL según tu API
        const res = await fetch('http://localhost:4000/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error('Error al obtener los datos')
        const data = await res.json()
        setStudents(data)
      } catch (e) {
        setStudents([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.title}>{programName}</Text>
            <Text style={styles.subtitle}>{fecha}</Text>
          </View>
        </View>


        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#FFB347', fontWeight: 'bold', fontSize: 13, marginBottom: 6 }}>
            Lista de Usuarios Registrados
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Nombre</Text>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Email</Text>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Teléfono</Text>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Estado</Text>
            <Text style={[styles.cellHeader, { flex: 2 }]}>Rol</Text>
          </View>
          {loading ? (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 5, color: '#A3A7B7', textAlign: 'center' }]}>
                Cargando estudiantes...
              </Text>
            </View>
          ) : students.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 5, color: '#A3A7B7', textAlign: 'center' }]}>
                No hay estudiantes inscritos.
              </Text>
            </View>
          ) : (
            students.map((student, idx) => (
              <View style={styles.tableRow} key={student.id || idx}>
                <Text style={[styles.cell, { flex: 2 }]}>
                  {student.first_name} {student.last_name}
                </Text>
                <Text style={[styles.cell, { flex: 2 }]}>{student.email}</Text>
                <Text style={[styles.cell, { flex: 2 }]}>{student.phone || '-'}</Text>
                <Text style={[styles.cell, { flex: 2 }]}>{student.status || 'Activo'}</Text>
                <Text style={[styles.cell, { flex: 2 }]}>{student.role_id === 1
                          ? 'Admin'
                          : student.role_id === 2
                          ? 'Chef'
                          : student.role_id === 3
                          ? 'Student'
                          : student.role_id}</Text>
              </View>
            ))
          )}
        </View>

        <Text style={styles.footer}>
          Escuela Culinaria | Reporte generado el {fecha}
        </Text>
      </Page>
    </Document>
  )
}

export default PDFReportUsers