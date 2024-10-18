
import { useSelector } from 'react-redux';

const Username = () => {
    const username=useSelector(state=>state.username);
    console.log(username);
    return (
    <div>
      {username}
    </div>
  )
}

export default Username
