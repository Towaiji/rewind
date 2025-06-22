import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href="/login" />;
  }
  return <Redirect href="/(tabs)" />;
}