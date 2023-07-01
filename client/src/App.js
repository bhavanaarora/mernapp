import React,{createContext,useReducer} from 'react';

import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Form from './screens/Form';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {CartProvider, initialState,reducer} from '../src/components/reducer/useRedeucer';


export const UserContext=createContext();
function App() {

const [state,dispatch]=useReducer(reducer,initialState);

  return (
<>

<UserContext.Provider value={{state,dispatch}}>
<CartProvider>
<Router>
  <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/Login' element={<Login/>}/>
    <Route exact path='/Logout' element={<Logout/>}/>
    <Route exact path='/Signup' element={<Signup/>}/>
    <Route exact path='/MyOrder' element={<MyOrder/>}/>
    <Route exact path='/Form' element={<Form/>}/>        
      </Routes>
</Router>
</CartProvider>
</UserContext.Provider>
</>

 );
}

export default App;
