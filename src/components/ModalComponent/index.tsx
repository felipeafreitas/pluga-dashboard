import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type Ferramenta = {
  app_id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
};

interface Props {
  // title: string
  selectedProduct?: Ferramenta;
  lastVisited: Array<any>;
  [x: string]: any;
}

function ModalComponent({ selectedProduct, lastVisited, ...props }: Props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton /> */}
      <Modal.Body>
        <div className="mb-5 row flex-wrap justify-content-around">
          <div className="col-6">
            <img
              src={selectedProduct?.icon}
              style={{ width: "256px" }}
              alt={selectedProduct?.name}
            />
          </div>
          <div className="column col-6" style={{}}>
            <h1 className="">{selectedProduct?.name}</h1>
            <Button variant="primary" size="lg" href={selectedProduct?.link}>
              Acessar
            </Button>
          </div>
        </div>
        <hr />
        <h2>Últimas Ferramentas Visualizadas</h2>
        <div className="row">
          {lastVisited.length > 0 ? (
            lastVisited
              .slice(Math.max(lastVisited.length - 3, 0))
              .map((element) => {
                return (
                  <div
                    className="column col-4 justify-content-center"
                    style={{ backgroundColor: "#D8D8D8" }}
                  >
                    <img
                      src={element.icon}
                      alt={element.name}
                      style={{ width: "128px" }}
                    />
                    <br />

                    <Button variant="outline-primary" href={element.link}>
                      {element.name}
                    </Button>
                  </div>
                );
              })
          ) : (
            <div style={{}}>
              <p className="text-center">Nenhuma Ferramenta Visualizada</p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
