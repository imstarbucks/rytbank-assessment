import { Stack } from 'expo-router';
import '@/global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(transactions)/transactions"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(transactions)/details/[id]"
        options={{
          title: 'Details',
        }}
      />
    </Stack>
  );
}
