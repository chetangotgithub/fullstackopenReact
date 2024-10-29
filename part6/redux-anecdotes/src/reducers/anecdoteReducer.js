import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
console.log(initialState);

const reducer1 = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    addVote(state, action) {
      console.log("Activation of reducer 1");
      const id = action.payload.id;
      const obj = state.filter((obj) => {
        return obj.id === id;
      })[0];

      const newState = {
        ...obj,
        votes: obj.votes + 1,
      };

      console.log(
        "Inside reducer1",
        state.map((obj) => {
          return obj.id !== id ? obj : newState;
        })
      );
      return state.map((obj) => {
        return obj.id !== id ? obj : newState;
      });
    },
  },
});

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.payload.id;
      const obj = state.filter((obj) => {
        return obj.id === id;
      })[0];

      const newState = {
        ...obj,
        votes: obj.votes + 1,
      };

      console.log(
        state.map((obj) => {
          return obj.id !== id ? obj : newState;
        })
      );
      return state.map((obj) => {
        return obj.id !== id ? obj : newState;
      });
    case "NEW_NOTE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const filterReducer = (state = initialState, action) => {
  console.log("state now: filterReducer ", state);
  console.log("action filterReducer", action);
  switch (action.type) {
    case "FILTER":
      return state.filter((note) => {
        return note.content.includes(action.payload);
      });
    default:
      return state;
  }
};

export const { addVote } = reducer1.actions;
export default reducer;
