import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import Button2 from "react-bootstrap/Button";
import { ShoppingCart } from "@material-ui/icons";
import { Badge } from "react-bootstrap";
import { GenericButton } from "../../components/generic-button";
import { useSearchParams } from "react-router-dom";
import {
  addReview,
  deleteReview,
  getSingleProduct,
  setFavourite,
} from "../../utils/rest-services";
import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { KeyValueData } from "../../components/horizontal-card";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./style.scss";
import { QuantityButton } from "../../components/qunatity-button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ActionDropDownPopUp, CellValue, GenericTable } from "../../components";
import { GetBadge } from "../../utils/helpers/users";
import { ALL_TEXT, ENUMS } from "../../common";
import { GoKebabVertical } from "react-icons/go";
import {
  getSingleEventAction,
  completeEventAction,
  cancelEventAction,
  joinEventAction,
  acceptEventAction,
  cancelRequestEventAction,
} from "../../utils/store/slices/userAuth/actions";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const {
  USERS: { ROLE, STATUS },
} = ENUMS;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  imageWrapper: {
    flex: "0 0 auto",
    marginRight: theme.spacing(2),
  },
  image: {
    height: "400px",
    objectFit: "contain",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "1 1 auto",
  },
  title: {
    fontWeight: "bold",
    color: "red",
  },
  description: {
    marginTop: theme.spacing(2),
    color: "red",
  },
  rating: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(2),
    color: "red",
    borderColor: "red",
  },
  badge: {
    backgroundColor: "red",
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  accordion: {
    width: "100%",
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
    },
  },
  textarea: {
    width: "100%",
    borderRadius: "4px",
    padding: "8px",
    border: "1px solid #ccc",
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  submitButton: {
    marginTop: "8px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  editButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));
setInterval(() => {}, 1000);
function calTime(dateTimeString) {
  // Splitting date and time
  const [dateString, timeString] = dateTimeString.split("T");
  // const date = new Date(dateString);
  const now = new Date();
  const currentTime = now
    .toLocaleTimeString("en-US", { hour12: false })
    .slice(0, 5);
  return timeString.slice(0, 5);
}
// function calTime (dateTimeString) {

//   // Splitting date and time
//   const [dateString, timeString] = dateTimeString.split('T');
//   // const date = new Date(dateString);
//   const time = timeString.slice(0, 5);
//   console.log(time);

// Getting current time

// Comparing time with current time
// if (time === currentTime) {
//   console.log('The time matches the current time.');
// } else if (time > currentTime) {
//   console.log('The time is in the future.');
// } else {
//   console.log('The time has already passed.');
// }
// }

const ProductDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [orderDetails, setOrderDetails] = useState({});
  const [favorite, setFavorite] = React.useState(false);
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState("");
  const [reviews, setReviews] = useState([]);
  const [runningTime, setRunningTime] = useState(null);

  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const [usersList, setUsersList] = useState([]);
  const [pendingUsers, setPendingList] = useState([]);

  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };
  const getSingleEvent = (id) => {
    dispatch(getSingleEventAction(id))
      .then(unwrapResult)
      .then((result) => {
        console.log("gy", result);
        setOrderDetails(result);
        setUsersList(result?.joiners);
        setPendingList(result?.pendingRequests);
      });
  };

  useEffect(() => {
    getSingleEvent(id);
  }, []);
  const handleFavorite = async () => {
    setFavorite(!favorite);
    setOrderDetails({ ...orderDetails, isFavourite: !favorite });
    const response = await setFavourite(orderDetails._id);
  };

  useEffect(() => {
    // fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRunningTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [orderDetails]);
  const updateRunningTime = () => {
    if (orderDetails) {
      const { eventTime } = orderDetails;
      const eventDate = new Date(eventTime);
      const currentTime = new Date();
      const timeDiff = eventDate.getTime() - currentTime.getTime();

      if (timeDiff <= 0) {
        // Event time has already passed
        setRunningTime("00:00");
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setRunningTime(formattedTime);
    }
  };

  const tableHeading = [
    {
      title: "Name",
      fieldName: "name",
      dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
    },
    {
      title: "Email",
      fieldName: "email",
      dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
    },
    {
      title: "Gender",
      fieldName: "gender",
      dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
    },
    {
      title: "Action",
      fieldName: "action",
      dataformat: (cell, row) => {
        console.log(row, "row here", cell);
        return (
          <div
            onClick={() => {
              console.log("i amre ui");
              dispatch(
                acceptEventAction({ userId: row?._id, id: orderDetails?._id })
              )
                .then(unwrapResult)
                .then((result) => {
                  toast.success("invitation accepted", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                })
                .catch((error) =>
                  toast.error(error?.response?.data?.error, {
                    position: toast.POSITION.TOP_RIGHT,
                  })
                );
            }}
            style={{ cursor: "pointer" }}
          >
            {GetBadge(
              row.isBlackListed == true
                ? STATUS.BLACKLISTED.LABEL
                : STATUS.ACTIVE.LABEL
            )}
          </div>
        );
      },
    },
  ];

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   !rating && setRating(0);
  // }, [rating]);

  const reviews2 = [
    { id: 1, comment: "Great product!", rating: 4 },
    { id: 2, comment: "Could be better", rating: 3 },
    { id: 3, comment: "Not worth the money", rating: 2 },
  ];
  const fetchData = async () => {
    try {
      // dispatch(getSingleEvent()).then(unwrapResult).then((result) => {
      //   setOrderDetails(result)
      //   console.log(result);
      //   result?.forEach((singleReview) => {
      //   if (
      //     singleReview.createdBy.name ===
      //       JSON.parse(localStorage.getItem("userProfile")).name &&
      //     singleReview.createdBy.email ===
      //       JSON.parse(localStorage.getItem("userProfile")).email
      //   ) {
      //     setReviewSubmitted(true);
      //   }
      // });
      //  }).catch((error)=>{})
    } catch (error) {
      console.log(error);
    }
  };
  function handleComplete(id) {
    dispatch(completeEventAction(id))
      .then(unwrapResult)
      .then((result) => {
        toast.success("Event is marked as completed", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  function handleCancel(id) {
    dispatch(cancelEventAction(id))
      .then(unwrapResult)
      .then((result) => {
        toast.success("Event is marked as Cancelled", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }
  //  const dispatch=useDispatch()
  function handleCancell(payload) {
    dispatch(cancelRequestEventAction(payload))
      .then(unwrapResult)
      .then(() => {
        toast.success("Invitation Rejected", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  function handleAccept(payload) {
    dispatch(acceptEventAction(payload))
      .then(unwrapResult)
      .then(() => {
        toast.success("Invitation accepted", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }
  const handleSubmit = async () => {
    try {
      const response = await addReview(id, { rating: rating, comment: value });
      setExpanded(false);
      setOrderDetails(response);
      setReviewSubmitted(true);
      // Do something with the response, like updating the state
    } catch (error) {
      console.log("Error submitting review:", error);
      // Handle the error, like displaying an error message
    }
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await deleteReview(id, orderDetails?._id);
      setOrderDetails(response);
      setRating(0);
      setValue("");
      setReviewSubmitted(false);
      setExpanded(false);
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };
  function handleJoin(id) {
    dispatch(joinEventAction(id))
      .then((result) => {
        if (result) {
          toast.success("joined the event!");
          setUsersList(result?.joiners);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }
  // const paylaod = {
  //   id: orderDetails?._id,
  //   userId:
  // }
  const accordionHeader =
    reviewSubmitted === true
      ? `Your Review (Rating: ${rating})`
      : "Add a Review";
  return Object.keys(orderDetails).length ? (
    <div className="d-flex align-items-start">
      <Grid container>
        <Grid item sm={12} md={5}>
          <div className="image-container-details">
            <img
              src={orderDetails?.image}
              alt="product"
              className="mr-3"
              style={{ height: "500px !important", width: "500px !important" }}
            />
          </div>
        </Grid>
        <Grid item sm={12} md={7}>
          <div className="d-flex flex-column justify-content-between m-3">
            <div>
              <Box className="d-flex justify-content-between">
                <Typography variant="h5" className="font-weight-bold">
                  {orderDetails?.title}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {orderDetails?.category}
                </Stack>
              </Box>

              <Box className="d-flex justify-content-between align-items-center mb-1 mt-1">
                {orderDetails?.isOwner !== true && (
                  <>
                    <div>
                      <Button2
                        variant="primary"
                        onClick={() => handleJoin(orderDetails?._id)}
                      >
                        Join Event
                      </Button2>
                    </div>
                  </>
                )}

                <Stack direction="row" spacing={1}>
                  {orderDetails?.category}
                </Stack>
                <Box
                  className="d-flex  align-items-center mb-1 mt-1"
                  style={{ justifyContent: "space-around" }}
                >
                  {orderDetails?.isOwner && (
                    <>
                      <div>
                        {orderDetails?.isCompleted ? (
                          <Button2 variant="success" disabled>
                            Completed
                          </Button2>
                        ) : (
                          <Button2
                            variant="success"
                            onClick={() => handleComplete(orderDetails?._id)}
                          >
                            Complete Event
                          </Button2>
                        )}
                      </div>
                      <div>
                        {orderDetails?.isCancelled ? (
                          <Button2 variant="danger" disabled>
                            Cancelled
                          </Button2>
                        ) : (
                          <Button2
                            variant="danger"
                            onClick={() => handleCancel(orderDetails?._id)}
                          >
                            Cancel Event
                          </Button2>
                        )}
                      </div>
                    </>
                  )}
                </Box>
                <Typography variant="body1" className="mt-2">
                  {orderDetails?.description}
                </Typography>
              </Box>
              <Box className="m-3">
                <KeyValueData
                  keyy={"Created By"}
                  value={orderDetails?.createdBy?.name}
                />
              </Box>
              <Box className="m-3">
                <KeyValueData
                  keyy={"Max Participants"}
                  value={orderDetails?.totalLimit}
                />
              </Box>
              <Box className="m-3">
                <KeyValueData
                  keyy={"Duration"}
                  value={orderDetails?.duration}
                />
              </Box>
              <Box className="m-3">
                <KeyValueData
                  keyy={"Event Date"}
                  value={orderDetails?.eventTime?.slice(0, 10)}
                />
              </Box>
              {/* <Box className="m-3">
              <KeyValueData keyy={"Time "} value={runningTime} />
            </Box> */}
            </div>
          </div>
          <Grid item sm={12}>
            <Box className="m-3 font-weight-bold">
              <Typography variant="h6" className="font-weight-bold">
                All Participants
              </Typography>
              <div className="table-userlist-container">
                <GenericTable headings={tableHeading?.filter((heading)=>heading?.title!=='Action')} data={usersList} />
              </div>
            </Box>
          </Grid>
          {orderDetails?.isOwner && pendingUsers && (
            <Grid item sm={12}>
              <Box className="m-3 font-weight-bold">
                <Typography variant="h6" className="font-weight-bold">
                  Pending Requests
                </Typography>
                <div className="table-userlist-container">
                  <GenericTable headings={tableHeading} data={pendingUsers} />
                </div>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
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
export default ProductDetail;
