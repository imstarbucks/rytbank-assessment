import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Eye, EyeClosed } from 'lucide-react-native';
import { useBiometricStore } from '@/store/useBiometricStore';
import { TouchableOpacity, Text, View } from 'react-native';
import { TextDetails } from '../Details/TextDetails';

const TotalAmount = () => {
  const isCompatible = useBiometricStore((state) => state.isCompatible);
  const [isAmountVisible, setIsAmountVisible] = useState(false);

  const handleAuthenticateUser = async () => {
    if (isCompatible) {
      const authenticate = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to show transactions amount',
        fallbackLabel: 'Enter passcode',
      });

      if (authenticate.success) {
        setIsAmountVisible(true);
      } else {
        setIsAmountVisible(false);
      }
    }
  };

  return (
    <View>
      <TextDetails
        label="Amount"
        content={isAmountVisible ? 'MYR 4000.30' : 'MYR *****'}
        align={'center'}
        size={'lg'}
        className="mt-8"
      />
      <TouchableOpacity
        className="w-fit rounded-lg px-4 py-2 border border-white mb-6 flex flex-row justify-center items-center gap-x-3"
        onPress={() => {
          if (!isAmountVisible) {
            handleAuthenticateUser();
            return;
          }

          setIsAmountVisible(false);
        }}
      >
        {isAmountVisible ? (
          <EyeClosed color={'white'} size={16} />
        ) : (
          <Eye color={'white'} />
        )}
        <Text className="text-lg font-bold text-white text-center">
          {isAmountVisible ? 'Hide' : 'Show'} amount
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export { TotalAmount };
