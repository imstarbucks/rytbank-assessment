import { useCallback, useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Eye, EyeClosed } from 'lucide-react-native';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TransactionHistoryType } from '@/utils/types';
import { transactionHistoryData } from '@/utils/const';
import { TranstionHistoryByGroup } from './TransactionHistoryByGroup';
import { useBiometricStore } from '@/store/useBiometricStore';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { Link } from 'expo-router';

export const TransactionHistory = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isCompatible = useBiometricStore((state) => state.isCompatible);
  const isAuthenticated = useAuthenticationStore(
    (state) => state.isAuthenticated
  );

  const groupped = groupTransactionsByDate(transactionHistoryData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  return (
    <View>
      <TouchableOpacity
        className="w-full rounded-lg px-4 py-2 border border-white my-6 flex flex-row justify-center items-center gap-x-3"
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
      <FlatList
        contentContainerStyle={{
          paddingBottom: 300,
        }}
        ListFooterComponent={() => (
          <View>
            <Text className="text-lg text-white text-center">
              - End of transaction history -
            </Text>
          </View>
        )}
        data={groupped}
        keyExtractor={(item) => item.date}
        initialNumToRender={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TranstionHistoryByGroup
            date={item.date}
            transactions={item.data}
            isAmountVisible={isAmountVisible}
          />
        )}
      />
    </View>
  );
};

const Unauthenticated = () => {
  return (
    <View className="bg-blue-600 min-h-screen flex items-center mt-12">
      <Text className="text-white text-4xl mb-8">You are not logged in.</Text>
      <Link
        href={'/(auth)'}
        className="border border-white rounded-md px-12 py-4"
      >
        <Text className="text-white text-lg">Return to login screen</Text>
      </Link>
    </View>
  );
};

const groupTransactionsByDate = (transactions: TransactionHistoryType[]) => {
  const group = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.date]) {
      acc[transaction.date] = [];
    }
    acc[transaction.date].push(transaction);

    return acc;
  }, {} as Record<string, TransactionHistoryType[]>);
  return Object.keys(group).map((date) => ({
    date: date,
    data: group[date],
  }));
};
