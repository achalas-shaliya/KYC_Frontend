import api from "@/utils/axiosInstance";
import { appendCustomers, setCustomers, setHasMore, updateCustomerStatus } from "@/redux/reducers/customerReducer";
import { AppDispatch, RootState } from "@/redux/store";

export const addCustomer = (customerData: { name: string; email: string; file: File }) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { token } = getState().auth;
  if (!token) return;

  try {
    // Step 1: Upload the file first
    const formData = new FormData();
    formData.append("file", customerData.file);

    const uploadRes = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!uploadRes.data.url) throw new Error("File upload failed");

    // Step 2: Create customer with uploaded file URL
    const customerPayload = {
      name: customerData.name,
      email: customerData.email,
      document: uploadRes.data.url, // Attach file URL from S3
    };

    await api.post("/customer", customerPayload);

    dispatch(fetchCustomers()); // Refresh customer list after adding
  } catch (error: any) {
    console.error("Error adding customer:", error.response?.data?.message || error.message);
  }
};

export const fetchCustomers = (offset = 0, limit = 10) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const res = await api.get(`/customers?offset=${offset}&limit=${limit}`);

    if (offset === 0) {
      // First fetch: Replace the state
      dispatch(setCustomers(res.data.data));
    } else {
      // Subsequent fetches: Append data
      dispatch(appendCustomers(res.data.data));
    }

    // Update hasMore state
    dispatch(setHasMore(res.data.data.length === limit));
  } catch (error: any) {
    console.error("Error fetching customers:", error.response?.data?.message || error.message);
  }
};


export const updateStatus = (id: number, status: string) => async (dispatch: AppDispatch) => {
  try {
    await api.patch(`/customers/${id}`, { status });
    dispatch(updateCustomerStatus({ id, status }));
    dispatch(fetchCustomers()); // Refresh list after update
  } catch (error: any) {
    console.error("Error updating customer status:", error.response?.data?.message || error.message);
  }
};