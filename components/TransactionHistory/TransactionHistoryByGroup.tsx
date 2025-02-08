import { TransactionHistoryType } from '@/lib/types';
import { Link, useRouter } from 'expo-router';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface TranstionHistoryByGroupProps {
  date: string;
  transactions: TransactionHistoryType[];
}
export const TranstionHistoryByGroup = ({
  date,
  transactions,
}: TranstionHistoryByGroupProps) => {
  const router = useRouter();

  return (
    <View>
      <Text className="mb-4 text-white text-2xl font-bold">{date}</Text>
      <View className="flex gap-6 mb-12">
        {transactions.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              router.push(`/(transactions)/details/${item.id}`);
            }}
          >
            <View className="p-4 bg-white rounded-md flex flex-row justify-between w-full">
              <View className="flex gap-2">
                <Text className="text-xl font-bold">{item.accountName}</Text>
                <Text className="text-lg text-gray-600">Type: {item.type}</Text>
              </View>
              <View className="flex justify-center">
                <Text
                  className={
                    item.type === 'credit' ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {` ${
                    item.type === 'credit' ? '+' : '-'
                  } MYR ${item.amount.toFixed(2)}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
