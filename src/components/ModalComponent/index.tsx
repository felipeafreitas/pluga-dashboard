import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import MiniCard from "../MiniCard";

type Ferramenta = {
  app_id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
};

interface Props {
  selectedProduct?: Ferramenta;
  lastVisited: Array<any>;
  [x: string]: any;
}

function ModalComponent({ selectedProduct, lastVisited,  ...props }: Props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton />
      <Modal.Body className="p-5">
        <div className="mb-5 row flex-wrap justify-content-around">
          <div className="col-12 col-md-6 text-right ">
            <img
              src={selectedProduct?.icon}
              style={{ width: "256px" }}
              alt={selectedProduct?.name}
            />
          </div>
          <div className="d-flex row col-12 col-md-6 align-items-center align-self-center">
            <div className="d-flex" style={{ width: "100%" }}>
              <h1>{selectedProduct?.name}</h1>
            </div>
            <Button variant="primary" size="lg" href={selectedProduct?.link}>
              Acessar
            </Button>
          </div>
        </div>
        <hr />
        <h2>Últimas Ferramentas Visualizadas</h2>
        <div className="row mt-4 justify-content-around">
          {lastVisited.length > 1 ? (
            lastVisited
              .slice(0, -1)
              .slice(Math.max(lastVisited.length - 4, 0))
              .map((element) => {
                return (
                  <MiniCard
                    icon={element.icon}
                    name={element.name}
                    url={element.link}
                    modal={true}
                  />
                );
              })
          ) : (
            <Alert variant="light">Nenhuma ferramenta foi visualizada</Alert>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
