import React from "react";
import { useDispatch } from "react-redux";
import { CreateAnecdote } from "../reducers/anecdoteReducer";
import { SetNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();
  
  const createNew = async (event) => {
    event.preventDefault();
    let anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(CreateAnecdote(anecdote));
    dispatch(SetNotification("Added anecdote:" + anecdote, 3));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
