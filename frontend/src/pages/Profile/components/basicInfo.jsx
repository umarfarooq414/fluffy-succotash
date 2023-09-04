import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Alert from "../../Alert/Alert";
const BasicInfo = ({ userData }) => {
  console.log(userData, "userData basic", userData?.name);
  const [passwordShown, setPasswordShown] = useState(false);
  const [First_name, setfirstName] = useState({
    name: userData?.name,
    email: userData?.email,
    password: "",
  });
  // Alert
  const [customAlert, setCustomAlert] = useState({
    message: "",
    type: "",
    showAlert: false,
  });
  const passwordshow = () => {
    if (passwordShown) setPasswordShown(false);
    else {
      setPasswordShown(true);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    const regex = /[0-9a-zA-Z ]/;
    if (!regex.test(key)) {
      e.preventDefault();
    }
  };
  const handleInputChange = (name, value) => {
    setfirstName({
      ...First_name,
      [name]: value,
    });
  };
  const requestOption = {
    app_name: "parent_app",

    token: "token",
    utype: "utype",
    ...First_name,
  };

  function isStrongPassword(password) {
    // Define the regular expression pattern for strong password validation
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // Test if the password matches the pattern
    return strongPasswordPattern.test(password);
  }

  const handlesubmit = (e) => {};

  if (customAlert.showAlert) {
    setTimeout(
      () =>
        setCustomAlert({
          message: "",
          type: "",
          showAlert: false,
        }),
      3000
    );
  }

  console.log(<First_name></First_name>, "First_name.name");

  return (
    <>
      {customAlert.showAlert && (
        <Alert
          variant={customAlert.type}
          onClose={() =>
            setCustomAlert({
              showAlert: false,
            })
          }
          style={{ zIndex: "999" }}
          className="display-linebreak auth-alert"
          dismissible
        >
          <Button
            className="btn-close"
            onClick={() =>
              setCustomAlert({
                showAlert: false,
              })
            }
            variant={"outline-" + customAlert.type}
          />
          <p>{customAlert.message}</p>
        </Alert>
      )}
      <Card
        className="bg-white rounded p-3 rounded-left mb-0 "
        style={{ height: "100%" }}
      >
        <Card.Title
          style={{
            fontSize: "1.25rem",
            fontWeight: "400",
            textTransform: "capitalize",
          }}
          className="mb-4"
        >
          Update Info
        </Card.Title>
        <Form style={{ padding: "15px" }} onSubmit={handlesubmit}>
          <Form.Group
            className="mb-3 textfield first_name  required d-flex"
            controlId="forml"
          >
            <Form.Label
              style={{
                flex: "27",
                padding: "7px 0px",
                fontSize: "14px",
                textTransform: "none",
              }}
              className="mb-0 require_asterik"
            >
              Name
            </Form.Label>
            <div style={{ flex: "70 1 0%" }}>
              <Form.Control
                style={{}}
                type="text"
                placeholder="Name"
                value={First_name.name || userData?.name}
                maxLength="40"
                onChange={(e) =>
                  handleInputChange(
                    "first_name",
                    e.target.value.replace(/[^A-Za-z0-9. ]/g, "")
                  )
                }
                required
              />
            </div>
          </Form.Group>

          <Form.Group
            className="mb-3 textfield first_name  required d-flex"
            controlId="for"
          >
            <Form.Label
              style={{
                flex: "27",
                padding: "7px 0px",
                fontSize: "14px",
                textTransform: "none",
              }}
              className="mb-0 require_asterik"
            >
              Email
            </Form.Label>
            <div style={{ flex: "70 1 0%" }}>
              <Form.Control
                style={{}}
                type="email"
                placeholder="Email"
                value={First_name.email || userData?.email}
                onChange={(e) =>
                  handleInputChange(
                    "email",
                    e.target.value.replace(/[^A-Za-z0-9.@ ]/g, "")
                  )
                }
                required
              />
            </div>
          </Form.Group>
          <Form.Group
            className="mb-3 textfield first_name  required d-flex"
            controlId="formBasicEmai"
          >
            <Form.Label
              style={{
                flex: "27",
                padding: "7px 0px",
                fontSize: "14px",
                textTransform: "none",
              }}
              className="mb-0 require_asterik"
            >
              Password
            </Form.Label>
            <div style={{ position: "relative", flex: "70 1 0%" }}>
              <Form.Control
                style={{ paddingRight: "30px" }}
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                value={First_name.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
              {passwordShown === true ? (
                <AiFillEye className="profile-eye" onClick={togglePassword} />
              ) : (
                <AiFillEyeInvisible
                  className="profile-eye"
                  onClick={togglePassword}
                />
              )}
            </div>
          </Form.Group>
          <Button
            disabled={!isStrongPassword(First_name.password) ? "disabled" : ""}
            className="btn btn-primary"
            type="submit"
            style={{
              padding: "6px 12px",
              fontSize: "13px",
              background: "#3f6ad8",
              border: "#3f6ad8",
              borderRadius: "4px",
              fontWeight: "500",
            }}
          >
            Update
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default BasicInfo;
