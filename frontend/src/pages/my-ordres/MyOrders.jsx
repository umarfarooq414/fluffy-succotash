import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUserOrders } from "../../utils/rest-services";
import { Box, CircularProgress } from "@mui/material";
import { SingleOrder } from "../../components";
// import { getSingleOrder } from "../../utils/rest-services";

const Myorders = () => {
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const allGamesData = await getUserOrders();
      setMyOrders(allGamesData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <h1>My orders</h1>
    </Box>
  );
};

export default Myorders;
