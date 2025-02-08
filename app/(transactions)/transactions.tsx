import { View, Text } from 'react-native';
import { TransactionHistory } from '@/components/TransactionHistory';

const TransactionHistoryScreen = () => {
  return (
    <View className="px-6 pb-6 min-h-screen bg-blue-600 pt-32">
      <Text className="text-white text-3xl font-bold">Transation History</Text>
      <TransactionHistory />
    </View>
  );
};

export default TransactionHistoryScreen;
