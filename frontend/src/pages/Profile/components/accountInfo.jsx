import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import "./style.css";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { KeyValueData } from "../../../components/horizontal-card";

const AccountInfo = ({ userData }) => {
  console.log(userData, "user data");
  return (
    <>
      <div
        style={{ height: "100%", padding: "0 15px" }}
        className="bg-white rounded card"
      >
        <Container
          className="p-3"
          style={{ borderBottom: "1px solid #dee2e6" }}
        >
          <Row>
            <Col className="p-0">
              <h5
                style={{
                  marginBottom: "15px",
                  color: "rgb(73, 80, 87)",
                  fontWeight: "400",
                }}
              >
                Account Info
              </h5>
            </Col>
          </Row>
          <Row>
            <Col md="2" className="p-0">
              <img
                className="profile_avatar"
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
                src={userData.profileImage}
                alt="No image"
              />
            </Col>
            <Col md="10" className="d-flex flex-column justify-content-center">
              <h6
                style={{ fontWeight: "500", fontSize: "16px", color: "#000" }}
              >
                {userData.gender}
              </h6>
              <h6 className="type">
                Type:
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#9a9a9a",
                    margin: "0 0 0 5px",
                  }}
                >
                  {userData.role || "N/A"}
                </span>
              </h6>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Box className="m-3">
              <KeyValueData keyy={"Name"} value={userData?.name} />
            </Box>
            <Box className="m-3">
              <KeyValueData keyy={"Email"} value={userData?.email} />
            </Box>
            <Box className="m-3">
              <KeyValueData keyy={"Joined At"} value={userData?.createdAt} />
            </Box>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AccountInfo;
