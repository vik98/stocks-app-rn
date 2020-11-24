import { useEffect, useState } from "react";
import api from "../api/api";
const API_KEY = "N0VVXF6Q5H4VAMZT";
export default () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const searchApi = async (searchTerm) => {
    const response = await api.get(
      `/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&&apikey=${API_KEY}`
    );
    console.log(searchTerm);

    setResults(response.data["bestMatches"]);
    console.log(results.length);
  };

  useEffect(() => {
    searchApi("tesco");
  }, []);

  return [searchApi, results, error];
};
