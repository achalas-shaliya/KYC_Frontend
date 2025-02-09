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
    } catch (error: any) {
        console.error("Error fetching summary:", error.response?.data?.message || error.message);
    }
};
