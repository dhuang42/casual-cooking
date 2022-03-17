import axios from 'axios'

const initialState = []

// action types
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'

// action creators
const getAllRecipes = recipes => ({
  type: 'GET_ALL_RECIPES'
})

//thunks

export const fetchRecipes = () => {
  return async dispatch => {
    try {
      const {data: recipes} = await axios.get('/api/recipes')
      dispatch(getAllRecipes(recipes))
    } catch (err) {
      console.log('failed to fetch recipes', err)
    }
  }
}
