import axios from 'axios'

const initialState = []

// action types
const GET_INGREDIENTS_FOR_RECIPE = 'GET_INGREDIENTS_FOR_RECIPE'

// action creators
const getIngredients = ingredients => ({
  type: GET_INGREDIENTS_FOR_RECIPE,
  ingredients
})

// thunks
export const fetchIngredientsForRecipe = recipeId => {
  return async dispatch => {
    try {
      const {data: ingredients} = await axios.get(
        `/api/ingredients/recipes/${recipeId}`
      )
      dispatch(getIngredients(ingredients))
    } catch (err) {
      console.log('failed to fetch ingredients from server', err)
    }
  }
}

// reducer
const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_FOR_RECIPE:
      return action.ingredients
    default:
      return state
  }
}

export default ingredientsReducer
