import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform, ScrollView } from "react-native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; 
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabezera from "@/includes/CabezeraDash";
import NavAdmin from "@/includes/navAdmin";

const db = getFirestore(app);

const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error al guardar ${key}:`, e);
    }
  };

const IngresarAdministrativos: React.FC = () => {
    const router = useRouter();
    const [clave, setClave] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [apePaterno, setApePa] = useState<string>("");
    const [apeMaterno, setApeMa] = useState<string>("");
    const [edad, setEdad] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [especialidad, setEspecialidad] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleLogin = async () => {
        const trimmedClave = clave.trim();
        const trimmedArea = area.trim();
        const trimmedNombre = nombre.trim();
        const trimmedApePaterno = apePaterno.trim();
        const trimmedApeMaterno = apeMaterno.trim();
        const trimmedEdad = edad.trim();
        const trimmedEmail = email.trim();
        const trimmedTelefono = telefono.trim();
        const trimmedDireccion = direccion.trim();

        // Validar que la edad sea un número entero
        const edadNum = parseInt(trimmedEdad, 10);
        if (isNaN(edadNum)) {
            Alert.alert("Error", "La edad debe ser un número válido.");
            return;
        }

        // Verificar que todos los campos estén llenos
        if (
            !trimmedClave ||
            !trimmedArea ||
            !trimmedNombre ||
            !trimmedApePaterno ||
            !trimmedApeMaterno ||
            !trimmedEdad ||
            !trimmedEmail ||
            !trimmedTelefono ||
            !trimmedDireccion 
        ) {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            // Crear un documento en Firestore con la matrícula como ID del documento
            const docRef = doc(db, "Docente", trimmedClave); // 'alumnos' es el nombre de la colección y 'matricula' el ID del documento
            await setDoc(docRef, {
                Clave: trimmedClave,
                Area: trimmedArea,
                Nombre: trimmedNombre,
                ApellidoPaterno: trimmedApePaterno,
                ApellidoMaterno: trimmedApeMaterno,
                Edad: edadNum, // Aquí se guarda la edad como número
                Email: trimmedEmail,
                NumeroTelefono: trimmedTelefono,
                Contrasena: trimmedClave,
                Direccion: trimmedDireccion,
            });

            setLoading(false);
            if (Platform.OS === "web") {
              alert("El docente ha sido ingresado correctamente.");
              
            } else {
              Alert.alert("Éxito", "El administrativo ha sido ingresado correctamente.");
            }
            router.push("/IngresarAdministrativos"); // Redirigir a otra página (opcional)
            setApeMa("");
            setApePa("");
            setArea("");
            setClave("");
            setDireccion("");
            setEdad("");
            setEmail("");
            setNombre("");
            setTelefono("");
        } catch (error) {
          if (Platform.OS === "web") {
            alert("Hubo un problema al ingresar los datos.");
            console.error("Error al guardar los datos:", error);
            setLoading(false);
          } else{
            console.error("Error al guardar los datos:", error);
            setLoading(false);
            Alert.alert("Error", "Hubo un problema al ingresar los datos.");
          }
        }
    };

    return (
        <>
          <ScrollView>
          <Cabezera />
            <NavAdmin />
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Clave"
                    placeholderTextColor="#666"
                    value={clave}
                    onChangeText={setClave}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Area"
                    placeholderTextColor="#666"
                    value={area}
                    onChangeText={setArea}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#666"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Apellido Paterno"
                    placeholderTextColor="#666"
                    value={apePaterno}
                    onChangeText={setApePa}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Apellido Materno"
                    placeholderTextColor="#666"
                    value={apeMaterno}
                    onChangeText={setApeMa}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    placeholderTextColor="#666"
                    value={edad}
                    onChangeText={setEdad}
                    keyboardType="numeric" // Para facilitar la entrada de números
                />

                <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    placeholderTextColor="#666"
                    value={telefono}
                    onChangeText={setTelefono}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Direccion"
                    placeholderTextColor="#666"
                    value={direccion}
                    onChangeText={setDireccion}
                />
                
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ingresar</Text>}
                </TouchableOpacity>
            </View>
          </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        width: "90%",
        margin: "auto",
        marginTop: 40,
        marginBottom: 70,
        zIndex: -1,
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    button: {
        width: "40%",
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

export default IngresarAdministrativos;
