import React from "react";
import { useEffect } from "react";
import { getFavourite } from "../../utils/rest-services";
import { useState } from "react";
import { InfoCard } from "../../components";
import { CircularProgress, Grid } from "@mui/material";
import { HiOutlineUsers } from "react-icons/hi";
import { colors } from "../../common";
import { useDispatch } from "react-redux";
import { myJoinEventsAction } from "../../utils/store/slices/userAuth/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
let cardsArr = [
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
  {
    icon: <HiOutlineUsers size={30} color={colors.primary} />,
    title: "Customers",
    description: "Hi there",
    imageSrc: "https://files.owlapplicationbuilder.com/img/no-img.png",
    isFavorite: true,
  },
];
const MyJoined = () => {
  const [myFavorites, setMyFavorites] = useState([]);
  const dispatch = useDispatch();
  const [arr, setArr] = useState();

  useEffect(() => {
    // fetchData();
    dispatch(myJoinEventsAction())
      .then(unwrapResult)
      .then((result) => {
        setArr(result);
      })
      .catch((error) =>
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  }, []);
  const fetchData = async () => {
    try {
      const allFavouritesData = await getFavourite();
      setMyFavorites(allFavouritesData.data.allGames);
    } catch (error) {
      console.log(error);
    }
  };
  return arr?.length !== 0 ? (
    <>
      <div className="title-container-userlist">
        <span>My Joins</span>
      </div>
      <Grid container spacing={2}>
        {arr?.map((singleCard, index) => (
          <Grid key={index} item xs={12} sm={4} md={4} lg={3} xl={3}>
            <InfoCard event={singleCard} />
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <div
      className={
        "d-flex justify-content-center align-items-center m-5 muiLoader"
      }
      style={{ textAlign: "center", color: "red" }}
    >
      <CircularProgress />
    </div>
  );
};

export default MyJoined;
