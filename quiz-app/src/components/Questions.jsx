import React from 'react'
import Option from './Option';

export default function Questions({questions,answer,dispatch}) {
    console.log(questions.question);
  return (
    <div>
           <h4>{questions.question}</h4> 
           <Option questions={questions} dispatch={dispatch} answer={answer}/>
    </div>
  )
}
