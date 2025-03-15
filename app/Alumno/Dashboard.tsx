import QRCode from 'react-native-qrcode-svg';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { app } from '../../firebaseConfig'; // Importamos la configuración de Firebase
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';
import Cabezera from "@/includes/CabezeraDash";


const CredencialDigital = () => {

    return(
        <>
<View style={styles.qrContainer}>
        <QRCode
          value={alumno.Matricula} // El valor que se codificará en el QR
          size={200} // Tamaño del QR
          color="#000" // Color del QR
          backgroundColor="#fff" // Color de fondo del QR
        />
      </View>

        </>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "condensed",
  },
  textSpan:{
    fontWeight: "400",
    marginLeft: 20,
    fontSize: 18,
    color: "green"
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c', // Color rojo para el botón de eliminar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: "80%",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton:{
    marginTop: 20,
    backgroundColor: 'green', // Color rojo para el botón de eliminar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: "80%",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
  },
  column: {
    flex: 1, // Cada columna ocupa el 50% del espacio disponible
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default CredencialDigital;