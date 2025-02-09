import { AppDispatch, RootState } from "@/redux/store";
import api from "@/utils/axiosInstance";

export const addCustomer = (customerData: { name: string; email: string; file: File }) => async (dispatch: AppDispatch, getState: () => RootState) => {
  
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
  } catch (error: any) {
    console.error("Error adding customer:", error.response?.data?.message || error.message);
  }
};