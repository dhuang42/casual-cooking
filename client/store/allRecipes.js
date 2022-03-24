import axios from 'axios'

const initialState = []

// action types
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'

// action creators
const getAllRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
})

// thunks
export const fetchRecipes = () => {
  return async dispatch => {
    try {
      const {data: recipes} = await axios.get('/api/recipes')
      dispatch(getAllRecipes(recipes))
    } catch (err) {
      console.log('failed to fetch recipes from server', err)
    }
  }
}

// reducer
const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export default recipeReducer
