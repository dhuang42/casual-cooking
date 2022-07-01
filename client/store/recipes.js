import axios from 'axios'

const initialState = []

// action types
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const ADD_RECIPE = 'ADD_RECIPE'
const DELETE_RECIPE = 'DELETE_RECIPE'

// action creators
const getAllRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
})

const addRecipe = recipe => ({
  type: ADD_RECIPE,
  recipe
})

const deleteRecipe = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
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

export const postRecipe = createdRecipe => {
  console.log('created recipe', createdRecipe)

  return async dispatch => {
    try {
      const {data: recipe} = await axios.post('/api/recipes', createdRecipe)
      dispatch(addRecipe(recipe))
    } catch (err) {
      console.log('failed to post new recipe', err)
    }
  }
}

export const destroyRecipe = recipeId => {
  return async dispatch => {
    try {
      await axios.delete(`api/recipes/${recipeId}`)
      dispatch(deleteRecipe(recipeId))
    } catch (err) {
      console.log('failed to delete the recipe', err)
    }
  }
}

// reducer
const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return action.recipes
    case ADD_RECIPE:
      return [...state, action.recipe]
    case DELETE_RECIPE:
      return state.filter(recipe => recipe.id !== action.recipeId)
    default:
      return state
  }
}

export default recipeReducer
