import { Text, View, StyleSheet, Platform, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Cabezera() {
    const [nombre, setNombre] = useState<string | null>(null);
    const [apellidoMaterno, setApellidoMaterno] = useState<string | null>(null);
    const [apellidoPaterno, setApellidoPaterno] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNombre = async () => {
      try {
        const storedNombre = await AsyncStorage.getItem("nombre");
        setNombre(storedNombre ? JSON.parse(storedNombre) : "No encontrada");

        const storedApellidoPaterno = await AsyncStorage.getItem("apellidoPaterno");
        setApellidoPaterno(storedApellidoPaterno ? JSON.parse(storedApellidoPaterno) : "No encontrada");

        const storedApellidoMaterno = await AsyncStorage.getItem("apellidoMaterno");
        setApellidoMaterno(storedApellidoMaterno ? JSON.parse(storedApellidoMaterno) : "No encontrada");
      } catch (error) {
        console.error("Error al obtener el nombre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNombre();
  }, []);
  return (
    <>
        <View style={styles.header}>
            {loading ? (
                <ActivityIndicator size="large" color="#1E3A8A" />
            ) : (
                <Text style={styles.Titulo}>Bienvenid@, {nombre} {apellidoPaterno} {apellidoMaterno}</Text>
            )}
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1E3A8A",
        paddingTop: Platform.OS === "ios" ? 30 : 0,
    },
    Titulo: {
        fontSize: Platform.OS === "web" ? 54 : 24,
        color: "#fff",
        textAlign: "center",
        padding: 20,
    }
});