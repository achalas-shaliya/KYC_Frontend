"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Card, CircularProgress, Snackbar, TextField, Typography, Alert } from "@mui/material";

const CustomerForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
      const fileData = new FormData();
      fileData.append("file", file);
      const uploadResponse = await fetch("/api/upload", { method: "POST", body: fileData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error("File upload failed");

      const documentUrl = uploadResult.url;

      // Submit customer details
      const customerData = { name, email, document: documentUrl };
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) throw new Error("Customer submission failed");

      setSnackbar({ open: true, message: "Customer Registered Successfully!", severity: "success" });
      setTimeout(() => router.push("/admin"), 1500); // Redirect after 1.5 sec
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
