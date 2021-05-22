import Pagination from "react-bootstrap/Pagination";

interface Props{
  pageCount: number;
  [x:string]: any;
}

function PaginationComponent(props:Props) {
  let active = 1;
  let total = props.pageCount;
  let items = []

  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item key={number} onClick={props.handlePageClick}>
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
