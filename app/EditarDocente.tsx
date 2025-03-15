import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { app } from '../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Cabezera from "@/includes/CabezeraDash";
import NavAdmin from "@/includes/navAdmin";

const db = getFirestore(app);

const EditarAlumno = () => {
  const router = useRouter();
  const { Clave } = useLocalSearchParams<{ Clave: string }>();
  const [alumno, setAlumno] = useState({
    Clave: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Email: '',
    NumeroTelefono: '',
    Carrera: '',
  });

  useEffect(() => {
    const fetchAlumno = async () => {
      const docRef = doc(db, 'Docente', Clave);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAlumno(docSnap.data() as any);
      } else {
        Alert.alert('Error', 'No se encontró el alumno');
      }
    };
    fetchAlumno();
  }, [Clave]);

  const handleGuardar = async () => {
    try {
      const docRef = doc(db, 'Docente', Clave);
      await updateDoc(docRef, {
        Nombre: alumno.Nombre,
        ApellidoPaterno: alumno.ApellidoPaterno,
        ApellidoMaterno: alumno.ApellidoMaterno,
        Email: alumno.Email,
        NumeroTelefono: alumno.NumeroTelefono,
      });
      if (Platform.OS === "web") {
        alert("Los datos han sido actualizados")
      } else{
        Alert.alert('Éxito', 'Los datos han sido actualizados');
      }
      router.back();
    } catch (error) {
      console.error('Error al actualizar los datos: ', error);
      Alert.alert('Error', 'Hubo un problema al actualizar los datos');
    }
  };

  return (
    <>
        <Cabezera></Cabezera>
        <NavAdmin></NavAdmin>
        <View style={styles.container}>
        <Text style={styles.title}>Editar Alumno</Text>
        <TextInput
            style={styles.input}
            value={alumno.Nombre}
            onChangeText={(text) => setAlumno({ ...alumno, Nombre: text })}
            placeholder="Nombre"
        />
        <TextInput
            style={styles.input}
            value={alumno.ApellidoPaterno}
            onChangeText={(text) => setAlumno({ ...alumno, ApellidoPaterno: text })}
            placeholder="Apellido Paterno"
        />
        <TextInput
            style={styles.input}
            value={alumno.ApellidoMaterno}
            onChangeText={(text) => setAlumno({ ...alumno, ApellidoMaterno: text })}
            placeholder="Apellido Materno"
        />
        <TextInput
            style={styles.input}
            value={alumno.Email}
            onChangeText={(text) => setAlumno({ ...alumno, Email: text })}
            placeholder="Correo Electrónico"
        />
        <TextInput
            style={styles.input}
            value={alumno.NumeroTelefono}
            onChangeText={(text) => setAlumno({ ...alumno, NumeroTelefono: text })}
            placeholder="Teléfono"
        />
        <TextInput
            style={styles.input}
            value={alumno.Carrera}
            onChangeText={(text) => setAlumno({ ...alumno, Carrera: text })}
            placeholder="Carrera"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditarAlumno;