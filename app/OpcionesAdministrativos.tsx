import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from 'expo-router';

export default function OpcionesAdministrativos() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Link href="/IngresarAlumnos" style={styles.button}>
        Ingresar Alumnos
      </Link>

      <Link href="/IngresarDocente" style={styles.button}>
        Ingresar Docentes
      </Link>

      <Link href="/IngresarAdministrativos" style={styles.button}>
        Ingresar Administrativo
      </Link>

      <Link href="/ListaAlumnos" style={styles.button}>
        Lista Alumnos
      </Link>

      <Link href="/ListaDocentes" style={styles.button}>
        Lista Docente
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: "#007AFF", // Color azul tipo iOS
    textAlign: "center",
    justifyContent: "center",

    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    color: "#FFFFFF",
    height: Platform.OS === "web" ? 80 : 50,
    lineHeight: Platform.OS === "web" ? 80 : 50,
    paddingLeft: 40,
    paddingRight: 40,
    cursor: "pointer",
    fontSize: Platform.OS === "web" ? 34 : 18,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
