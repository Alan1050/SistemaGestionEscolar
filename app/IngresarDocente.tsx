import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform, ScrollView, Modal, FlatList } from "react-native";
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

const IngresarDocentes: React.FC = () => {
    const router = useRouter();
    const [clave, setClave] = useState<string>("");
    const [carrera, setCarrera] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [apePaterno, setApePa] = useState<string>("");
    const [apeMaterno, setApeMa] = useState<string>("");
    const [edad, setEdad] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [especialidad, setEspecialidad] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const carreras = [
      { id: "1", nombre: "Ingeniería en Tecnologias de la Informacion e Innovacion Digital" },
      { id: "2", nombre: "Ingeniera Civil" },
      { id: "3", nombre: "Licenciatura en Negocios y Mercadotecnia" },
      { id: "4", nombre: "Licenciatura en Gastronomia" },
      { id: "5", nombre: "Ingenieria en Logistica Internacional" },
      { id: "6", nombre: "Ingenieria en Mecatronica" },
      { id: "7", nombre: "Ingenieria en Matenimiento Industrial" },
      { id: "8", nombre: "Licenciatura en Seguridad Publica" },
      { id: "9", nombre: "Licenciatura en Gestion y Desarrollo Turistico" },
      { id: "10", nombre: "Licenciatura en Administracion" },
      { id: "11", nombre: "Ingenieria en Alimentos" },
    ];

    const handleLogin = async () => {
        const trimmedClave = clave.trim();
        const trimmedCarrera = carrera.trim();
        const trimmedNombre = nombre.trim();
        const trimmedApePaterno = apePaterno.trim();
        const trimmedApeMaterno = apeMaterno.trim();
        const trimmedEdad = edad.trim();
        const trimmedEmail = email.trim();
        const trimmedTelefono = telefono.trim();
        const trimmedDireccion = direccion.trim();
        const trimmedEspecialidad = especialidad.trim();

        // Validar que la edad sea un número entero
        const edadNum = parseInt(trimmedEdad, 10);
        if (isNaN(edadNum)) {
            Alert.alert("Error", "La edad debe ser un número válido.");
            return;
        }

        // Verificar que todos los campos estén llenos
        if (
            !trimmedClave ||
            !trimmedCarrera ||
            !trimmedNombre ||
            !trimmedApePaterno ||
            !trimmedApeMaterno ||
            !trimmedEdad ||
            !trimmedEmail ||
            !trimmedTelefono ||
            !trimmedDireccion ||
            !trimmedEspecialidad
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
                Carrera: trimmedCarrera,
                Nombre: trimmedNombre,
                ApellidoPaterno: trimmedApePaterno,
                ApellidoMaterno: trimmedApeMaterno,
                Edad: edadNum, // Aquí se guarda la edad como número
                Email: trimmedEmail,
                NumeroTelefono: trimmedTelefono,
                Contrasena: trimmedClave,
                Direccion: trimmedDireccion,
                Especialidad: trimmedEspecialidad,
            });

            setLoading(false);
            if (Platform.OS === "web") {
              alert("El docente ha sido ingresado correctamente.");
              
            } else {
              Alert.alert("Éxito", "El docente ha sido ingresado correctamente.");
            }
            router.push("/IngresarDocente"); // Redirigir a otra página (opcional)
            setApeMa("");
            setApePa("");
            setCarrera("");
            setClave("");
            setDireccion("");
            setEdad("");
            setEmail("");
            setEspecialidad("");
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

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{ color: carrera ? "#000" : "#666" }}>
                    {carrera || "Selecciona una carrera"}
                  </Text>
                </TouchableOpacity>

                <Modal
                  visible={modalVisible}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <FlatList
                        data={carreras}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                              setCarrera(item.nombre);
                              setModalVisible(false);
                            }}
                          >
                            <Text>{item.nombre}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </Modal>

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

                <TextInput
                    style={styles.input}
                    placeholder="Especialidad"
                    placeholderTextColor="#666"
                    value={especialidad}
                    onChangeText={setEspecialidad}
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
        justifyContent: "center",
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default IngresarDocentes;