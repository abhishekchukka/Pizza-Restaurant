import { Link, useNavigate } from 'react-router-dom';

function EmptyCart() {
  const navigate=useNavigate();
  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <p className='text-3xl cursor-pointer' onClick={()=>{
        navigate('/menu')
      }}>Your cart is still <span className='text-red-400'>empty</span>. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
