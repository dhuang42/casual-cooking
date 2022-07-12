import axios from 'axios'

const initialState = []

// action types
const GET_INGREDIENTS_FOR_RECIPE = 'GET_INGREDIENTS_FOR_RECIPE'
const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS'

// action creators
const getIngredients = ingredients => ({
  type: GET_INGREDIENTS_FOR_RECIPE,
  ingredients
})

const deleteIngredients = recipeId => ({
  type: DELETE_INGREDIENTS,
  recipeId
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

export const destroyIngredientsForRecipe = recipeId => {
  return async dispatch => {
    try {
      await axios.delete(`api/ingredients/recipes/${recipeId}`)

      dispatch(deleteIngredients(recipeId))
    } catch (err) {
      console.log('failed to delete ingredients', err)
    }
  }
}

// reducer
const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_FOR_RECIPE:
      return action.ingredients
    case DELETE_INGREDIENTS:
      // return the ingredients whose recipeId does not match the recipe we're deleting
      return state.filter(ingredient => ingredient.recipeId !== action.recipeId)
    default:
      return state
  }
}

export default ingredientsReducer
