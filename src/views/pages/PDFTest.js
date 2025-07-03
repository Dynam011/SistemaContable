import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFLicense from '../../components/PDFs/PDFLicense';

const pdfs = [
  {
    nombre: 'Carnet Estudiantil',
    descripcion: 'Descarga tu carnet estudiantil personalizado, listo para imprimir y recortar.',
    componente: <PDFLicense nombre="Juan" apellido="Pérez" cedula="V-12345678" />,
    archivo: 'carnet-estudiantil.pdf',
    icon: '🎓',
  },
  // Puedes agregar más PDFs aquí
];

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 0',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: 32,
    marginBottom: 24,
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'box-shadow 0.2s',
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 1,
  },
  desc: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 18,
    textAlign: 'center',
  },
  button: {
    textDecoration: 'none',
    color: '#fff',
    background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
    padding: '10px 28px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(56,189,248,0.12)',
    transition: 'background 0.2s',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  header: {
    fontSize: 32,
    fontWeight: 800,
    color: '#2563eb',
    marginBottom: 32,
    letterSpacing: 2,
    textShadow: '0 2px 8px #e0e7ff',
  },
};

const PDFTest = () => (
  <div style={styles.page}>
    <div style={styles.header}>Descarga tus Documentos PDF</div>
    {pdfs.map((pdf, idx) => (
      <div key={idx} style={styles.card}>
        <div style={styles.icon}>{pdf.icon}</div>
        <div style={styles.title}>{pdf.nombre}</div>
        <div style={styles.desc}>{pdf.descripcion}</div>
        <PDFDownloadLink
          document={pdf.componente}
          fileName={pdf.archivo}
          style={styles.button}
        >
          {({ loading }) =>
            loading ? 'Generando PDF...' : `Descargar ${pdf.nombre}`
          }
        </PDFDownloadLink>
      </div>
    ))}
  </div>
);

export default PDFTest;