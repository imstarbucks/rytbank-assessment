import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { transactionHistoryData } from '@/lib/const';
import { TextDetails } from '@/components/Details/TextDetails';
import { LinkButton } from '@/components/ui/LinkButton';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const transactionDetails = transactionHistoryData.find((t) => t.id === id);

  if (!transactionDetails)
    return (
      <View>
        <Text className="text-whtie text-4xl">
          Transaction details not found...
        </Text>
        <LinkButton href={'/(transactions)/transactions'} className="mt-12">
          Return to transaction
        </LinkButton>
      </View>
    );

  return (
    <View className="space-y-6 text-white bg-blue-600 min-h-screen p-4">
      <TextDetails
        label="Amount"
        content={`MYR ${transactionDetails.amount}`}
        align={'center'}
        size={'lg'}
        className="my-12"
      />
      <View>
        <TextDetails
          label="Account Name"
          content={transactionDetails.accountName}
        />
        <TextDetails label="Transaction ID" content={transactionDetails.id} />
        <TextDetails
          label="Description"
          content={transactionDetails.description ?? '-'}
        />
        <TextDetails
          label="Transaction Type"
          content={transactionDetails.type}
        />
        <TextDetails label="Date" content={transactionDetails.date} />
      </View>
      <LinkButton href={'/(transactions)/transactions'} className="mt-12">
        Return to transaction
      </LinkButton>
    </View>
  );
};

export default DetailsScreen;
