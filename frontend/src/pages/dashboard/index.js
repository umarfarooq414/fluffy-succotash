import React, { useEffect, useState } from "react";
import "./style.scss";
import { ALL_TEXT, colors } from "../../common";
import { Box, CircularProgress, Grid } from "@mui/material";
import { HiOutlineUsers } from "react-icons/hi";
import { IoMdWarning } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { GiTimeTrap } from "react-icons/gi";
import { getAllStats } from "../../utils/rest-services";
import { CustomizedSearch, GenericButton, InfoCard } from "../../components";
import { unwrapResult } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import {
  getUserFilterAction,
  getEventFilterAction,
  getAllEventsAction,
} from "../../utils/store/slices/userAuth/actions";
import { AddProduct } from "../../components/add-new-product";
function Dashboard() {
  const filters = ["Web", "App", "AI"];
  const [usersList, setUsersList] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [arr, setArr] = useState();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    Web: "",
    AI: "",
    App: "",
  });
  useEffect(() => {
    getAllDataHandler();
    fetchEvents();
  }, []);
  const fetchEvents = () => {
    dispatch(getAllEventsAction())
      .then(unwrapResult)
      .then((result) => {
        console.log("callled");
        setArr(result);
      })
      .catch((error) => {});
  };
  const [allStats, setallStats] = useState({});
  const getAllDataHandler = async () => {
    // let response = await getAllStats();
    // setallStats(response);
  };
  const [addNewUser, setAddNewUser] = useState(false);

  const userFilterHandler = (title, category, tags) => {
    console.log("heree", title);
    const payload = {
      modelName: "event",
      title,
      // email,
      // gender
    };
    console.log("resultt", payload);
    dispatch(getEventFilterAction(payload))
      .then(unwrapResult)
      .then((result) => {
        console.log("resultt", result);
        setArr(result);
      })
      .catch((error) => {
        // Handle error, if any
      });
  };

  return (
    <div className="dashboard-main-container">
      <div className="title-container-dashboard d-flex">
        <span>{ALL_TEXT.DASHBOARD}</span>
        <GenericButton
          customStyle={"custom-register-btn"}
          buttonText={`+${"Add New Event"}`}
          end={true}
          onPress={() => {
            setAddNewUser(true);
          }}
        />
      </div>
      <div className="user-search-bar">
        <CustomizedSearch
          title={"Search By Event"}
          firstLabel={"Title"}
          // secondInput
          firstPlaceholder={"Enter Title"}
          // secondLabel={"Category"}
          // secondPlaceholder={"Enter Category"}
          // firstDropdown
          // firstDropdownLabel={"tags"}
          // firstDropdownList={["one", "two"]}
          onClearFilterHandler={() => {
            setArr(arr);
          }}
          onSearchBtnPress={(title) => {
            userFilterHandler(title);
          }}
        />
        {/* Filter :
        <Box className="d-flex ">
          <GenericButton
            customStyle={"custom-register-btn"}
            buttonText={`${"Web"}`}
            end={true}
            onPress={() => {
              setFilter(true);
            }}
          />
          <GenericButton
            customStyle={"custom-register-btn"}
            buttonText={`${"Artificial Intelligence"}`}
            end={true}
            onPress={() => {
              setAddNewUser(true);
            }}
          />
          <GenericButton
            customStyle={"custom-register-btn"}
            buttonText={`${"Mobile App"}`}
            end={true}
            onPress={() => {
              setAddNewUser(true);
            }}
          />
        </Box>*/}
      </div> 
      {addNewUser && (
        <AddProduct
          show={addNewUser}
          buttonText={"Create Event"}
          handleClose={() => setAddNewUser(false)}
        />
      )}
      <div className="dashboard-card-container">
        {arr?.length ? (
          <Grid container spacing={2}>
            {arr?.map((singleCard, index) => (
              <Grid key={index} item xs={12} sm={4} md={4} lg={3} xl={3}>
                <InfoCard event={singleCard} />
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
      </div>
    </div>
  );
}

export default Dashboard;
