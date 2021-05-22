import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type Props = {
  icon: string;
  name: string;
  handleProductClick?: any;
  url?: string;
  modal?: boolean;
};

function MiniCard({ icon, handleProductClick, name, url, modal }: Props) {
  return (
    <Card
      className={`card col-11 m-4 p-3 align-items-center ${
        modal ? "col-md-3" : "col-md-2"
      }`}
    >
      <Card.Img variant="top" src={icon} style={{ width: "100px" }} />
      <Button
        variant="outline-primary"
        onClick={handleProductClick}
        className="mt-3"
        href={url}
      >
        {name}
      </Button>
    </Card>
  );
}

export default MiniCard;
