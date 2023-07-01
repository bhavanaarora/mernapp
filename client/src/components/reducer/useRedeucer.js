import React, { createContext,useReducer,useContext } from "react";
const CartStateContext=createContext();
const CartDispatchContext=createContext();

//////////////////////////////////////////
//for toggle between navbar

export const initialState = null;
export const reducer=(state,action)=>{
    if(action.type === "User"){
        return action.payload;
    }
     
       if(action.type === "ADD"){
        return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
       }
       if(action.type === "REMOVE"){
        let newArr=[...state]
        newArr.splice(action.index,1)
        return newArr;
       }
       if(action.type === "UPDATE"){
        let arr=[...state]
        arr.find((food,index)=>{
            console.log(food.id);
            if(food.id === action.id){
                arr[index]={...food,qty:parseInt(action.qty) + food.qty,price:action.price + food.price}
               }
               return arr
        })
        return arr
       }
       if(action.type === "DROP"){
        let empArray=[];
        return empArray;
       }

       return state;

}

/////////////////////////////////////////////
//for add to cart functionality

export const CartProvider=({children})=>{

    const[state,dispatch]=useReducer(reducer,[]);
    return(
<CartDispatchContext.Provider value={dispatch}>
<CartStateContext.Provider value={state}>
    {children}
</CartStateContext.Provider>
</CartDispatchContext.Provider>
)
}

export const useCart =()=> useContext(CartStateContext);
export const useDispatchCart =()=> useContext(CartDispatchContext);