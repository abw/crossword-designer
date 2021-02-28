import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from "@reach/router"

const Footer = () => {
  return <footer>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Text>
          Written by Andy Wardley
        </Navbar.Text>
        <Nav className="ml-auto">
          <Nav.Link to="about" as={Link}>About</Nav.Link>
          <Nav.Link to="help"  as={Link}>Help</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </footer>
}

export default Footer