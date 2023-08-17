import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  // 'ready' ,''loading,'active','finished','error'
  status: 'loading'
};

const reducer = (state, action) => {

  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "error" }
    default:
      throw new Error("action unkonwn")
  }


}

function App() {
  const [{question,status }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, [])

  return (
    <div className="App">
      <Header />
      <Main>
      {status ==="loading" && <Loader/>} 
      {status ==="error" && <Error/>}
      {status ==="ready" && <StartScreen/>}
      </Main>
    </div>
  );
}

export default App;
