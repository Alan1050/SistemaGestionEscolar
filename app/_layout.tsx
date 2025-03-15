import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" options={{ headerShown: false }}/>
      <Stack.Screen name="IngresarAlumnos" options={{ headerShown: false }}/>
      <Stack.Screen name="IngresarDocente" options={{ headerShown: false }}/>
      <Stack.Screen name="IngresarAdministrativos" options={{ headerShown: false }}/>
      <Stack.Screen name="ListaAlumnos" options={{ headerShown: false }}/>
      <Stack.Screen name="ListaDocentes" options={{ headerShown: false }}/>
      <Stack.Screen name="ListaAdministrativo" options={{ headerShown: false }}/>
      <Stack.Screen name="ConsultaDocente" options={{ headerShown: false }}/>
      <Stack.Screen name="ConsultaAlumno" options={{ headerShown: false }}/>
      <Stack.Screen name="EditarAlumno" options={{ headerShown: false }}/>
      <Stack.Screen name="EditarDocente" options={{ headerShown: false }}/>
    </Stack>
  );
}
