import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { app } from "../firebaseConfig"; // Importamos la configuración de Firebase
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Link } from 'expo-router';
import Cabezera from "@/includes/CabezeraDash";
import NavAdmin from "@/includes/navAdmin";

// Definir una interfaz para los datos de los alumnos (según tu estructura)
interface Alumno {
  Clave: string;
  Nombre: string;
  ApeMa: string;
  ApePa: string;
}

const db = getFirestore(app);

const ListaAdministrativos: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga
  const [search, setSearch] = useState<string>(""); // Estado para manejar la búsqueda por matrícula

  useEffect(() => {
    // Función para obtener los documentos de Firestore
    const fetchAlumnos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Administrativo"));
        const alumnosList: Alumno[] = [];
        querySnapshot.forEach((doc) => {
          alumnosList.push({
            Clave: doc.data().Clave,
            Nombre: doc.data().Nombre,
            ApeMa: doc.data().ApellidoMaterno,
            ApePa: doc.data().ApellidoPaterno,
          });
        });
        setAlumnos(alumnosList); // Guardar los alumnos en el estado
      } catch (error) {
        console.error("Error al obtener los alumnos: ", error);
      } finally {
        setLoading(false); // Dejar de mostrar el indicador de carga
      }
    };

    fetchAlumnos(); // Llamar a la función
  }, []); // Solo se ejecuta una vez al montar el componente

  // Filtrar los alumnos según la búsqueda
  const filteredAlumnos = alumnos.filter((alumno) =>
    alumno.Clave.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Text>Cargando...</Text>; // Mostrar mensaje de carga mientras obtenemos los datos
  }

  return (
    <>
      <Cabezera />
      <NavAdmin />
      
      <View style={styles.body}>
        {/* Campo de búsqueda con TextInput */}
        <TextInput
          placeholder="Buscar por clave..."
          value={search}
          onChangeText={(text) => setSearch(text)} // Actualiza el estado de búsqueda
          style={styles.input}
        />

        {/* Mostrar la lista de alumnos filtrados */}
        {filteredAlumnos.map((alumno) => (
          <Link
            href={`/ConsultaAlumno?Clave=${alumno.Clave}`}
            style={styles.item}
            key={alumno.Clave}
          >
            {alumno.Nombre} {alumno.ApePa} {alumno.ApeMa} - {alumno.Clave}
          </Link>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginBottom: 15,
    width: "100%",
    maxWidth: 300,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  body: {
    marginTop: 20,
    paddingHorizontal: "5%",
    backgroundColor: "#f9f9f9",
    flex: 1,
    zIndex: -1,
  },
  item: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Añadir sombra para android
  },
});

export default ListaAdministrativos;
