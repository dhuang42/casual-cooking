import axios from 'axios'

const initialState = []

// action types
const GET_STEPS_FOR_RECIPE = 'GET_STEPS_FOR_RECIPE'

// action creators
const getSteps = steps => ({
  type: GET_STEPS_FOR_RECIPE,
  steps
})

// thunks
export const fetchStepsForRecipe = recipeId => {
  return async dispatch => {
    try {
      const {data: steps} = await axios.get(`/api/steps/recipe/${recipeId}`)
      dispatch(getSteps(steps))
    } catch (err) {
      console.log('failed to fetch steps from server', err)
    }
  }
}

// reducer
const stepsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STEPS_FOR_RECIPE:
      return action.steps
    default:
      return state
  }
}

export default stepsReducer
