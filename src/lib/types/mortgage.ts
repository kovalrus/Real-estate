export type MortgageType = 'Purchase' | 'Refinance';

export type LoanTerm = 
  | '30-Year Fixed' 
  | '20-Year Fixed'
  | '15-Year Fixed'
  | '10-Year Fixed'
  | '5/1 ARM'
  | '10/1 ARM'
  | '30-Year FHA'
  | '30-Year VA'
  | '30-Year Jumbo';

export type MortgageRate = {
  productName: LoanTerm;
  interestRate: number;
  apr: number;
};

export type MortgageFilters = {
  mortgageType: MortgageType;
  purchasePrice: number;
  downPayment: number;
  creditScore: number;
  propertyType: string;
  propertyUse: string;
  zipCode: string;
}; 