import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterRecuder";

const Filter = () => {
  const dispatch = useDispatch();

  const changeFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      Filter
      <input onChange={changeFilter} />
    </div>
  );
};

export default Filter;
