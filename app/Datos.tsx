import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import Cabezera from "@/includes/CabezeraDash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OpcionesAdministrativos from "./OpcionesAdministrativos";

export default function Datos() {
  const [rol, setRol] = useState<string | null>(null);
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
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <Cabezera />
      <View style={styles.container}>
        {rol === "Administrativo" && (
            Platform.OS === "web" ? <OpcionesAdministrativos></OpcionesAdministrativos> : "Bienvenido Administrativo"
        )}
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
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
