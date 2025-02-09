import { User } from "./user";

export interface Customer {
  id: number;
  userId: number;
  status: string;
  document: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  offset: number;
  hasMore: boolean;
}
