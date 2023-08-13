"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/home.module.css";
import { luck} from "../fonts";
import { TiShoppingCart } from "react-icons/ti";
import { IoPersonSharp } from "react-icons/io5";
import LoginButton from "./LoginButton";
export default function NavbarComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" className={styles.customColor}>
        <Container className={luck.className}>
          <Navbar.Brand href="/" className={styles.customHead}>
            TechIt
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="me-auto">
              <Nav.Link className={styles.custom} href="/">
                Home
              </Nav.Link>
              <Nav.Link className={styles.custom} href="/products">
                Products
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className={styles.custom} href="#deets">
                <span>
                  <TiShoppingCart size={40} />
                </span>
              </Nav.Link>
              <Nav.Link className={styles.custom} href="/profile">
                <span>
                  <IoPersonSharp size={35} />
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <LoginButton/>
          </Nav>
        </Container>
      </Navbar>
    );
}