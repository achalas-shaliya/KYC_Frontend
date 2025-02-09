"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";
import AdminTable from "./AdminTable"; // Import the reusable table component
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/actions/authActions";

const AdminDashboard = () => {
    const router = useRouter();
    const [loading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();


    const handleLogout = () => {
        dispatch(logout());
        router.push("/login");
    };

    return loading ? (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                <Typography variant="h4">Admin Dashboard</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <AdminTable />
        </Container>
    ) : null;
};

export default AdminDashboard;
