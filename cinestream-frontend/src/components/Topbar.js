import { useContext, useState } from "react";
import axios from "axios";
import { CineStreamContext } from "../App";
import Constants from "../Constants";

// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Topbar() {
  const { loggedIn, setLoggedIn, setUser } = useContext(CineStreamContext);
  const [show, setShow] = useState(false);
  const [logout, setLogout] = useState(false);
  const AccountModal = () => {
    const handleClose = () => setShow(false);
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {/* Add a Don't have an account yet */}
            <br />
            <Button
              onClick={async (event) => {
                event.preventDefault();
                let email = document.getElementById("formBasicEmail").value;
                let password =
                  document.getElementById("formBasicPassword").value;
                console.log(email, password);
                await axios
                  .post(`${Constants.BACKEND_URL}/users/login`, {
                    email,
                    password,
                  })
                  .then((response) => {
                    console.log(response);
                    setUser(response.data);
                    setLoggedIn(true);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    handleClose();
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("login failed");
                  });
              }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <a style={{ marginLeft: "10px" }} href="/register">
              Don't have an account yet?
            </a>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            CineStream
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
            {/* Create a on hover expand search */}
            <Form className="d-flex">
              {/* Should expand on hover */}
              <Form.Control
                type="search"
                placeholder="Search"
                className="mr-2 search-hover"
                aria-label="Search"
              />
              <Button
                style={{
                  marginLeft: "10px",
                }}
                variant="outline-success"
              >
                Search
              </Button>
            </Form>
            {/* Add a Login button if not logged in */}
            {!loggedIn && (
              <Button
                style={{
                  marginLeft: "10px",
                }}
                variant="outline-primary"
                className="login-button"
                onClick={() => setShow(true)}
              >
                Login
              </Button>
            )}

            {/* Show account logo if logged in */}
            {loggedIn && (
              <Dropdown className="d-inline mx-2">
                <Navbar.Brand
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  className="d-flex"
                  onClick={() => {
                    try {
                      logout
                        ? document
                            .getElementById("dropdown-menu-account")
                            .classList.remove("show")
                        : document
                            .getElementById("dropdown-menu-account")
                            .classList.add("show");
                    } catch (e) {}
                    setLogout(!logout);
                  }}
                >
                  <img
                    alt=""
                    src="/person-circle.svg"
                    style={{
                      color: "white",
                    }}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />
                </Navbar.Brand>

                <Dropdown.Menu
                  id="dropdown-menu-account"
                  style={{
                    marginLeft: "-90px",
                    paddingRight: 0,
                    marginRight: 0,
                  }}
                  show={logout}
                >
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.setItem("user", {});
                      setUser({});
                      setLoggedIn(false);
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AccountModal />
    </>
  );
}
