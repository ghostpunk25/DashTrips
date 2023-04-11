import { Container, Row, Col } from "react-bootstrap"
import { AppBar } from "../AppBar/AppBar"
import { Outlet } from "react-router-dom"

export const Layout = ({ handleLogOut, user, admin }) => {
   return (
      <Container fluid className="p-0">
         <Row className="m-0">
            <Col xs={3}><AppBar handleLogOut={handleLogOut} user={user} admin={admin} /></Col>
            <Col xs={9}><Outlet /></Col>
         </Row>
      </Container>
   )
}