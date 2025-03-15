import Cabezera from "@/includes/Cabezera";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ActivityIndicator } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; 
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore(app); 

const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error al guardar ${key}:`, e);
  }
};

const Login: React.FC = () => {
    const router = useRouter();
    const [matricula, setMatricula] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleLogin = async () => {
      const trimmedMatricula = matricula.trim();
      const trimmedPassword = password.trim();

      if (!trimmedMatricula || !trimmedPassword) {
        Alert.alert("Error", "Por favor, ingresa tu matrícula y contraseña");
        return;
      }

      setLoading(true);
    
      try {
        // Guardar en almacenamiento local
        await storeData("matricula", trimmedMatricula);
        await storeData("password", trimmedPassword);

        // Buscar usuario en Firestore
        const docRef = doc(db, "Alumnos", trimmedMatricula);
        const docSnap = await getDoc(docRef);

        const docRef2 = doc(db, "Administrativo", trimmedMatricula);
        const docSnap2 = await getDoc(docRef2);

        const docRef3 = doc(db, "Docente", trimmedMatricula);
        const docSnap3 = await getDoc(docRef3);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          await storeData("nombre", data.Nombre);
          await storeData("apellidoMaterno", data.ApellidoMaterno);
          await storeData("apellidoPaterno", data.ApellidoPaterno);
          await storeData("correo", data.Email);
          await storeData("telefono", data.NumeroTelefono);
          await storeData("carrera", data.Carrera);
          await storeData("rol", "Alumno");
          if (data.Contrasena === trimmedPassword) {
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            router.push("/Dashboard"); // Redirige al Dashboard
          } else {
            Alert.alert("Error", "Contraseña incorrecta");
            setPassword("");
          }
        } else if (docSnap2.exists()) {
          const data = docSnap2.data();
          await storeData("nombre", data.Nombre);
          await storeData("apellidoMaterno", data.ApellidoMaterno);
          await storeData("apellidoPaterno", data.ApellidoPaterno);
          await storeData("correo", data.Email);
          await storeData("telefono", data.NumeroTelefono);
          await storeData("area", data.Area);
          await storeData("rol", "Administrativo");
          if (data.Contrasena === trimmedPassword) {
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            router.push("/Dashboard"); // Redirige al Dashboard
          } else {
            if (Platform.OS === "web") {
              alert("Contraseña incorrecta");
            } else {
              Alert.alert("Error", "Contraseña incorrecta");
            }
            setPassword("");
          }
        }else if (docSnap3.exists()) {
          const data = docSnap3.data();
          await storeData("nombre", data.Nombre);
          await storeData("apellidoMaterno", data.ApellidoMaterno);
          await storeData("apellidoPaterno", data.ApellidoPaterno);
          await storeData("correo", data.Email);
          await storeData("telefono", data.NumeroTelefono);
          await storeData("carrera", data.Carrera);
          await storeData("rol", "Docente");
          if (data.Contrasena === trimmedPassword) {
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            router.push("/Dashboard"); // Redirige al Dashboard
          } else {
            if (Platform.OS === "web") {
              alert("Contraseña incorrecta");
            } else {
              Alert.alert("Error", "Contraseña incorrecta");
            }
            setPassword("");
          }
        }  else {
          Alert.alert("Error", "Matrícula y/o Clave no encontrada");
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
        <>
            <Cabezera />
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Matrícula o Clave"
                    placeholderTextColor="#666"
                    value={matricula}
                    onChangeText={setMatricula}
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Iniciar Sesión</Text>}
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
      fontWeight: "bold",
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
