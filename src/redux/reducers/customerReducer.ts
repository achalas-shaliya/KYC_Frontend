import { createSlice } from "@reduxjs/toolkit";
import { CustomerState } from "@/types/customer";

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
  }
});

export const { } = customerSlice.actions;
export default customerSlice.reducer;
