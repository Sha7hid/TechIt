"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { luck } from "@/fonts";
import styles from "./home.module.css";
import {TiShoppingCart} from 'react-icons/ti';
import {IoPersonSharp} from 'react-icons/io5'
export default function Home() {
  return (
    <Navbar collapseOnSelect expand="lg" className={styles.customColor}>
      <Container className={luck.className}>
        <Navbar.Brand href="#home" className={styles.customHead}>
          TechIt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="me-auto">
            <Nav.Link className={styles.custom} href="#features">
              Home
            </Nav.Link>
            <Nav.Link className={styles.custom} href="#pricing">
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className={styles.custom} href="#deets">
              <span><TiShoppingCart size={50}/></span>
            </Nav.Link>
            <Nav.Link className={styles.custom} href="#memes">
            <span><IoPersonSharp size={45}/></span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
