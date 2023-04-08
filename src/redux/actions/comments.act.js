import { COMMENTS_DETAILS_FAIL, COMMENTS_DETAILS_REQUEST, COMMENTS_DETAILS_SUCCESS } from "../actionsTypes"
import request from "../../api"

export const getCommentsDetails = id => async dispatch => {
    try {
       dispatch({
          type: COMMENTS_DETAILS_REQUEST,
       })
 
       const { data } = await request('/commentThreads', {
          params: {
             part: 'snippet',
             videoId:id,
             maxResults:'60'
          },
       })
       dispatch({
          type: COMMENTS_DETAILS_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.response.data)
       dispatch({
          type: COMMENTS_DETAILS_FAIL,
          payload: error.response.data,
       })
    }
 }