import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { app } from '../firebaseConfig'; // Importamos la configuración de Firebase
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';
import Cabezera from "@/includes/CabezeraDash";
import NavAdmin from "@/includes/navAdmin";
import QRCode from 'react-native-qrcode-svg';

// Definir una interfaz para los datos del alumno
interface Alumno {
  Matricula: string;
  Nombre: string;
  ApePa: string;
  ApeMa: string;
  Email: string;
  NumeroTelefono?: string;
  Carrera?: string;
}

const db = getFirestore(app);

const ConsultaAlumno = () => {
  const router = useRouter();
  const { Matricula } = useLocalSearchParams<{ Matricula: string }>(); // Obtener la matrícula de la URL
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Estado para almacenar los datos del alumno
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga

  useEffect(() => {
    // Función para obtener los datos del alumno desde Firestore
    const fetchAlumno = async () => {
      try {
        const q = query(collection(db, 'Alumnos'), where('Matricula', '==', Matricula));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setAlumno({
            Matricula: doc.data().Matricula,
            Nombre: doc.data().Nombre,
            ApePa: doc.data().ApellidoPaterno,
            ApeMa: doc.data().ApellidoMaterno,
            Email: doc.data().Email,
            NumeroTelefono: doc.data().NumeroTelefono,
            Carrera: doc.data().Carrera,
          });
        } else {
          console.log('No se encontró el alumno');
        }
      } catch (error) {
        console.error('Error al obtener los datos del alumno: ', error);
      } finally {
        setLoading(false); // Dejar de mostrar el indicador de carga
      }
    };

    fetchAlumno(); // Llamar a la función
  }, [Matricula]); // Se ejecuta cada vez que cambia la matrícula

  // Función para eliminar el alumno
  const handleEliminar = async () => {
    try {
      const docRef = doc(db, 'Alumnos', Matricula); // Referencia al documento del alumno
      await deleteDoc(docRef); // Eliminar el documento
      if (Platform.OS === "web") {
        alert("El alumno se ha eliminado correctamente");
      } else {
        Alert.alert('Éxito', 'El alumno ha sido eliminado correctamente');
      }
      router.push("/ListaAlumnos"); // Redirigir a la lista de alumnos
    } catch (error) {
      console.error('Error al eliminar al alumno: ', error);
      Alert.alert('Error', 'Hubo un problema al eliminar al alumno');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!alumno) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el alumno con la matrícula: {Matricula}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <Cabezera></Cabezera>
    <NavAdmin></NavAdmin>
        <View style={styles.container}>
        <Text style={styles.title}>Datos del Alumno</Text>
        <Text style={styles.text}>Matrícula: <Text style={styles.textSpan}>{alumno.Matricula}</Text></Text>
        <Text style={styles.text}>Nombre(s): <Text style={styles.textSpan}>{alumno.Nombre} </Text></Text>
        <Text style={styles.text}>Apellido Paterno: <Text style={styles.textSpan}> {alumno.ApePa} </Text></Text>
        <Text style={styles.text}>Apellido Materno: <Text style={styles.textSpan}>{alumno.ApeMa}</Text></Text>
        <Text style={styles.text}>Correo: <Text style={styles.textSpan}>{alumno.Email || 'No disponible'}</Text></Text>
        <Text style={styles.text}>Teléfono: <Text style={styles.textSpan}>{alumno.NumeroTelefono || 'No disponible'}</Text></Text>
        <Text style={styles.text}>Carrera: <Text style={styles.textSpan}>{alumno.Carrera || 'No disponible'}</Text></Text>

        <View style={styles.container2}>
                  {/* Botón para eliminar al alumno */}
            <View style={styles.column}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
                <Text style={styles.deleteButtonText}>Dar de baja</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.column}>
                <TouchableOpacity style={styles.editButton} onPress={() => router.push(`/EditarAlumno?Matricula=${Matricula}`)}>
                <Text style={styles.deleteButtonText}>Editar Datos</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.qrContainer}>
        <QRCode
          value={alumno.Matricula} // El valor que se codificará en el QR
          size={200} // Tamaño del QR
          color="#000" // Color del QR
          backgroundColor="#fff" // Color de fondo del QR
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    zIndex: -1,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "condensed",
  },
  textSpan:{
    fontWeight: "400",
    marginLeft: 20,
    fontSize: 18,
    color: "green"
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c', // Color rojo para el botón de eliminar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: "80%",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton:{
    marginTop: 20,
    backgroundColor: 'green', // Color rojo para el botón de eliminar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: "80%",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
  },
  column: {
    flex: 1, // Cada columna ocupa el 50% del espacio disponible
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ConsultaAlumno;