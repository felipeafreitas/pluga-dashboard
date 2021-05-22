import { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import ModalComponent from "./components/ModalComponent";
import PaginationComponent from "./components/PaginationComponent";

type Ferramenta = {
  app_id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
};

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [offset, setOffset] = useState(0);
  const [lastVisited, setLastVisited] = useState([]);

  const perPage = 12;

  async function fetchData() {
    try {
      let response = await axios.get(
        "https://pluga.co/ferramentas_search.json"
      );
      const data = response.data;

      const slice = data.slice(offset, offset + perPage);

      console.log(slice);

      setProducts(slice);

      setPageCount(Math.ceil(data.length / perPage));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [offset]);

  interface Event {
    [x: string]: any;
  }

  function handlePageClick(e: Event) {
    console.log(e.target.innerHTML);
    const selectedPage = e.target.innerHTML;
    setOffset(selectedPage + 1);
  }

  return (
    <Container>
      <InputGroup size="lg" className="mt-5 mb-5">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="BUSCAR FERRAMENTA"
          // onChange={() => setSearchInput(input)}
        />
      </InputGroup>

      <div className="d-flex row justify-content-around mb-5">
        {products.map((element: Ferramenta) => {
          return (
            <Card
              className="card col-md-2 col-12 m-4 p-3 align-items-center"
            >
              <Card.Img
                variant="top"
                src={element.icon}
                style={{ width: "100px" }}
              />
              <Button variant="primary" onClick={() => setModalShow(true)} className='mt-3'>
                {element.name}
              </Button>
            </Card>
          );
        })}
      </div>

      <ModalComponent show={modalShow} onHide={() => setModalShow(false)} />
      <div className="d-flex justify-content-around">
        <PaginationComponent
          handlePageClick={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </Container>
  );
}

export default App;
