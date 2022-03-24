import axios from 'axios'

const initialState = []

// action types
const GET_SINGLE_RECIPE = 'GET_SINGLE_RECIPE'

// action creators
export const getSingleRecipe = recipe => ({
  type: GET_SINGLE_RECIPE,
  recipe
})

// thunks
export const fetchSingleRecipe = id => {
  return async dispatch => {
    try {
      const {data: recipe} = await axios.get(`/api/recipes/${id}`)
      dispatch(getSingleRecipe(recipe))
    } catch (err) {
      console.log('failed to fetch recipe from server', err)
    }
  }
}

// reducer
const singleRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE:
      return action.recipe
    default:
      return state
  }
}

export default singleRecipeReducer
