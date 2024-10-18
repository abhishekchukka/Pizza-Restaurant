import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateName } from "./userSlice";
import { useDispatch } from "react-redux";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault(); // Ensure default behavior is prevented first

    if (!username) return;

    // Dispatch action first
    dispatch(updateName(username));

    // Navigate after dispatch
    navigate("/menu");

    // Optionally clear the form field
    setUsername('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-2xl">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-10 mt-5 shadow-sm border-solid focus:ring-2 focus:w-60 focus:ring-yellow-300 shadow-amber-300 focus:outline-none rounded-md pl-1"
      />

      {username !== "" && (
        <div>
          <button
            className="btn-primary mt-4"
            type="submit" // Make sure button type is submit
          >
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
