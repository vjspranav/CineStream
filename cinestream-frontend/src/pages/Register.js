import axios from "axios";
import { Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Constants from "../Constants";
import { CineStreamContext } from "../App";
import { useContext } from "react";

export default function Register() {
  // Use react boot strap forms to create a register page
  // https://react-bootstrap.github.io/components/forms/
  const { loggedIn } = useContext(CineStreamContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {loggedIn ? (
        <h1>Already logged in</h1>
      ) : (
        <Form
          style={{
            width: "50%",
            border: "1px solid black",
            padding: "20px",
          }}
        >
          <h1>Register</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/* Username */}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>

          <FormGroup controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="fullname" placeholder="Enter full name" />
          </FormGroup>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="I am fully aware that this is a fake website and I am not actually registering for anything"
            />
          </Form.Group>

          {/* Register button */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              let email = document.getElementById("formBasicEmail").value;
              let username = document.getElementById("formBasicUsername").value;
              let fullName = document.getElementById("formBasicFullName").value;
              let password = document.getElementById("formBasicPassword").value;
              console.log(email, username, fullName, password);
              axios
                .post(`${Constants.BACKEND_URL}/users/register`, {
                  email,
                  username,
                  fullName,
                  password,
                })
                .then((response) => {
                  console.log(response);
                  alert("Registration successful");
                })
                .catch((error) => {
                  console.log(error);
                  alert("Registration failed");
                });
            }}
            variant="primary"
            type="submit"
          >
            Register
          </Button>
        </Form>
      )}
    </div>
  );
}
