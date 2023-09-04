import React, { useEffect, useState } from "react";
import { SingleOrder } from "../../components";
import { getAllOrders } from "../../utils/rest-services";
import { Box, CircularProgress } from "@mui/material";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h1>Orders</h1>
    </>
  );
};

export default Orders;
