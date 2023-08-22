import { createContext, useContext, useReducer } from "react";

const Authcontext=createContext();

const intialState={
    user:null,
    isAuthenticated:false
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

const reducer=(state,action)=>{
switch(action.type){
case 'login':
    return{...state,user:action.payload,isAuthenticated:true};
    case "logout":
        return {...state,user:null,isAuthenticated:false}
    default:throw new Error("unknown action")
}

}

const AuthProvider=({children})=>{

    const [{user,isAuthenticated},dispatch]=useReducer(reducer,intialState)

    const login=(email,password)=>{
        if(email ===FAKE_USER.email && password===FAKE_USER.password)
        dispatch({type:"login",payload:FAKE_USER})
    }

    const logout=()=>{
        dispatch({type:"logout"});  
    }

    return <Authcontext.Provider
    value={{user,isAuthenticated,login,logout}}
    >
        {children}
    </Authcontext.Provider>
}

const useAuth=()=>{
    const context=useContext(Authcontext)
    if(context ===undefined) throw new Error("Auth context was used outside AuthProvider")
    return context;
}

export {AuthProvider,useAuth}