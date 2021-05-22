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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [offset, setOffset] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Ferramenta>()
  const [lastVisited, setLastVisited] = useState([]);

  const perPage = 12;

  useEffect(() => {
    function searchFilter() {
      setOffset(0)
      let result = products.filter((element: Ferramenta) => {
        return element.name.toLowerCase().includes(searchInput);
      });
      setFilteredProducts(result);
    }

    searchFilter();
  }, [searchInput, products]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          "https://pluga.co/ferramentas_search.json"
        );
        const data = response.data;

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function paginator() {
      const slice = filteredProducts.slice(offset, offset + perPage);
      setPaginatedProducts(slice);
      setPageCount(Math.ceil(filteredProducts.length / perPage));
    }

    paginator();
  }, [offset, filteredProducts]);

  interface Event {
    [x: string]: any;
  }

  function handlePageClick(e: Event) {
    const selectedPage = Number(e.target.innerHTML);
    setPageCount(selectedPage)
    setOffset((selectedPage - 1) * perPage);
  }

  function handleProductClick(e: Event) {
    let selectedProduct = products.filter((element: Ferramenta) => {
      return element.name === e.target.innerHTML;
    });
    setSelectedProduct(selectedProduct[0])
    setLastVisited(lastVisited => [...lastVisited, ...selectedProduct])
    setModalShow(true)
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
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </InputGroup>

      <div className="d-flex row justify-content-around mb-5">
        {paginatedProducts.map((element: Ferramenta) => {
          return (
            <Card className="card col-md-2 col-11 m-4 p-3 align-items-center" style={{backgroundColor: '#D8D8D8'}}>
              <Card.Img
                variant="top"
                src={element.icon}
                style={{ width: "100px" }}
              />
              <Button
                variant="outline-primary"
                onClick={handleProductClick}
                className="mt-3"
              >
                {element.name}
              </Button>
            </Card>
          );
        })}
      </div>

      <ModalComponent show={modalShow} onHide={() => setModalShow(false)} 
      selectedProduct={selectedProduct}
      lastVisited={lastVisited}
      />
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
