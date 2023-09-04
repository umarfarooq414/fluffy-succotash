import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { images } from "../../common";
import { ALL_TEXT, ENUMS } from "../../common/constants";
import { GenericButton, GenericModal, InputField } from "../../components";
import { Formik } from "formik";
import { signUpSchema } from "../../common/schemas";
import { path } from "./../../common/routesNames";
import { setProfile, setToken } from "../../utils/localstorage";
import "react-toastify/dist/ReactToastify.css";
import { Field } from "formik";
import Select from "react-select";

import {
  openModal,
  closeModal,
  setModalDetails,
} from "../../utils/storee/slices/popup-modal";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../utils/rest-services";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import {
  registerUserAction,
  registerImageUserAction,
} from "../../utils/store/slices/userAuth/actions";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState();

  const [btnLoader, setbtnLoader] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const modalPopup = useSelector((state) => {
    return state.modal;
  });
  const navigate = useNavigate();
  const options = [
    { value: "Web", label: "Web Application" },
    { value: "App", label: "Mobile App" },
    { value: "AI", label: "Artificial Intelligence" },
  ];
  const initialValues = {
    name: "",
    // DOB: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
    interests: null,
  };

  const saveUserData = (token, employee) => {
    setToken(`bearer ${token}`);
    setProfile(employee);
    navigate(path.dashboard, { replace: true });
  };
  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
    inputRef.current?.click();
    // 🚩 do the file upload here normally...
  };
  const requestLogin = async (values, formik) => {
    // setbtnLoader(true);
    console.log(value, "ssss");
    const payload = {
      ...values,
      image: file,
      interests: value,
    };
    console.log("payload", payload);
    // if (values.password !== values.confirmPassword) {
    //   toast.error("passwords do not match", {
    //     position:toast.POSITION.TOP_RIGHT
    //   })
    // }
    // let result = await registerUser({
    //   ...values,
    // });
    // dispatch(registerUserAction(payload)).then(unwrapResult).then((result) => {

    //   if (
    //     result &&
    //     result.message &&
    //     result.message === "Registration success. Please login."
    //   ) {
    //     toast.success(result.message,{position:toast.POSITION.TOP_RIGHT})
    //   }
    // })

    dispatch(registerImageUserAction(payload))
      .then(unwrapResult)
      .then((result) => {
        if (
          result &&
          result.message &&
          result.message === "Registration success. Please login."
        ) {
          toast.success(result.message, { position: toast.POSITION.TOP_RIGHT });
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    // console.log(
    //   result,
    //   "re ehe",
    //   result.message === "Registration success. Please login."
    // );
    // dispatch(
    //   setModalDetails({
    //     details: result.message,
    //     type: ENUMS.MODAL_TYPES.SUCCESS,
    //   })
    // );
    // dispatch(openModal());
    // navigate('/dashboard');
  };
  function handleValues(selectedOptions) {
    const values = selectedOptions?.map((option) => option.value);
    console.log(values);
    setValue(values);
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        onSubmit={(values, formikActions) => {
          console.log("sdsd");
          requestLogin(values, formikActions);
        }}
        validationSchema={signUpSchema}
        enableReinitialize
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          touched,
          errors,
        }) => (
          <div
            className="login-background"
            style={{
              backgroundImage: `url(${images.noDukAmdinBackground})`,
            }}
          >
            <div className="noduk-logo">
              <img src={images.mainLogo} alt={ALL_TEXT.ICON} />
            </div>
            <div className="sign-up-box">
              <div className="login-logo">
                <img src={images.userLogin} alt={ALL_TEXT.ICON} />
                <p>{"Register Yourself"}</p>
              </div>
              <div className="login-input-field">
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"name"}
                  id={"name"}
                  placeholder={"Enter you name"}
                  error={touched.name && errors.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"email"}
                  id={"email"}
                  placeholder={ALL_TEXT.ENTER_EMAIL}
                  error={touched.email && errors.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"gender"}
                  id={"gender"}
                  placeholder={"Enter your Gender"}
                  error={touched.gender && errors.gender}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                {/* <InputField
                  icon={<span class="icon-email"></span>}
                  name={"DOB"}
                  id={"DOB"}
                  type={"date"}
                  placeholder={"Enter your Date of Birth"}
                  error={touched.DOB && errors.DOB}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                /> */}
                <InputField
                  icon={<span class="icon-password"></span>}
                  id={"password"}
                  name={"password"}
                  placeholder={ALL_TEXT.ENTER_PASSWORD}
                  error={touched.password && errors.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />
                <InputField
                  icon={<span class="icon-password"></span>}
                  id={"confirmPassword"}
                  name={"confirmPassword"}
                  placeholder={"Enter your Confirm password"}
                  error={touched.confirmPassword && errors.confirmPassword}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <label htmlFor="/">{"Choose Image"}</label>

                  <input
                    id={"Image"}
                    name={"Image"}
                    type="file"
                    accept="files/*"
                    onChange={handleFileChange}
                  />
                </Grid>
                <Select
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => handleValues(selectedOptions)}
                />

                <div className="login-button">
                  <GenericButton
                    buttonText={"Register"}
                    onPress={handleSubmit}
                    loading={btnLoader}
                  />
                  <div className="login-button">
                    {/* <GenericButton
                      buttonText={"Already Registered ? Login"}
                      onPress={() => {
                        navigate(path.login, { replace: true });
                      }}
                    /> */}
                    <div
                      className="forgotPassword-action"
                      onClick={() => {
                        navigate({ pathname: path.login });
                      }}
                    >
                      <a>{"Already Registered ? Login"}</a>
                    </div>
                  </div>
                </div>
              </div>
              <GenericModal
                show={modalPopup.openModal}
                type={modalPopup.type}
                title={modalPopup.title}
                body={modalPopup.details}
                buttonText={modalPopup.primaryBtnText}
                handleClose={() => {
                  dispatch(closeModal());
                  navigate(path.login, { replace: true });
                }}
              />
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
export default Register;
