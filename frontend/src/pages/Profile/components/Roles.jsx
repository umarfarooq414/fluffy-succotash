import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import './style.css'
import { useSelector } from 'react-redux'

const Roles = (Role) => {
  const role = useSelector((state) => state?.dashboardData?.profile_Data)

  return (
    <Container fluid className='mb-3 pt-2 px-0'>
      <Row className='mx-0 rounded-top'>
        <Col lg='6' className='px-3 py-4'>
          <h5 style={{ fontWeight: '500' }} className='m-0'>
            Roles
          </h5>
        </Col>
        <Col lg='6' />
      </Row>
      <Row className='mx-0 rounded-top'>
        <Col>
          <Table className='m-0 table'>
            <thead>
              <tr>
                <th style={{ borderTop: 'none', color: '#495057', fontSize: '15px' }}>Title</th>
              </tr>
            </thead>
            <tbody style={{ color: '#495057', fontSize: '15px' }}>

              {Role?.Role?.roles.map((element) => {
                return (
                  <tr className='userRoles'>{element?.name}</tr>
                )
              })}

            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Roles
