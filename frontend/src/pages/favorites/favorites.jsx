import React from "react";
import { useEffect } from "react";
import { getFavourite } from "../../utils/rest-services";
import { useState } from "react";
import { InfoCard } from "../../components";
import { CircularProgress, Grid } from "@mui/material";
import { HiOutlineUsers } from "react-icons/hi";
import { colors } from "../../common";

const Favorites = () => {
  const [myFavorites, setMyFavorites] = useState([]);
  const [showNothing, setShowNothing] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const allFavouritesData = await getFavourite();
      console.log(allFavouritesData, "allFavouritesData");
      setMyFavorites(allFavouritesData.data.allGames);
      if (allFavouritesData?.data?.allGames?.length) {
        setShowNothing(false);
      } else {
        setShowNothing(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (showNothing) {
    return (
      <>
        <div className="title-container-userlist mb-2">
          <span>My Favorites</span>
        </div>
        <h1>No Favorites Here</h1>
      </>
    );
  }
  return (
    <>
      <div className="title-container-userlist mb-2">
        <span>My Favorites</span>
      </div>
      {myFavorites?.length !== 0 ? (
        <Grid container spacing={2}>
          {myFavorites.map((singleCard, index) => (
            <Grid key={index} item xs={12} sm={4} md={4} lg={3} xl={3}>
              <InfoCard
                event={singleCard}
                setMyFavorites={setMyFavorites}
                number={index}
                myFavorites={myFavorites}
                setShowNothing={setShowNothing}
              />
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

export default Favorites;
