import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#5B5CE2',
      tabBarInactiveTintColor: '#9B978E',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#E8E8F0',
        backgroundColor: '#FFFFFF',
        height: 60,
        paddingBottom: 8,
        paddingTop: 6,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Bugün",
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons name={focused ? "today" : "today-outline"} size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flow"
        options={{
          title: "Akış",
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons name={focused ? "list" : "list-outline"} size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons name={focused ? "calendar" : "calendar-outline"} size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: "Asistan",
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ayarlar",
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={23} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
