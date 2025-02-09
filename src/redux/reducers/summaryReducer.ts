import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SummaryState } from "@/types/summary";

const initialState: SummaryState = {
  totalCustomers: 0,
  approvedCount: 0,
  pendingCount: 0,
  rejectedCount: 0,
  loading: false,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setSummary: (state, action: PayloadAction<SummaryState>) => {
      return { ...state, ...action.payload, loading: false };
    },
    setSummaryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSummary, setSummaryLoading } = summarySlice.actions;
export default summarySlice.reducer;
