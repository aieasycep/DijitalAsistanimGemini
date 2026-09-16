import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="meeting-prep" options={{ presentation: 'modal', headerTitle: "Toplantı Hazırlığı" }} />
      <Stack.Screen name="email-detail" options={{ presentation: 'card', headerTitle: "Mail Detayı" }} />
    </Stack>
  );
}
