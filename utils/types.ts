export type TransactionHistoryType = {
  id: string;
  amount: number;
  date: string;
  description?: string;
  type: 'credit' | 'debit';
  accountName: string;
};
