"use client"; //  Ensures it's only rendered on the client

import { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Chip, Grid, Card, CardContent, IconButton, Box, Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCustomers, updateStatus } from "@/redux/actions/customerActions";
import { fetchSummary } from "@/redux/actions/summaryActions";
import { Customer } from "@/types/customer";

export default function AdminTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { customers, hasMore } = useSelector((state: RootState) => state.customers);
    const summary = useSelector((state: RootState) => state.summary);

    const [offset, setOffset] = useState(0);
    const loader = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const [hydrated, setHydrated] = useState(false);

    //  Prevent SSR from rendering until fully hydrated
    useEffect(() => {
        setHydrated(true);
    }, []);

    //  Fetch data only on the client-side
    useEffect(() => {
        if (hydrated) {
            dispatch(fetchSummary());
            dispatch(fetchCustomers(0));
        }
    }, [dispatch, hydrated]);


    //  Lazy Loading Observer (Only runs when `hasMore` is true)
    useEffect(() => {
        if (!loader.current || !hasMore) return;
        // console.log(offset);
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setOffset((prevOffset) => {
                    const newOffset = prevOffset + 10;
                    dispatch(fetchCustomers(newOffset));
                    return newOffset;
                });
            }
        });

        observer.current.observe(loader.current);
        return () => observer.current?.disconnect();
    }, [dispatch, hasMore]);

    // if (!hydrated) return null;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2 }}>
            <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
                Customer Approvals
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#2196F3", color: "#fff" }}>
                        <CardContent>
                            <Typography variant="h6">Total Customers</Typography>
                            <Typography variant="h4">{summary.totalCustomers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#4CAF50", color: "#fff" }}>
                        <CardContent>
                            <Typography variant="h6">Approved</Typography>
                            <Typography variant="h4">{summary.approvedCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#FFC107", color: "#fff" }}>
                        <CardContent>
                            <Typography variant="h6">Pending</Typography>
                            <Typography variant="h4">{summary.pendingCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#F44336", color: "#fff" }}>
                        <CardContent>
                            <Typography variant="h6">Rejected</Typography>
                            <Typography variant="h4">{summary.rejectedCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Customer Table */}
            <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#f4f4f4" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Document</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer: Customer) => (
                            <TableRow key={customer.id} hover>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.user.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={customer.status.toUpperCase()}
                                        color={
                                            customer.status === "approved"
                                                ? "success"
                                                : customer.status === "rejected"
                                                    ? "error"
                                                    : "warning"
                                        }
                                        sx={{ fontWeight: "bold", width: 100, textAlign: "center", justifyContent: "center" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {customer.document && (
                                        <IconButton href={customer.document} target="_blank" color="info">
                                            <Visibility />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {/* Action Buttons */}
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        disabled={customer.status === "approved"}
                                        onClick={() => dispatch(updateStatus(customer.id, "approved"))}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        disabled={customer.status === "rejected"}
                                        onClick={() => dispatch(updateStatus(customer.id, "rejected"))}
                                    >
                                        Reject
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Infinite Scroll Loader */}
            <div ref={loader} style={{ height: "50px", textAlign: "center", marginTop: "10px" }}>
                {hasMore && <CircularProgress />}
            </div>
        </Box>
    );
}
