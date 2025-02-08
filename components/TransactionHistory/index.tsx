import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TransactionHistoryType } from '@/lib/types';
import { transactionHistoryData } from '@/lib/const';
import { TranstionHistoryByGroup } from './TransactionHistoryByGroup';
import { buttonVariants } from '../ui/LinkButton';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { LinkButton } from '../ui/LinkButton';
import { TotalAmount } from './TotalAmount';
import { cn } from '@/lib/utils';

export const TransactionHistory = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [current, setCurrent] = useState(5);
  const [data, setData] = useState(transactionHistoryData.slice(0, current));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isAuthenticated = useAuthenticationStore(
    (state) => state.isAuthenticated
  );

  const groupped = groupTransactionsByDate(data);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const loadMoreData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newCurrent = current + 5;
    const newData = transactionHistoryData.slice(0, newCurrent);

    setCurrent((state) => (state += 5));

    setTimeout(() => {
      setData(newData);
      setLoading(false);
    }, 500);

    if (newData.length === transactionHistoryData.length) {
      setHasMore(false);
    }
  };

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  return (
    <View>
      <TotalAmount />
      <FlatList
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        data={groupped}
        keyExtractor={(item) => item.date}
        initialNumToRender={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TranstionHistoryByGroup date={item.date} transactions={item.data} />
        )}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator size="large" color="white" className="mb-12" />
          ) : (
            hasMore && (
              <TouchableOpacity
                onPress={loadMoreData}
                className={cn(
                  buttonVariants({
                    variant: 'default',
                    size: 'default',
                  })
                )}
              >
                <Text className="text-white text-xl font-bold">Load more</Text>
              </TouchableOpacity>
            )
          )
        }
      />
    </View>
  );
};

const Unauthenticated = () => {
  return (
    <View className="bg-blue-600 min-h-screen flex items-center mt-12">
      <Text className="text-white text-4xl mb-8">You are not logged in.</Text>
      <LinkButton href={'/(auth)'}>Return to login screen</LinkButton>
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
