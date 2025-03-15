import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { app } from '../firebaseConfig'; // Importamos la configuración de Firebase
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';

// Definir una interfaz para los datos del alumno
interface Alumno {
  Clave: string;
  Nombre: string;
  ApePa: string;
  ApeMa: string;
  Email: string;
  NumeroTelefono?: string;
  Carrera?: string;
  Especialidad: string;
}

const db = getFirestore(app);

const DatoIndividualDocente: React.FC = () => {

    const router = useRouter();

  const { Clave } = useLocalSearchParams<{ Clave: string }>(); // Obtener la matrícula de la URL
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Estado para almacenar los datos del alumno
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga

  useEffect(() => {
    // Función para obtener los datos del alumno desde Firestore
    const fetchAlumno = async () => {
      try {
        const q = query(collection(db, 'Docente'), where('Clave', '==', Clave));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setAlumno({
            Clave: doc.data().Clave,
            Nombre: doc.data().Nombre,
            ApePa: doc.data().ApellidoPaterno,
            ApeMa: doc.data().ApellidoMaterno,
            Email: doc.data().Email,
            NumeroTelefono: doc.data().NumeroTelefono,
            Carrera: doc.data().Carrera,
            Especialidad: doc.data().Especialidad,
          });
        } else {
          console.log('No se encontró al Docente');
        }
      } catch (error) {
        console.error('Error al obtener los datos del Docente: ', error);
      } finally {
        setLoading(false); // Dejar de mostrar el indicador de carga
      }
    };

    fetchAlumno(); // Llamar a la función
  }, [Clave]); // Se ejecuta cada vez que cambia la matrícula


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
        <Text>No se encontró el docente con la clave: {Clave}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del Docente</Text>
      <Text style={styles.text}>Clave: {alumno.Clave}</Text>
      <Text style={styles.text}>Nombre: {alumno.Nombre}</Text>
      <Text style={styles.text}>Apellido Paterno: {alumno.ApePa}</Text>
      <Text style={styles.text}>Apellido Materno: {alumno.ApeMa}</Text>
      <Text style={styles.text}>Correo: {alumno.Email || 'No disponible'}</Text>
      <Text style={styles.text}>Teléfono: {alumno.NumeroTelefono || 'No disponible'}</Text>
      <Text style={styles.text}>Carrera: {alumno.Carrera || 'No disponible'}</Text>
      <Text style={styles.text}>Especialidad: {alumno.Especialidad || 'No especificada'}</Text>

      {/* Botón para eliminar al alumno */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    zIndex: -1,
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
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c', // Color rojo para el botón de eliminar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DatoIndividualDocente;
