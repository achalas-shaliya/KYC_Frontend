"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/actions/authActions";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    dispatch(login(email, password));
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ p: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default AdminLogin;