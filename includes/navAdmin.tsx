import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // Importa Link de expo-router
import { useNavigation } from '@react-navigation/native';

export default function NavAdmin() {
  const navigation = useNavigation();
  const [showIngresar, setShowIngresar] = useState(false); // Estado para mostrar/ocultar "Ingresar"
  const [showListas, setShowListas] = useState(false); // Estado para mostrar/ocultar "Listas"

  return (
    <View style={styles.header}>
      {/* Enlace al Dashboard */}
      <Link href="/Dashboard" style={styles.op}>
        <Text style={styles.opText}>Dashboard</Text>
      </Link>


        <TouchableOpacity
          style={styles.op}
          onPress={() => {
            setShowIngresar(!showIngresar); // Alternar visibilidad de "Ingresar"
            setShowListas(false); // Cerrar "Listas" si está abierto
          }}
        >
          <Text style={styles.opText}>Ingresar</Text>
        </TouchableOpacity>


      {/* Lista desplegable de "Ingresar" */}
      { showIngresar && (
        <View style={styles.dropdown}>
          <Link href="/IngresarDocente" style={styles.dropdownLink}>
            <Text style={styles.dropdownText}>Ingresar Docente</Text>
          </Link>
          <Link href="/IngresarAlumnos" style={styles.dropdownLink}>
            <Text style={styles.dropdownText}>Ingresar Alumnos</Text>
          </Link>
        </View>
      )}


        <TouchableOpacity
          style={styles.op}
          onPress={() => {
            setShowListas(!showListas); // Alternar visibilidad de "Listas"
            setShowIngresar(false); // Cerrar "Ingresar" si está abierto
          }}
        >
          <Text style={styles.opText}>Listas</Text>
        </TouchableOpacity>

      {/* Lista desplegable de "Listas" */}
      { showListas && (
        <View style={styles.dropdown}>
          <Link href="/ListaAlumnos" style={styles.dropdownLink}>
            <Text style={styles.dropdownText}>Lista Alumnos</Text>
          </Link>
          <Link href="/ListaDocentes" style={styles.dropdownLink}>
            <Text style={styles.dropdownText}>Lista Docentes</Text>
          </Link>
          <Link href="/ListaAdministrativo" style={styles.dropdownLink}>
            <Text style={styles.dropdownText}>Lista Administrativos</Text>
          </Link>
        </View>
      )}

      {/* Enlace para Cerrar Sesión */}
      <Link href="/" style={styles.op}>
        <Text style={styles.opText}>Cerrar Sesión</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E3A8A',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1, // Grosor del borde superior
    borderTopColor: '#FFFFFF', // Color del borde superior
    paddingHorizontal: 10, // Espaciado horizontal
    position: 'relative', // Necesario para posicionar el dropdown correctamente
  },
  op: {
    textAlign: 'center',
    width: '25%',
    paddingTop: 20,
    paddingBottom: 20,
    cursor: 'pointer', // Cambia el cursor en la web
  },
  opText: {
    color: '#fff',
    fontSize: Platform.OS === 'web' ? 24 : 16, // Tamaño de fuente adaptativo
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal', // Peso de la fuente adaptativo
    textAlign: "center",
  },
  dropdown: {
    position: 'absolute',
    top: 60, // Ajusta la posición vertical del dropdown
    backgroundColor: '#1E3A8A',
    width: Platform.OS === "web" ? "20%" : "50%",
    zIndex: 100, // Asegura que el dropdown esté por encima de otros elementos
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    marginLeft: Platform.OS === "web" ? 0 : 20,
  },
  dropdownLink: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownText: {
    color: '#fff',
    fontSize: Platform.OS === 'web' ? 18 : 14, // Tamaño de fuente adaptativo
    textAlign: "center",
  },
});