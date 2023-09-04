import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";
import { GenericButton } from "../generic-button";
import { Grid } from "@mui/material";
import { ALL_TEXT } from "../../common";
import { InputField } from "../input-field";
import { Formik } from "formik";
import { userDetailSchema } from "../../common/schemas";
import Dropdown from "react-dropdown";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { createNewEvent, createNewGame } from "../../utils/rest-services";
import Select from "react-select";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateEventAction } from "../../utils/store/slices/userAuth/actions";
import { unwrapResult } from "@reduxjs/toolkit";
export const AddProduct = ({
  show,
  handleClose,
  buttonText,
  update,
  event,
}) => {
  console.log(event, "event", update);
  const [imageObj, setimageObj] = useState(null);
  // const [userDetailsInfo, setUserDetailsInfo] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  //   state: '',
  //   city: '',
  //   zip: '',
  //   password: '',
  //   confirmPassword: '',
  // });
  const typOptions = [
    { label: "One Time", value: "oneTime" },
    { label: "Recurring", value: "recurring" },
  ];
  const [type, setType] = useState(
    event?.oneTime
      ? typOptions.filter(
          (singleOption) => singleOption.value === event?.oneTime
        )
      : {}
  );
  const options = [
    { value: "Web", label: "Web Application" },
    { value: "App", label: "Mobile App" },
    { value: "AI", label: "Artificial Intelligence" },
  ];
  const [category, setCategory] = useState(
    event?.category
      ? options.filter((singleOption) => singleOption.value === event?.category)
      : {}
  );
  const convertArrayToString = (data) => {
    const joined = data.join();
    let newAddress = joined.replace(/,/g, " ");
    return newAddress;
  };
  const AddressSeprateHandler = (data, setFieldValue, values) => {
    let address = [];
    let city = [];
    let state = [];
    let postal = [];
    data.map((dataItem) => {
      dataItem.types.map((type) => {
        if (type === ALL_TEXT.FIELD_TYPE_ENUMS.STREET_NUMBER) {
          address.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.ROUTE) {
          address.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.NAIBHOUR) {
          address.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.LOCALITY) {
          city.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.ADMIN) {
          state.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.CODE) {
          postal.push(dataItem.long_name);
        }
      });
    });
    // === convert Address array to string === //
    setFieldValue(ALL_TEXT.FIELD_VALUE.ADDRESS, values);
    setFieldValue(ALL_TEXT.FIELD_VALUE.CITY, convertArrayToString(city));
    setFieldValue(ALL_TEXT.FIELD_VALUE.STATE, convertArrayToString(state));
    setFieldValue(ALL_TEXT.FIELD_VALUE.ZIP, convertArrayToString(postal));
  };

  const handleChangePhoneNumber = (event, setFieldValue) => {
    const inputValue = event?.target.value
      .replace(/^(\+1)/, "")
      .replace(/^(1)/, "");
    const numericValue = inputValue.replace(/[^0-9+]/g, ""); // remove non-numeric characters
    const restrictedValue = numericValue.substring(0, 12); // restrict to 10 digits
    setFieldValue("phone", restrictedValue);
  };
  const generateFormData = (values) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    return formData;
  };
  const dispatch = useDispatch();

  function handleUpdate(event) {
    dispatch(updateEventAction(event))
      .then(unwrapResult)
      .then((result) => {
        toast.success("Event Updated Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, [500]);
      })
      .catch((error) =>
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  }

  const [file, setFile] = useState(null);
  return (
    <>
      <Formik
        initialValues={{
          title: event?.title || "",
          description: event?.description || "",
          duration: event?.duration || "",
          oneTime: event?.oneTime || "",
          eventTime: event?.eventTime || "",
          totalLimit: event?.totalLimit || "",
        }}
        validateOnMount={true}
        // validationSchema={userDetailSchema}
        enableReinitialize
        onSubmit={async (formikValues, action) => {
          let payload = {
            ...formikValues,
            oneTime: type.value,
            category: category.value,
            image: file,
          };
          if (!update) {
            const response = await createNewEvent(payload);
            toast.success(response.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            handleClose();
            setTimeout(() => {
              window.location.reload();
            }, [500]);
          } else {
            let originPayload = { _id: event._id, ...payload };
            delete originPayload.eventTime;
            handleUpdate(originPayload);
          }
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton={handleClose}>
              <h5>{update ? "Update Event" : "Add New Event"}</h5>
            </Modal.Header>
            <Modal.Body>
              <div className="user-detail">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Title"}</label>
                    <InputField
                      id={"title"}
                      name={"title"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.title}
                      error={errors.title}
                      value={values.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Description"}</label>
                    <InputField
                      id={"description"}
                      name={"description"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.description}
                      error={errors.description}
                      value={values.description}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Duration"}</label>
                    <InputField
                      id={"duration"}
                      name={"duration"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.duration}
                      error={errors.duration}
                      value={values.duration}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Max Participants"}</label>
                    <InputField
                      id={"totalLimit"}
                      name={"totalLimit"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.totalLimit}
                      error={errors.totalLimit}
                      value={values.totalLimit}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Type"}</label>
                    <Select
                      name="colors"
                      value={type}
                      options={typOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={setType}
                      isSearchable={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Category"}</label>
                    <Select
                      name="colors"
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={setCategory}
                      value={category}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Event Date"}</label>
                    <InputField
                      id={"eventTime"}
                      name={"eventTime"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.eventTime}
                      error={errors.eventTime}
                      value={values.eventTime}
                      type={"date"}
                      disabled={update}
                    />
                    {/* {update ? event?.eventTime : null} */}
                  </Grid>
                  {!update && (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <label htmlFor="/">{"Choose Poster"}</label>
                      <br />
                      <input
                        id={"Image"}
                        name={"Image"}
                        type="file"
                        onChange={(event) => {
                          setFile(event?.target.files[0]);
                        }}
                        onClick={(e) => (e.target.value = null)}
                        className="filetype"
                      />
                    </Grid>
                  )}
                </Grid>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <GenericButton
                buttonText={buttonText}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
};
