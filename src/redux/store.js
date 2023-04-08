import { createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
   getHomePageVideosReducer,
   relatedVideoReducer,
   selectedVideoReducer,searchVideoReducer

} from './reducers/videos.reducer'

import {channelDetailsReducer
 } from './reducers/channel.reducer'
import { commentsDetailsReducer,  } from './reducers/comments.reducer'
import {channelVideosReducer} from './reducers/videos.reducer'

const rootReducer = combineReducers({
  
   homeVideos: getHomePageVideosReducer,
   selectedVideos:selectedVideoReducer,
   channelDetails:channelDetailsReducer,
   commentDetails:commentsDetailsReducer,
   relatedVideos: relatedVideoReducer,
   searchVideos:searchVideoReducer,
   channelVideos:channelVideosReducer,

})

const store = createStore(
   rootReducer,
   {},
   composeWithDevTools(applyMiddleware(thunk))
)

export default store