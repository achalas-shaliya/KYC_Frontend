import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, CustomerState } from "@/types/customer";

const initialState: CustomerState = {
  customers: [],
  loading: false,
  offset: 0,
  hasMore: true,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      // Ensure there are no duplicates in the list
      const uniqueCustomers = action.payload.filter(
        (newCustomer) => !state.customers.some((existing) => existing.id === newCustomer.id)
      );

      state.customers = [...state.customers, ...uniqueCustomers];
      state.offset += uniqueCustomers.length;
      state.hasMore = uniqueCustomers.length > 0;
      state.loading = false;
    },
    appendCustomers: (state, action) => {
      // Prevent duplicates when appending new customers
      const newCustomers = action.payload.filter(
        (newCustomer: Customer) => !state.customers.some((existing) => existing.id === newCustomer.id)
      );
      state.customers = [...state.customers, ...newCustomers];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateCustomerStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const { id, status } = action.payload;
      const customer = state.customers.find((c) => c.id === id);
      console.log("CUSTOMER: ", customer);

      if (customer) {
        customer.status = status;
      }
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setCustomers, appendCustomers, setLoading, updateCustomerStatus, setHasMore } = customerSlice.actions;
export default customerSlice.reducer;
