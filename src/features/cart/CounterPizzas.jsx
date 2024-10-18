import { useDispatch, useSelector } from "react-redux"
import { decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity } from "./cartSlice";


function CounterPizzas({id}) {
    const cart=useSelector((state=>state.cart.cart));

    const currentQuantity = useSelector(getCurrentQuantityById(id));
    const dispatch=useDispatch();
  function handleIncrease()
  {
    dispatch(increaseItemQuantity(id));
  }
  function handleDecrease(){
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <div className="flex gap-1 md:gap-3 justify-center items-center ">
      <button className='btn-primary p-2 h-auto' onClick={()=>handleDecrease()}>-</button>
      <span>{currentQuantity}</span>
      <button className='btn-primary p-2 h-auto' onClick={()=>handleIncrease()}>+</button>
    </div>
  )
}

export default CounterPizzas
