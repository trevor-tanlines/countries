import React, { useEffect, useState } from "react";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterBy, setFilterBy] = useState({ continent: "", subregion: "" });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter countries based on continent or subregion
  const handleFilterChange = (type, value) => {
    setFilterBy((prev) => ({ ...prev, [type]: value }));
    let filtered = [...countries];
    if (type === "continent") {
      filtered = countries.filter((c) => c.continents.includes(value));
      setFilterBy({ continent: value, subregion: "" }); // Clear subregion filter
    } else if (type === "subregion") {
      filtered = countries.filter((c) => c.subregion === value);
      setFilterBy({ continent: "", subregion: value }); // Clear continent filter
    }
    setFilteredCountries(filtered);
  };

  // Sort countries alphabetically or by top 10 population/area
  const handleSortChange = (option) => {
    setSortOption(option);
    let sorted = [...filteredCountries];
    if (option === "alpha") {
      sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (option === "population") {
      sorted.sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (option === "area") {
      sorted.sort((a, b) => b.area - a.area).slice(0, 10);
    }
    setFilteredCountries(sorted);
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <div>
        <label>
          Filter by Continent:
          <select
            value={filterBy.continent}
            onChange={(e) => handleFilterChange("continent", e.target.value)}
          >
            <option value="">All</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
          </select>
        </label>
        <label>
          Filter by Subregion:
          <select
            value={filterBy.subregion}
            onChange={(e) => handleFilterChange("subregion", e.target.value)}
          >
            <option value="">All</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="Western Africa">Western Africa</option>
          </select>
        </label>
        <label>
          Sort:
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">None</option>
            <option value="alpha">Alphabetically</option>
            <option value="population">Top 10 by Population</option>
            <option value="area">Top 10 by Area</option>
          </select>
        </label>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
