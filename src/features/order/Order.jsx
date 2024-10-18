// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilitites/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../user/userSlice";
import store from "../../store";
// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
 const fetcher= useFetcher();

 const name=useSelector(state=>state.user.username);
 useEffect(
  function(){
    if(!fetcher.data && fetcher.state==='idle')
    fetcher.load("/menu");
  },
  [fetcher]
 )
  // console.log(fetcher);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="p-5 flex flex-col justify-between">
      <div>
      <div className="flex justify-between  items-center  ">
        <h2 className="text-3xl">{name}'s Order # <span className="font-semibold text-slate-600">{id}</span> Status</h2>

        <div className="flex items-center  justify-between space-x-3">
          {priority && <span className="bg-red-600 p-2 rounded-3xl">Priority</span>}
          <span className="bg-green-400 p-2 rounded-3xl text-nowrap ">{status} order</span>
        </div>
      </div>

      <div className="mt-5 text-xl flex justify-evenly space-x-2 bg-stone-100 p-3 rounded-lg">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className=" divide-y-2 divide-stone-400 my-3 border-b-2 border-stone-400 border-t ">
        {cart.map(item=><OrderItem item={item} key={item.id} ingredients={fetcher.data?.find(el=>item.pizzaId===el.id)?.ingredients ?? []} isLoadingIngredients={fetcher.state==='loading'}></OrderItem>)}
      </ul>
      
      </div>

      <div className="flex p-3  flex-col bg-stone-100 text-xl space-y-2 mt-3 ">
        <p className='text-lg'>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-xl">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-2xl">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      <div>
        <fetcher.Form method="PATCH">
        <button className="btn-primary">Click to Prioritise Order</button>
        {/* <input type="text" placeholder="edit name" name="name" /> */}
        </fetcher.Form>
      </div>
    </div>
  );
}

export default Order;
export async function loader({ params }) {
  const pizza = await getOrder(params.orderId);
  return pizza;
}


export async function action({request,params}){
  
  const formData=await request.formData();
  // console.log(formData.get("name"));
  const name=formData.get("name");
  
  const data={priority:true};
  
  console.log(params);
  await updateOrder(params.orderId,data);
  return null;
}