import { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import ModalComponent from "./components/ModalComponent";
import PaginationComponent from "./components/PaginationComponent";
import SearchBar from "./components/SearchBar";
import MiniCard from "./components/MiniCard";

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
  const [selectedPage, setSelectedPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Ferramenta>();
  const [lastVisited, setLastVisited] = useState([]);

  const PER_PAGE = 12;

  useEffect(() => {
    function searchFilter() {
      setOffset(0);
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
      const slice = filteredProducts.slice(offset, offset + PER_PAGE);
      setPaginatedProducts(slice);
      setPageCount(Math.ceil(filteredProducts.length / PER_PAGE));
    }

    paginator();
  }, [offset, filteredProducts]);

  function handlePageClick(e: any) {
    const selectedPage = Number(e.target.innerHTML);
    setSelectedPage(selectedPage);
    setOffset((selectedPage - 1) * PER_PAGE);
  }

  function handleProductClick(e: any) {
    let selectedProduct = products.filter((element: Ferramenta) => {
      return element.name === e.target.innerHTML;
    });

    let lastThree = lastVisited.slice(Math.max(lastVisited.length - 3, 0));
    let check = lastThree.some(
      (element: Ferramenta) => element.name === e.target.innerHTML
    );

    if (!check) {
      setLastVisited((lastVisited) => [...lastVisited, ...selectedProduct]);
    }

    setSelectedProduct(selectedProduct[0]);
    setModalShow(true);
  }

  return (
    <Container>
      <SearchBar setSearchInput={setSearchInput} />

      <main className="d-flex row justify-content-around mb-5">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((element: Ferramenta, index) => {
            return (
              <MiniCard
                icon={element.icon}
                name={element.name}
                handleProductClick={handleProductClick}
                key={index}
                idTest={index}
              />
            );
          })
        ) : (
          <Alert variant="dark">Sem resultados</Alert>
        )}
      </main>

      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedProduct={selectedProduct}
        lastVisited={lastVisited}
      />
      <div className="d-flex justify-content-around">
        <PaginationComponent
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          active={selectedPage}
        />
      </div>
    </Container>
  );
}

export default App;
