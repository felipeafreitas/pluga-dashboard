import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import MiniCard from "./components/MiniCard";

afterEach(cleanup);

// it('should take a snapshot', () => {
//    const { asFragment } = render(<App />)

//    expect(asFragment(<App />)).toMatchSnapshot()
//   })
// });

test("renders SearchBar Component", () => {
  render(<App />);
  const SearchBarPlaceHolder = screen.getByPlaceholderText("BUSCAR FERRAMENTA");
  expect(SearchBarPlaceHolder).toBeInTheDocument();
});

afterEach(cleanup);

it('should render api result', async () => {
  const { getByTestId } = render(<App />); 

  const counter = await waitFor(() => getByTestId('productData1')) 

  // expect(<MiniCard />).toBeTruthy()

});

// test("renders SearchBar header", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   const wrapper = shallow(<App />);
//   const welcome = <h1>Display Active Users Account Details</h1>;
//   expect(wrapper.contains(welcome)).toEqual(true);
// });
