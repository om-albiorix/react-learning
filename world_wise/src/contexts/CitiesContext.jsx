import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const URL = "http://localhost:9000";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error loadiing data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = async (id) => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();
        console.log({ data });
        setCurrentCity(data);
      } catch {
        alert("there was an error loadiing data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("citiscontext was used  outside the CitiesProvider");
  console.log({ context });
  return context;
};

export { CitiesProvider, useCities };
