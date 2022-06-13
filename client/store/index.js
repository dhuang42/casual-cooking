import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import recipes from './recipes'
import singleRecipe from './singleRecipe'
import ingredients from './ingredients'
import tools from './tools'
import steps from './steps'

const reducer = combineReducers({
  user,
  recipes,
  singleRecipe,
  ingredients,
  tools,
  steps
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
