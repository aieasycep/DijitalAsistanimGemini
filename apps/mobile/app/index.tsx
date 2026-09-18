import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#5B5CE2' }} />;
}
