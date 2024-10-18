import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[
    ],

}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action){
            //payload=newItem
        
            state.cart.push(action.payload);
        },

        deleteItem(state,action){
            //payload=pizzaId
            state.cart=state.cart.filter((item)=>item.pizzaId!==action.payload);

        },
        increaseItemQuantity(state,action){
            //payload=pizzaId
            const item=state.cart.find((item)=>item.pizzaId===action.payload)
            item.quantity++;
            item.totalPrice=item.quantity*item.unitPrice;
        },
        decreaseItemQuantity(state,action){

            //payload=pizzaId
            const item=state.cart.find((item)=>item.pizzaId===action.payload)
            item.quantity--;
            if(item.quantity==0){
                cartSlice.caseReducers.deleteItem(state,action);
            }
            item.totalPrice=item.quantity*item.unitPrice;
        },
        clearCart(state,action){
            state.cart=[];
        },
    }
    
});

export const {addItem,deleteItem,increaseItemQuantity,decreaseItemQuantity,clearCart} =cartSlice.actions;
export default cartSlice.reducer;
export function itemNumbers(cart){
    var ItemsQuantity=0;
  
  cart.forEach(pizza => {
    ItemsQuantity+=pizza.quantity;
    
  });
  return ItemsQuantity
}
export function itemPrice(cart){
    var totalPricePizzas=0;
  
  cart.forEach(pizza => {
    
    totalPricePizzas+=pizza.totalPrice;
    
  });
  return totalPricePizzas
}
export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;