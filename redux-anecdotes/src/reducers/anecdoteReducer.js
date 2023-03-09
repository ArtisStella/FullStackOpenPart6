import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      let anecdoteToVote = state.find((a) => a.id === action.payload);
      anecdoteToVote.votes += 1;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;


export const InitializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}


export const CreateAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  }
}

export const VoteAnecdote = anecdote => {
  return async dispatch => {
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.vote(anecdote);
    dispatch(voteAnecdote(anecdote.id));
  }
}

export default anecdoteSlice.reducer;
