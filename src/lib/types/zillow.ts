export type PriceHistoryItem = {
  date: string;
  price: number;
  event: string;
};

export type ZillowResponse = {
  success: boolean;
  data: {
    priceHistory: PriceHistoryItem[];
    // ... other response fields
  };
  message?: string;
};

export type AddressSearchProps = {
  address: string;
}; 