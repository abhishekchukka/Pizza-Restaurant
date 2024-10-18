import { useState } from "react";

import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, itemPrice } from "../cart/cartSlice";
// import { fetchAddress } from "../user/userSlice";
import store from "../../store"
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  
  const cart = useSelector(state=>state.cart.cart);
  // const username=useSelector(state=>state.user.username);
  
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const error = useActionData();
  const priorityPrice=withPriority?0.2*itemPrice(cart):0;
 const totalPrice= priorityPrice+itemPrice(cart);
 const {
  username,
  status:addressStatus,
  position,address,error:errorAddress
 }  = useSelector(state=>state.user);

 const positionLoading=addressStatus==='loading';

 const dispatcher=useDispatch();
  
  return (
    <div className="text-xl mt-10 space-y-5 min-w-full flex justify-center overflow-hidden">
      <div>
        <h2>
          <span className="text-yellow-300 font-bold mb-2 text-center text-5xl">
            Ready to order?
          </span>{" "}
          Lets go!
        </h2>

        <Form method="POST" className="space-y-5 z-30 ">
          <div className="flex flex-col">
            <label className="">First Name</label>
            <input

              type="text"
              name="customer"
              defaultValue={username}
              className="input-primary w-fit"
             
              required
            />
          </div>

          <div>
            <label>Phone number</label>
            <div>
              <input
                type="tel"
                name="phone"
                className="input-primary"
                required
              />
              {error && <p className="bg-red-400 text-red-700">{error.message}</p>}
            </div>
          </div>

          <div>
            <label>Address</label>
            <div>
              <textarea
                type=""
                name="address"
                className="input-primary w-96 h-32 text-lg"
                defaultValue={address}
                required
              />
              {!position.latitude && !position.longitude &&<button disabled={positionLoading} className='btn-primary mt-2' onClick={(e)=>{
                e.preventDefault();
                dispatcher(fetchAddress());}}>position</button>}
        {errorAddress && <span className="p-2 bg-red-400 rounded-3xl ">{errorAddress}</span>}
            </div>
          </div>

          <div>
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="h-6 w-6 accent-yellow-400 focus:ring-offset-2 focus:ring-black mr-1"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <label htmlFor="priority">
              Want to give your order priority?
            </label>
          </div>

          <div>
            <button disabled={isLoading} className="btn-primary">
              {isLoading ? "Creating Order ..." : `Order now for $ ${totalPrice}`}
            </button>
          </div>
        </Form>
        </div>
      <img
        src="/src/ui/delivery-guy-1424808_1280.png"
        alt="safqwf"
        className="cart-movement  overflow-hidden  max-h-96 absolute -z-50 bottom-5 right-0"
      />
    </div>
  );
}

export default CreateOrder;
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
console.log(data);
  const object = {
    ...data,
    cart: JSON.parse(data.cart),
    
  };

  const error = {};
  if (!isValidPhone(object.phone)) {
    error.message = "Please enter correct phone number";
  }
  if (Object.keys(error).length > 0) {
    return error;
  }
  const newObject = await createOrder(object);
  store.dispatch(clearCart());


  return redirect(`/order/${newObject.id}`);
}
