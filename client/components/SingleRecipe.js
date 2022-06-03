import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleRecipe} from '../store/singleRecipe'
import {fetchIngredientsForRecipe} from '../store/ingredients'

export class SingleRecipe extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    await this.props.getRecipe(recipeId)
    await this.props.getIngredients(recipeId)
  }

  render() {
    const {recipe, ingredients} = this.props
    if (!recipe) return <h2>Loading Recipe</h2>
    return !recipe.name ? (
      <h1>Loading Recipe</h1>
    ) : (
      <div className="single-recipe-view-container">
        <h1 className="recipe-name">{recipe.name}</h1>
        <p className="recipe-description">{recipe.description}</p>
        <h2>Ingredients</h2>
        {!ingredients[0] && <div>No Ingredients</div>}
        <div className="ingredients-container">
          {ingredients.map(ingredient => (
            <p className="ingredient-item" key={ingredient.id}>
              {ingredient.quantity && ingredient.quantity}{' '}
              {ingredient.unit && ingredient.unit} {ingredient.name}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  recipe: state.singleRecipe,
  ingredients: state.ingredients
})

const mapDispatch = dispatch => ({
  getRecipe: id => dispatch(fetchSingleRecipe(id)),
  getIngredients: id => dispatch(fetchIngredientsForRecipe(id))
})

export default connect(mapState, mapDispatch)(SingleRecipe)
