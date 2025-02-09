export interface Customer {
    id: number;
    name: string;
    email: string;
    status: string;
    document: string;
  }
  
  export interface CustomerState {
    customers: Customer[];
    loading: boolean;
    offset: number;
    hasMore: boolean;
  }
  