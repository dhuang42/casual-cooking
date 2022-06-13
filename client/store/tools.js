import axios from 'axios'

const initialState = []

// action types
const GET_TOOLS_FOR_RECIPE = 'GET_TOOLS_FOR_RECIPE'

// action creators
const getTools = tools => ({
  type: GET_TOOLS_FOR_RECIPE,
  tools
})

// thunks
export const fetchToolsForRecipe = recipeId => {
  return async dispatch => {
    try {
      const {data: tools} = await axios.get(`/api/tools/recipes/${recipeId}`)
      dispatch(getTools(tools))
    } catch (err) {
      console.log('failed to fetch tools from server', err)
    }
  }
}

// reducer
const toolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOOLS_FOR_RECIPE:
      return action.tools
    default:
      return state
  }
}

export default toolsReducer
