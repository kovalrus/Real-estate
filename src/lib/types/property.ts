export type PropertyHistoryItem = {
  date: string;
  price: number;
  event: string;
};

export type PropertyResponse = {
  success: boolean;
  priceHistory: PropertyHistoryItem[];
  message?: string;
}; 