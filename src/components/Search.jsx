import React from "react";
import { IoSearch } from "react-icons/io5";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="search-input">
        <IoSearch fontSize={20} color="#fff" />
        <input
          type="text"
          className="bg-transparent"
          placeholder="Arama Yapın"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
