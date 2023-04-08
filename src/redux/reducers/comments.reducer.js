import {
    COMMENTS_DETAILS_FAIL,
    COMMENTS_DETAILS_REQUEST,
    COMMENTS_DETAILS_SUCCESS,
 }  from "../actionsTypes"
 
 export const commentsDetailsReducer = (
    state = {
       loading: true,
       comments: null,
  
    },
    action
 ) => {
    const { payload, type } = action
 
    switch (type) {
       case COMMENTS_DETAILS_REQUEST:
          return {
             ...state,
             loading: true,
          }
       case COMMENTS_DETAILS_SUCCESS:
          return {
             ...state,
             comments: payload,
             loading: false,
          }
       case COMMENTS_DETAILS_FAIL:
          return {
             ...state,
             comments: [],
             loading: false,
             error: payload,
          }
       default:
          return state
    }
}