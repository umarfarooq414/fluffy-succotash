import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.css";

const Usergroups = ({ data }) => {
  const sys_info = useSelector((state) => state?.loginSlice?.sys_info);

  return (
    <>
      <Container fluid className="mb-2 pt-4 px-0">
        <Row className="mx-0 rounded-top">
          <Col lg="6" className="py-4 px-3">
            <h5 style={{ fontWeight: "500" }} className="m-0">
              Companies
            </h5>
          </Col>
          <Col lg="6" />
        </Row>
        <Row className="mx-0 rounded-top">
          <Col>
            {/* <Table  className='m-0 table'>
      <thead>
      <tr>
        <th style={{borderTop: "none"}}>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CWC Team</td>
        </tr>
      </tbody>
    </Table> */}
            <table class="table table-hover m-0 companies">
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Company Title</th>
                  <th scope="col">Plan</th>
                  <th scope="col">User</th>
                  <th scope="col">Created at</th>
                </tr>
              </thead>
              <tbody class="userCompaniesList">
                <>
                  {data.companies?.length ? (
                    <>
                      {data.companies.map((company) => {
                        const { account_id, title, created_at, token } =
                          company;
                        const { last_name, first_name } = data;
                        const formatDate = "2021-06-01";
                        return (
                          <tr>
                            <td scope="col">{account_id}</td>
                            <td scope="col">{title}</td>
                            <td scope="col">{data.planInfo.plan_name}</td>
                            <td scope="col">
                              {first_name} {last_name}
                            </td>
                            <td scope="col">{formatDate}</td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <td
                      class="text-center"
                      colspan="5"
                      style={{
                        verticalAlign: "bottom",
                        color: "#495057",
                        fontSize: "14px",
                        padding: "8.8px",
                      }}
                    >
                      No Company Found!
                    </td>
                  )}
                </>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Usergroups;
