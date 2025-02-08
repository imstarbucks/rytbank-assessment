import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { useBiometricStore } from '@/store/useBiometricStore';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';

const LoginScreen = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { isCompatible } = useBiometricStore((state) => state);
  const setIsCompatible = useBiometricStore((state) => state.setIsCompatible);
  const setIsAuthenticated = useAuthenticationStore(
    (state) => state.setIsAuthenticated
  );

  const router = useRouter();

  const checkBiometricSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        setErrorMessages([
          'Biometrics authentication is not suppoted in this devide',
          ...errorMessages,
        ]);
      }

      setIsCompatible(compatible);
    } catch (error) {
      setIsCompatible(false);
      setErrorMessages([
        `Error during biometric authentication: ${error}`,
        ...errorMessages,
      ]);
      console.error('Error during biometric authentication:', error);
    }
  };

  const handleAuthenticateUser = async () => {
    if (isCompatible) {
      const authenticate = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to show transactions amount',
        fallbackLabel: 'Enter passcode',
      });

      if (authenticate.success) {
        setIsAuthenticated(true);
        router.push('/(transactions)/transactions');
        return;
      }

      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  return (
    <View className="p-6 min-h-screen bg-blue-600 flex items-center justify-start pt-52 gap-y-12">
      <Image source={require('@/assets/images/ryt-logo.png')} />
      <Text className="text-3xl text-white font-bold">User Login</Text>
      <TouchableOpacity
        onPress={() => handleAuthenticateUser()}
        className="px-12 py-4 border border-white rounded-md"
      >
        <Text className="text-white text-2xl font-bold">Login</Text>
      </TouchableOpacity>
      {errorMessages.length > 0 && (
        <View className="space-y-2">
          {errorMessages.map((err) => (
            <Text className="text-sm text-red-500" key={err}>
              {err}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
