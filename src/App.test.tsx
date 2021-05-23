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
  const SearchBar = screen.getByPlaceholderText("BUSCAR FERRAMENTA");
  expect(SearchBar).toBeInTheDocument();
});

afterEach(cleanup);

test("should render product cards", async () => {
  const { getByTestId } = render(<App />);

  const firstResult = await waitFor(() => getByTestId("productData1"));

  expect("productData1").toBeTruthy();
});

afterEach(cleanup);

test("Search find the right result for a input", async () => {
  const { getByTestId } = render(<App />);

  const searchbar = screen.getByPlaceholderText("BUSCAR FERRAMENTA");

  const firstResult = await waitFor(() => getByTestId("productData1"));

  await userEvent.type(searchbar, "shopify");

  expect(screen.getByText("Shopify")).toBeInTheDocument();
});

test("Search shows a message if there is no results", async () => {
  const { getByTestId } = render(<App />);

  const searchbar = screen.getByPlaceholderText("BUSCAR FERRAMENTA");

  const firstResult = await waitFor(() => getByTestId("productData1"));

  await userEvent.type(searchbar, "sdfsahdghdfhgbadfg");

  expect(screen.getByText("Sem resultados")).toBeInTheDocument();
});

afterEach(cleanup);

test("should open a modal when a card is clicked", async () => {
  const { getByTestId } = render(<App />);

  const firstResult = await waitFor(() => getByTestId("productData1"));

  fireEvent.click(getByTestId("productButton1"));

  expect("modalProduct").toBeTruthy();
});

afterEach(cleanup);

test("User is redirected to the tool website when the button in modal is clicked", async () => {
  const { getByTestId } = render(<App />);

  const firstResult = await waitFor(() => getByTestId("productData1"));

  fireEvent.click(getByTestId("productButton1"));

  expect("modalProduct").toBeTruthy();
});
