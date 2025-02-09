"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Card, CircularProgress, Snackbar, TextField, Typography, Alert } from "@mui/material";
import api from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { register } from "@/redux/actions/authActions";

const CustomerForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // State for the password
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      setSnackbar({ open: true, message: "Please upload an ID document.", severity: "error" });
      setLoading(false);
      return;
    }

    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!uploadRes.data.url) throw new Error("File upload failed");

      const documentUrl = uploadRes.data.url;

      dispatch(register(email, password, "customer", name));
      setSnackbar({ open: true, message: "Customer Registered Successfully!", severity: "success" });
      router.push("/login") 
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Customer Registration</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Full Name" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField fullWidth label="Email" variant="outlined" margin="normal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth label="Password" variant="outlined" margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Password input */}
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </form>
      </Card>

      {/* Snackbar Notification */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity as any} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerForm;
