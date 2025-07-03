import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Puedes cambiar este logo por el de tu escuela
const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_Logo.png';

// Genera la URL del QR dinámicamente según la cédula
const getQrUrl = (cedula) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://tu-backend.com/api/estudiantes/${cedula}`;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8f9fa',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 0,
  },
  cutLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: 140,
    border: '1px dashed #adb5bd',
    borderRadius: 12,
    zIndex: 0,
  },
  card: {
    width: 220,
    height: 140,
    borderRadius: 12,
    border: '1.5px solid #007bff',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    margin: 10,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginRight: 8,
    border: '1px solid #007bff',
    backgroundColor: '#e9ecef',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 2,
  },
  schoolName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 7,
    color: '#6c757d',
    marginTop: 1,
  },
  value: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 1,
  },
  id: {
    position: 'absolute',
    bottom: 6,
    right: 10,
    fontSize: 7,
    color: '#adb5bd',
    fontStyle: 'italic',
  },
  qrArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    width: '100%',
  },
  qr: {
    width: 48,
    height: 48,
    borderRadius: 4,
    border: '1px solid #adb5bd',
    marginRight: 8,
  },
  backInfo: {
    fontSize: 7,
    color: '#495057',
    marginBottom: 2,
    textAlign: 'left',
    lineHeight: 1.2,
  },
  backTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  backLogo: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginBottom: 6,
    border: '1px solid #007bff',
    backgroundColor: '#e9ecef',
    alignSelf: 'center',
  },
});

const PDFLicense = ({ nombre, apellido, cedula }) => (
  <Document>
    <Page size="A4" style={{
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      padding: 0,
    }}>
      {/* Parte Frontal */}
      <View style={styles.card}>
        <View style={styles.cutLine} />
        <View style={styles.row}>
          <Image style={styles.logo} src={logoUrl} />
          <View style={styles.info}>
            <Text style={styles.schoolName}>Culinary School</Text>
            <Text style={styles.label}>Carnet Estudiantil</Text>
          </View>
        </View>
        <View style={{ marginTop: 6, width: '100%' }}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{nombre}</Text>
          <Text style={styles.label}>Apellido</Text>
          <Text style={styles.value}>{apellido}</Text>
          <Text style={styles.label}>Cédula</Text>
          <Text style={styles.value}>{cedula}</Text>
        </View>
        <Text style={styles.id}>Válido solo para estudiantes</Text>
      </View>

      {/* Parte Trasera */}
      <View style={styles.card}>

        <Text style={styles.backTitle}>Información del Estudiante</Text>
        <View style={styles.qrArea}>
          <Image style={styles.qr} src={getQrUrl(cedula)} />
          <View style={{ flex: 1 }}>
            <Text style={styles.backInfo}>
              Escanea este código QR para validar la autenticidad del carnet y obtener información actualizada del estudiante.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 8, width: '100%' }}>
          <Text style={styles.backInfo}>
            Dirección: Av. Principal, Edif. Culinary School, Ciudad Gourmet
          </Text>
          <Text style={styles.backInfo}>
            Tel: (0212) 123-4567 | www.culinaryschool.edu
          </Text>
          <Text style={styles.backInfo}>
            En caso de extravío, devolver a la institución.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFLicense;