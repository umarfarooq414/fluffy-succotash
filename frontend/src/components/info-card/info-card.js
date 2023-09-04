import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { Box, Button } from "@mui/material";
import { GenericButton } from "../generic-button";
import Button2 from "react-bootstrap/Button";
import "./style.scss";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import { KeyValueData } from "../horizontal-card";
import { setFavourite } from "../../utils/rest-services";
import { path } from "../../common/routesNames";
import { QuantityButton } from "../qunatity-button";
import { getCartItems, setAddItemToCart } from "../../utils/localstorage";
import {
  getAllAction,
  updateEventAction,
  deleteEventAction,
} from "../../utils/store/slices/userAuth/actions";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AddProduct } from "../add-new-product";
export const InfoCard = ({
  event,
  del,
  update,
  setValue,
  setMyFavorites,
  number,
  myFavorites,
  setShowNothing,
}) => {
  console.log(event, "event");
  // const [isFavorite, setIsFavorite] = useState(event?.isFavourite);
  const [isAvailable, setIsAvailable] = useState(true);
  const [updateEvent, setUpdateEvent] = useState(false);
  const navigate = useNavigate();
  const [favourite, setIsFavourite] = useState(event?.isFavourite || false);
  const dispatch = useDispatch();
  console.log(myFavorites, "myFavorites");
  const handleFavoriteClick = async () => {
    const response = await setFavourite(event._id);
    setIsFavourite(!favourite);
    // console.log(myFavorites.splice(number, 1), number);
    setMyFavorites &&
      setMyFavorites((favorites) =>
        favorites.filter((i) => i._id != event._id)
      );
    if (myFavorites && !myFavorites.filter((i) => i._id != event._id).length) {
      setShowNothing(true);
    }
  };

  const [rating, setRating] = useState(4);
  const [quantity, setquantity] = useState(0);

  function handleDelete(id) {
    dispatch(deleteEventAction(id))
      .then(unwrapResult)
      .then((result) => {
        toast.success("Event Deleted Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) =>
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  }

  return event && Object.keys(event).length ? (
    <div className="card col-md-4 col-sm-12" style={{ height: "100%" }}>
      <div
        className="card-img-container cardImage"
        onClick={() => navigate(`${path.productDetails}?id=${event._id}`)}
      >
        <img src={event.image} alt="card" />
      </div>

      <div className="card-content allCardContent">
        <div className="top d-flex justify-content-between infoIcons">
          <Badge bg="danger" className="badgeCustom">
            {event?.oneTime === "true" ? "One Time" : "Recurring"}
          </Badge>{" "}
          <div className="favorite-icon" onClick={handleFavoriteClick}>
            <Box style={{ color: "red", fontSize: "30px" }}>
              {favourite || number || setMyFavorites ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </Box>
          </div>
        </div>
        <Box style={{ cursor: "pointer" }}>
          <div className="titleAvailable mt-2 mb-2">
            <h2 className="card-title">{event?.Title}</h2>
          </div>
          <div>
            <KeyValueData keyy={"Title"} value={event.title} />
          </div>
          <Box className="d-flex justify-content-between">
            <div className="card-description">{event?.description}</div>
          </Box>
          <Box className="d-flex justify-content-start mt-1 mb-3">
            <KeyValueData keyy={"Category"} value={event.category} />
          </Box>
          <Box className="d-flex justify-content-between">
            {del && (
              <Box
                className="d-flex justify-content-between"
                style={{ marginRight: "5px" }}
              >
                <Button2
                  className="delete-button d-flex justify-content-between align-items-center"
                  onClick={() => handleDelete(event?._id)}
                  variant="danger"
                  style={{ height: "30px" }}
                >
                  Delete Event
                </Button2>{" "}
              </Box>
            )}
            {update && (
              <Box
                className="d-flex justify-content-between align-items-center"
                onClick={() => setUpdateEvent(true)}
              >
                <Button2 style={{ height: "30px" }} variant="secondary">
                  Update Event
                </Button2>
              </Box>
            )}
          </Box>

          {updateEvent && (
            <AddProduct
              show={updateEvent}
              buttonText={"Update Event"}
              handleClose={() => setUpdateEvent(false)}
              event={event}
              update={true}
            />
          )}
          <div className="card-badge badges justify-content-between d-flex"></div>
        </Box>
      </div>
    </div>
  ) : null;
};
