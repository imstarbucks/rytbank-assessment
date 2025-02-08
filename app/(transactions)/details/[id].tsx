import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { transactionHistoryData } from '@/utils/const';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const transactionDetails = transactionHistoryData.find((t) => t.id === id);

  if (!transactionDetails)
    return (
      <View>
        <Text>Transaction details not found...</Text>
      </View>
    );

  return (
    <View className="space-y-6 text-white bg-blue-600">
      <Text>Transaction ID: {transactionDetails.id}</Text>
      <Text>Account name: {transactionDetails.accountName}</Text>
      <Text>Description: {transactionDetails.description}</Text>
      <Text>Amount: MYR {transactionDetails.amount}</Text>
      <Text>Date: {transactionDetails.date}</Text>
      <Text>type: {transactionDetails.type}</Text>
    </View>
  );
};

export default DetailsScreen;
