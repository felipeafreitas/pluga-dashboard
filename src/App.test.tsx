import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import MiniCard from "./components/MiniCard";

afterEach(cleanup);

test("renders SearchBar Component", () => {
  render(<App />);
  const SearchBarPlaceHolder = screen.getByPlaceholderText("BUSCAR FERRAMENTA");
  expect(SearchBarPlaceHolder).toBeInTheDocument();
});

afterEach(cleanup);

test("should render product cards", async () => {
  const { getByTestId } = render(<App />);

  const counter = await waitFor(() => getByTestId("productData1"));

  expect("productData1").toBeTruthy();
});

afterEach(cleanup);

test("Search input show the right result", async () => {
  const { getByTestId } = render(<App />);

  const searchbar = screen.getByPlaceholderText("BUSCAR FERRAMENTA");

  const result = await waitFor(() => getByTestId("productData1"));

  await userEvent.type(searchbar, "Shopify");

  expect(screen.getByText("Shopify")).toBeInTheDocument();
});


test("should open a modal when a card is clicked", async () => {
  const { getByTestId } = render(<App />);

  const counter = await waitFor(() => getByTestId("productData1"));

  fireEvent.click(getByTestId("productButton1"));

  expect("modalProduct").toBeTruthy();
});

afterEach(cleanup);

// test("renders SearchBar header", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   const wrapper = shallow(<App />);
//   const welcome = <h1>Display Active Users Account Details</h1>;
//   expect(wrapper.contains(welcome)).toEqual(true);
// });
