import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BasicInfo from "./components/basicInfo";
import AccountInfo from "./components/accountInfo";
import Usergroups from "./components/userGroups";
import Roles from "./components/Roles";
import { useEffect, useState } from "react";
import { getUserData } from "../../utils/rest-services";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const userData = await getUserData();
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="title-container-userlist">
          <span>Profile</span>
        </div>
        {userData && Object.keys(userData).length ? (
          <Container
            fluid
            style={{
              background: "#E5E8ED",
              padding: "14px 20px",
              height: "100%",
              color: "#495057",
            }}
          >
            <Row style={{ marginBottom: "8px" }}>
              <Col md="6" xs="12" className="ps-0">
                {/* {Accountdetail ? ( */}
                <AccountInfo userData={userData} />
                {/* ) : null} */}
              </Col>
              <Col md="6" xs="12" className="ps-0">
                <BasicInfo userData={userData} />
              </Col>
            </Row>
          </Container>
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
    </>
  );
};

export default Dashboard;
