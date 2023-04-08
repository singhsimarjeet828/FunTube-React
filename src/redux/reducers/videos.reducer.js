import { CLICKED_VIDEO_FAIL, CLICKED_VIDEO_FETCH, CLICKED_VIDEO_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST,SEARCH_VIDEO_FAIL,SEARCH_VIDEO_SUCCESS,SEARCH_VIDEO_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, CHANNEL_VIDEOS_FAIL,CHANNEL_VIDEOS_SUCCESS,CHANNEL_VIDEOS_REQUEST } from "../actionsTypes"
 

export const getHomePageVideosReducer = (
   state = {
      videos: [],
      loading: false,
      nextPageToken: null,
      activeCategory: 'All',
   },
   action
) => {
   const { type, payload } = action

   switch (type) {
      case HOME_VIDEOS_SUCCESS:
         return {
            ...state,
            
            videos:
               state.activeCategory === payload.category  
                  ? [...state.videos, ...payload.videos]
                  : payload.videos,
                 

               

                  // if(state.activeCategory === payload.category){
                  //    [...state.videos, ...payload.videos]
                  // }

            loading: false,
            nextPageToken: payload.nextPageToken,
            activeCategory: payload.category,
         }

      case HOME_VIDEOS_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      case HOME_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      default:
         return state
   }
}

export const selectedVideoReducer = ( state = {
loading:true,
video:null,

},action)=>{

   const { payload, type } = action
   switch (type) {
      case CLICKED_VIDEO_FETCH:
         return {
            ...state,
            loading: true,
         }
      case CLICKED_VIDEO_SUCCESS:
         return {
            ...state,
            video: payload,
            loading: false,
         }
      case CLICKED_VIDEO_FAIL:
         return {
            ...state,
            video: null,
            loading: false,
            error: payload,
         }

      default:
         return state
   }

}
export const relatedVideoReducer = (
   state = {
      loading: true,
      videos: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case RELATED_VIDEO_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case RELATED_VIDEO_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
         }
      case RELATED_VIDEO_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}

export const searchVideoReducer = (
   state = {
      loading: true,
      videos: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case SEARCH_VIDEO_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case SEARCH_VIDEO_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
         }
      case SEARCH_VIDEO_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}

export const channelVideosReducer = (
   state = {
      loading: true,
      videos: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case CHANNEL_VIDEOS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case CHANNEL_VIDEOS_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
         }
      case CHANNEL_VIDEOS_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}