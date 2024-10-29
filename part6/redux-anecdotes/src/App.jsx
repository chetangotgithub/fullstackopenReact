import { useSelector, useDispatch } from "react-redux";
import reducer, { asObject } from "./reducers/anecdoteReducer";
import { addVote } from "./reducers/anecdoteReducer";
import { increment, decrement } from "./counter/counterSlice";

const App = () => {
  const anecdotes = useSelector((state) => state.notes);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const vote = (id) => {
    const objState = anecdotes.filter((obj) => {
      return obj.id === id;
    });
    console.log("objState ", objState);
    dispatch(addVote(objState[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Create a FormData object
    const noteValue = formData.get("note");

    dispatch({
      type: "NEW_NOTE",
      payload: asObject(noteValue),
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch({
      type: "FILTER",
      payload: e.target.filter.value,
    });
    console.log("Filtering");
  };

  return (
    <div>
      {/* <div>
        <form on onSubmit={handleFilter}>
          <input name="filter" />
          <button type="submit">Filter</button>
        </form>
      </div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form> */}

      <div>
        {count}
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </div>
  );
};

export default App;
