
import {formatCurrency} from '../../utilitites/helpers'
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
// console.log(ingredients)
  return (
    <li>
      <div className='flex justify-between p-3 text-lg'>
        <p>
          <span className='font-semibold '>{quantity}&times;</span> {name}
         {  !isLoadingIngredients ? <p className='opacity-75'>{ingredients.join(' ,')}</p>: <p>Loading menu...</p>}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
       
      </div>
    </li>
  );  
}

export default OrderItem;
