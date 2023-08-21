import styles from "./CountryList.module.css"
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem"
import { useCities } from "../../contexts/CitiesContext";

function CountryList() {

  const {isLoading,cities}=useCities();

  if(isLoading) return <Spinner/>

  if(!cities.length) 
  return (
  <Message message="Add Your first city by clicking on a city on the map" />
    );

    const countries= cities.reduce((arr,city)=>{
    if(!arr.map((ele)=>ele.country).includes(city.country))
    return [...arr,{country:city.country,emoji:city.emoji}] 
    else return arr;
    },[]
    )

  return (
    <div>
      <ul className={styles.countryList }>
        {
          countries.map((country)=>( 
          <CountryItem country={country} key={country.country} />
          ))
        }
      </ul>
    </div>
  )
}

export default CountryList;