/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import "./style.scss";
import {
  AddNewUser,
  CustomizedSearch,
  GenericButton,
  GenericTable,
  InfoCard,
} from "../../components";
import { colors } from "../../common";
import { HiOutlineUsers } from "react-icons/hi";
import { AddProduct } from "../../components/add-new-product";
import { getMyEventsAction } from "../../utils/store/slices/userAuth/actions";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [arr, setArr] = useState();
  const fetchMyEvents = () => {
    dispatch(getMyEventsAction())
      .then(unwrapResult)
      .then((result) => {
        console.log("callled");
        setArr(result);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetchMyEvents();
  }, []);
  return (
    <>
      <div className="title-container-userlist">
        <span>My Events</span>
      </div>
      {arr?.length ? (
        <Grid container spacing={2} className="mt-1">
          {arr?.map((singleCard, index) => (
            <Grid key={index} item xs={12} sm={4} md={4} lg={3} xl={3}>
              <InfoCard event={singleCard} del={true} update={true} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          className={
            "d-flex justify-content-center align-items-center m-5 muiLoader"
          }
          style={{ textAlign: "center", color: "red" }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default AllProducts;
