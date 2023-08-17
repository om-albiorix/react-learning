import React from 'react'

export default function StartScreen({questions,dispatch}) {
  return (
    <div className='center'>
      <h2>Welcome to The React Quiz! </h2>
      <p>{questions} Questions to test your react mastery</p>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"start"})}>Let's Start</button>
    </div>
  )
}
