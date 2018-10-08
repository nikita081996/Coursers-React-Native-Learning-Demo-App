import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch =>
  fetch(`${baseUrl}comments`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(`Error : ${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentFailed(error)));

export const commentFailed = errorMessage => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errorMessage
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const postComment = comment => dispatch => {
  setTimeout(() => {
    dispatch(concatComment(comment));
  }, 200);
};

export const concatComment = comment => ({
  type: ActionTypes.POST_COMMENT,
  payload: comment
});

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());
  return fetch(`${baseUrl}dishes`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(`Error : ${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
  payload: null
});

export const dishesFailed = errorMessage => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errorMessage
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());
  return fetch(`${baseUrl}promotions`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(`Error : ${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
  payload: null
});

export const promosFailed = errorMessage => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errorMessage
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading());
  return fetch(`${baseUrl}leaders`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(`Error : ${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
  payload: null
});

export const leadersFailed = errorMessage => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errorMessage
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const postFavorite = dishId => dispatch => {
  setTimeout(() => {
    dispatch(addFavorite(dishId));
  }, 200);
};

export const addFavorite = dishId => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
});

export const deleteFavorite = dishId => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId
});
