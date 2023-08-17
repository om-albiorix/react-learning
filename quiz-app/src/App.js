import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions.jsx";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialState = {
  questions: [],
  // 'ready' ,''loading,'active','finished','error'
  status: "loading",
  index: 0,
  answer: null,
  points:0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const   question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
      case "nextQuestion": 
        return {...state,index:state.index +1,answer:null}
    default:
      throw new Error("action unkonwn");  
  }
};

function App() {
  const [{ questions, status, index, answer,points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPossiblePoints=questions.reduce((prev,cur)=>Number(prev) + Number(cur.points), []) 

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
    
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points}  answer={answer} maxPossiblePoints={maxPossiblePoints}/>
          <Questions
            questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <NextButton dispatch={dispatch} answer={answer}/>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
