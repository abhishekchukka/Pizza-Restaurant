import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="flex gap-3 w-screen justify-center items-center flex-wrap overflow-y-scroll">
      {menu.map((element) => (
        <li key={element.id}>
          <MenuItem pizza={element} />
        </li>
      ))}
    </ul>
  );
}
export async function loader() {
  const data = await getMenu();
  return data;
}
export default Menu;
