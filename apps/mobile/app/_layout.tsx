import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="morning-briefing" options={{ presentation: 'fullScreenModal', headerShown: false }} />
      <Stack.Screen name="meeting-prep" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="email-detail" options={{ presentation: 'card', headerShown: true, headerTitle: "Mail Detayı" }} />
      <Stack.Screen name="approval-center" options={{ presentation: 'card', headerShown: false }} />
      <Stack.Screen name="universal-capture" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
