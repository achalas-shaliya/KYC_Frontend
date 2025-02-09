import api from "@/utils/axiosInstance";
import { setSummary, setSummaryLoading } from "../reducers/summaryReducer";
import { AppDispatch, RootState } from "../store";

export const fetchSummary = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { summary } = getState();

    if (summary.totalCustomers > 0) return;
    dispatch(setSummaryLoading(true));

    try {
        const res = await api.get("/summary");
        dispatch(setSummary(res.data));
    } catch (error) {
        const err = error as any;
        console.error("Error updating customer status:", err.response?.data?.message || err.message);
    }
};
