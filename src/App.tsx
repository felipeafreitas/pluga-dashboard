import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import ModalComponent from "./components/ModalComponent";
import PaginationComponent from "./components/PaginationComponent";

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>

      <ModalComponent show={modalShow} onHide={() => setModalShow(false)} />

      <PaginationComponent />
    </Container>
  );
}

export default App;
