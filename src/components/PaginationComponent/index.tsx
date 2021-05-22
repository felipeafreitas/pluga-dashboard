import Pagination from "react-bootstrap/Pagination";

interface Props {
  pageCount: number;
  active: number;
  handlePageClick: any
}

function PaginationComponent({ pageCount, active, handlePageClick }: Props) {
  let total = pageCount;
  let items = [];

  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={handlePageClick}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default PaginationComponent;
