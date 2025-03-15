import { Text, View, StyleSheet, Platform } from "react-native";
import { Link } from 'expo-router';
import { useNavigation } from "@react-navigation/native";

export default function NavDocente() {

      const navigation = useNavigation();
    
  return (
    <>
        <View style={styles.header}>
            <Link href="/Dashboard" style={styles.op}>
                Dashboard
            </Link>

            <Link href="/" style={styles.op}>
                Chat´s
            </Link>

            <Link href="/" style={styles.op}>
                Subir Calificaciones
            </Link>

            <Link href="/" style={styles.op}>
                Lista de Alumnos
            </Link>

            <Link href="/" style={styles.op}>
                Cerrar Sesion
            </Link>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1E3A8A",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 1,  // Definimos el grosor del borde superior
        borderTopColor: "#FFFFFF",  // El color del borde superior es blanco
    },
    op:{
        textAlign: "center",
        color: "#fff",
        width: "20%",
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: Platform.OS === "web" ? 24 : 10,
        fontWeight: Platform.OS === "web" ? "bold" : "normal",
        cursor: "pointer",
    }
});