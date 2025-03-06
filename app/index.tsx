import Cabezera from "@/includes/Cabezera";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase

const db = getFirestore(app); // Inicializa Firestore

const Login: React.FC = () => {

    const [matricula, setMatricula] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleLogin = async () => {
      if (!matricula || !password) {
        Alert.alert("Error", "Por favor, ingresa tu matrícula y contraseña");
        return;
      }
    
      setLoading(true);
    
      try {
        // Buscar matrícula en Firestore
        const docRef = doc(db, "Alumnos", matricula);
        const docSnap = await getDoc(docRef);
    
        // Verificar si el documento existe (esto aplica para todas las plataformas)
        if (docSnap.exists()) {
          const data = docSnap.data();
    
          if (data.Contraseña === password) {
            if (Platform.OS !== "web") {
              Alert.alert("Éxito", "Inicio de sesión exitoso");
              
            } else {
              alert("Inicio de sesión exitoso ");
              window.location.href = "/Dashboard";
            }
            // Aquí puedes navegar a otra pantalla
          } else {
            if (Platform.OS !== "web") {
            Alert.alert("Error", "Contraseña incorrecta");
            } else {
              alert("Contraseña incorrecta");
            }
            setPassword("");
          }
        } else {
          if (Platform.OS !== "web") {
          Alert.alert("Error", "Matrícula no encontrada");
          } else {
            alert("Matrícula no encontrada");
          }
          setMatricula("");
          setPassword("");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        Alert.alert("Error", "No se pudo iniciar sesión, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      // Aseguramos que el componente tenga un único contenedor raíz
        <>
              <Cabezera></Cabezera>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          placeholderTextColor="#888"
          value={matricula}
          onChangeText={setMatricula}
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
        </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      width: Platform.OS === "web" ? "50%" : "90%",
      backgroundColor: Platform.OS === "web" ? "#f0f0f0" : "#fff", 
      borderRadius: 10,
      height: Platform.OS === "web" ? "50%" : "auto",
      margin: "auto",
    },
    title: {
      fontSize: Platform.OS === "web" ? 39 : 24,
      color: "#333",
      marginBottom: Platform.OS === "web" ? 40 : 15,
    },
    input: {
      width: "100%",
      height: 45,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: Platform.OS === "web" ? 25 : 15,
      fontSize: Platform.OS === "web" ? 20 : 16,
      backgroundColor: "#fff",
    },
    button: {
      width: Platform.OS === "web" ? "30%" : "40%",
      height: 45,
      backgroundColor: "#1E3A8A",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
  });
  
  export default Login;
