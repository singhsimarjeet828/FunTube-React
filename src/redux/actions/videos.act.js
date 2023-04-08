import { CLICKED_VIDEO_FAIL, CLICKED_VIDEO_FETCH,SEARCH_VIDEO_FAIL,SEARCH_VIDEO_SUCCESS,SEARCH_VIDEO_REQUEST, CLICKED_VIDEO_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, CHANNEL_VIDEOS_FAIL,CHANNEL_VIDEOS_SUCCESS,CHANNEL_VIDEOS_REQUEST} from "../actionsTypes"
import request from "../../api"
export const getHomePageVideos = () => async (dispatch, getState) =>{
   try {
      dispatch({
         type: HOME_VIDEOS_REQUEST,
      })
      const { data } = await request('/videos', {
         params: {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            regionCode: 'IN',
            maxResults: 20,
            pageToken: getState().homeVideos.nextPageToken,
         },
      })

      dispatch({
         type: HOME_VIDEOS_SUCCESS,
         payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: 'All',
         },
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: HOME_VIDEOS_FAIL,
         payload: error.message,
      })
   }
}
export const getVideosByCate = keyword => async (dispatch, getState) => {
   try {
      dispatch({
         type: HOME_VIDEOS_REQUEST,
      })
      const { data } = await request('/search', {
         params: {
            part: 'snippet',

            maxResults: 20,
            pageToken: getState().homeVideos.nextPageToken,
            q: keyword,
            type: 'video',
         },
      })

      dispatch({
         type: HOME_VIDEOS_SUCCESS,
         payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: keyword,
         },
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: HOME_VIDEOS_FAIL,
         payload: error.message,
      })
   }
}

export const getVideoById = id => async dispatch =>{
try {
   dispatch ({
      type:CLICKED_VIDEO_FETCH,
   })

   const { data } = await request('/videos', {
      params: {
         part: 'snippet,statistics',
         id:id
      },
   })
   dispatch({
      type:CLICKED_VIDEO_SUCCESS,
      payload:data.items[0]
   })

} catch  (error){
   console.log(error.message)
   dispatch({
      type: CLICKED_VIDEO_FAIL,
      payload: error.message,
   })}
   

}

export const getRelatedVideos = id => async dispatch => {
   try {
      dispatch({
         type: RELATED_VIDEO_REQUEST,
      })

      const { data } = await request('/search', {
         params: {
            part: 'snippet',
            relatedToVideoId: id,
            maxResults: '20',
            type: 'video',
         },
      })
      dispatch({
         type: RELATED_VIDEO_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data.message)
      dispatch({
         type: RELATED_VIDEO_FAIL,
         payload: error.response.data.message,
      })
   }
}

export const getVideoBySearch = query => async dispatch => {
   try {
      dispatch({
         type: SEARCH_VIDEO_REQUEST,
      })

      const { data } = await request('/search', {
         params: {
            part: 'snippet',
         q:query,
            maxResults:'30',
            type: 'video,channel',
         },
      })
      dispatch({
         type: SEARCH_VIDEO_SUCCESS,
         payload: data.items,
      
      })
   } catch (error) {
      console.log(error.response.data.message)
      dispatch({
         type: SEARCH_VIDEO_FAIL,
         payload: error.response.data.message,
      })
   }
}

export const getVideosByChannel = id => async dispatch => {
   try {
      dispatch({
         type: CHANNEL_VIDEOS_REQUEST,
      })

      // 1. get upload playlist id
      const {
         data: { items },
      } = await request('/channels', {
         params: {
            part: 'contentDetails',
            id: id,
         },
      })
      const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
      // 2. get the videos using the id
      const { data } = await request('/playlistItems', {
         params: {
            part: 'snippet,contentDetails',
            playlistId: uploadPlaylistId,
            maxResults: 30,
         },
      })

      dispatch({
         type: CHANNEL_VIDEOS_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data.message)
      dispatch({
         type: CHANNEL_VIDEOS_FAIL,
         payload: error.response.data,
      })
   }
}