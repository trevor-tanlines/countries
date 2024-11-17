import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.length > 0 ? (
        countries.map((country) => (
          <Country key={country.cca3} country={country} />
        ))
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
};

export default Countries;
