import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import Cabezera from "@/includes/CabezeraDash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OpcionesAdministrativos from "./OpcionesAdministrativos";
import NavDocente from "../includes/navDocente";
import DatoIndvidualDocente from "./DatoIndividualDocente"
import NavAdmin from "@/includes/navAdmin";
import QRCode from 'react-native-qrcode-svg';

export default function Dashboard() {
  const [rol, setRol] = useState<string | null>(null);
  const [mat, setMat] = useState<string | null >(null);
  const [name, setName] = useState<string | null >(null);
  const [apellidoPaterno, setApePa] = useState<string | null >(null);
  const [apellidoMaterno, setApeMa] = useState<string | null >(null);
  const [carrera, setCarrera] = useState<string | null >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRol = async () => {
      try {
        const storedRol = await AsyncStorage.getItem("rol");
        setRol(storedRol ? JSON.parse(storedRol) : "No encontrada");
      } catch (error) {
        console.error("Error al obtener el nombre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRol();

    const fetchMat = async () => {

        try {
          const storedMat = await AsyncStorage.getItem("matricula");
          setMat(storedMat ? JSON.parse(storedMat) : "No encontrada");
        } catch (error) {
          console.error("Error al obtener el nombre:", error);
        } finally {
          setLoading(false);
        }

    };

    fetchMat();


    const fetchName = async () => {

      try {
        const storedName = await AsyncStorage.getItem("nombre");
        setName(storedName ? JSON.parse(storedName) : "No encontrada");
      } catch (error) {
        console.error("Error al obtener el nombre:", error);
      } finally {
        setLoading(false);
      }

  };

  fetchName();

  const fetchApePa = async () => {

    try {
      const storedApePa = await AsyncStorage.getItem("apellidoPaterno");
      setApePa(storedApePa ? JSON.parse(storedApePa) : "No encontrada");
    } catch (error) {
      console.error("Error al obtener el nombre:", error);
    } finally {
      setLoading(false);
    }

};

fetchApePa();

const fetchApeMa = async () => {

  try {
    const storedApeMa = await AsyncStorage.getItem("apellidoMaterno");
    setApeMa(storedApeMa ? JSON.parse(storedApeMa) : "No encontrada");
  } catch (error) {
    console.error("Error al obtener el nombre:", error);
  } finally {
    setLoading(false);
  }

};

fetchApeMa();

const fetchCarrera = async () => {
  if (rol === "Administrativo") {
    try {
      const storedCarrera = await AsyncStorage.getItem("area");
      setCarrera(storedCarrera ? JSON.parse(storedCarrera) : "No encontrada");
    } catch (error) {
      console.error("Error al obtener el nombre:", error);
    } finally {
      setLoading(false);
    }

  } else{

    try {
      const storedCarrera = await AsyncStorage.getItem("carrera");
      setCarrera(storedCarrera ? JSON.parse(storedCarrera) : "No encontrada");
    } catch (error) {
      console.error("Error al obtener el nombre:", error);
    } finally {
      setLoading(false);
    }
  }

};

fetchCarrera();

  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <Cabezera />
      {rol === "Docente" && (
          <NavDocente></NavDocente>
        )}
        {rol === "Administrativo" && (
          <NavAdmin></NavAdmin>
        )}
      <View style={styles.container}>
        <View style={styles.qrContainer}>
          {Platform.OS === "ios" && (<>
            <QRCode
            value={mat || "No encontada"} // El valor que se codificará en el QR
            size={200} // Tamaño del QR
            color="#000" // Color del QR
            backgroundColor="#fff" // Color de fondo del QR
          />
          </>)  }

          {Platform.OS === "android" && (<>
            <QRCode
            value={mat || "No encontada"} // El valor que se codificará en el QR
            size={200} // Tamaño del QR
            color="#000" // Color del QR
            backgroundColor="#fff" // Color de fondo del QR
          />
            <Text style={styles.textInfo}>{name} {apellidoPaterno} {apellidoMaterno}</Text>
            {rol === "Alumno" ? ( // Si el rol es "Alumno", muestra el texto
              <Text style={styles.textInfo}>Matricula: {mat}</Text>
            ) : 
            <Text style={styles.textInfo}>Clave: {mat}</Text>
            } {/* Si no, no muestres nada */}
            <Text style={styles.textInfo}>{carrera}</Text>
          </>)  }
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    zIndex: -1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 20,
    color: "green",
    marginTop: 10,
  }
});
