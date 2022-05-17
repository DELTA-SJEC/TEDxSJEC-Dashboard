/* eslint-disable */
import { useState, useEffect } from "react";
// material
import {
  Box,
  Grid,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
// components
import Page from "../components/Page";

import {
  AppNewUsers,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [isLoading, setLoading] = useState(true);
  const [users, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/payment/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        const userss = [...Array(response.data.paymentData.length)].map(
          (_, index) => ({
            id: response.data.paymentData[index]._id,
            name: response.data.paymentData[index].name,
            email: response.data.paymentData[index].email,
            phone: response.data.paymentData[index].phone,
            paymentId: response.data.paymentData[index].razorpay_payment_id,
            imgAdd:response.data.paymentData[index].image,
            items: response.data.paymentData[index].response.items,
          })
        );
       
        setUser(userss);

        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return (
    <Page title="Dashboard">
     
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWeeklySales users={users} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppNewUsers total={users.length} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits users={users} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits users={users} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
