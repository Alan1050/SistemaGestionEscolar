import { Text, View, StyleSheet, Platform } from "react-native";

export default function Cabezera() {
  return (
    <>
        <View style={styles.header}>
            <Text style={styles.Titulo}>Sistema Integral de Control</Text>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1E3A8A",
        paddingTop: Platform.OS === "web" ? 0 : 30,
    },
    Titulo: {
        fontSize: Platform.OS === "web" ? 54 : 24,
        color: "#fff",
        textAlign: "center",
        padding: 20,
    }
});