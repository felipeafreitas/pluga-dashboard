import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function SearchBar({setSearchInput}:any) {
  return (
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
  );
}

export default SearchBar;
