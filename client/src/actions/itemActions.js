import axios from 'axios';
import { GET_ITEMS, DROP_COLLECTION, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios  
    .get("/api/tracks")
    .then(res =>
      dispatch({
          type: GET_ITEMS,
          payload: res.data
      })
    );
};

export const dropCollection = () => dispatch => {
  axios.drop().then(res =>
    dispatch({
      type: DROP_COLLECTION
      // payload: id
    })
  );
};

export const deleteItem = (id) => dispatch => {
  axios.delete(`/api/tracks/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const addItem = (item) => dispatch => {
  axios
    .post("/api/tracks", item)
    .then(res =>
      dispatch({
          type: ADD_ITEM,
          payload: res.data
      })
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};