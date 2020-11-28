import { useEffect, useState } from "react";
import api from "../api/news";
const API_KEY = "3d182e797d37452fbd8eb0dcee53d5a7";
export default () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const searchApi = async () => {
    const response = await api.get(
      `/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
    );
    setResults(response.data.articles);
    //console.log(response.data.articles);
  };

  useEffect(() => {
    searchApi();
  }, []);

  return [searchApi, results, error];
};
