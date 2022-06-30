import axios from 'axios'

const initialState = []

// action types
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const ADD_RECIPE = 'ADD_RECIPE'

// action creators
const getAllRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
})

const addRecipe = recipe => ({
  type: ADD_RECIPE,
  recipe
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
  return async dispatch => {
    try {
      const {data: recipe} = await axios.post('/api/recipes', createdRecipe)
      dispatch(addRecipe(recipe))
    } catch (err) {
      console.log('failed to post new recipe', err)
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
    default:
      return state
  }
}

export default recipeReducer
