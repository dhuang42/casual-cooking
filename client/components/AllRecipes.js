import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchRecipes, destroyRecipe} from '../store/recipes'
import {destroyIngredientsForRecipe} from '../store/ingredients'

//! turn into cards

//! delete button should live somewhere else
// maybe in the future list of user's own recipes
// or inside the SingleRecipe component (need a way to redirect to different page after deleting, tho)
// should only be visible to the user who owns that recipe

//! delete button needs to also delete the steps, ingredients, etc associated w/ the recipe

export class AllRecipes extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.getRecipes()
  }

  render() {
    console.log('props', this.props)
    const {recipes} = this.props
    return (
      <div id="all-recipes">
        <h1>All Recipes</h1>
        {!recipes[0] && <div>No Recipes</div>}
        <div className="recipes-container">
          {recipes.map(recipe => (
            <div className="card" key={recipe.id}>
              <Link to={`recipes/${recipe.id}`}>
                <h2>{recipe.name}</h2>
              </Link>
              <button
                type="button"
                onClick={() => {
                  this.props.deleteIngredients(recipe.id)
                  this.props.deleteRecipe(recipe.id)
                }}
              >
                Delete This Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  recipes: state.recipes
})

const mapDispatch = dispatch => ({
  getRecipes: () => dispatch(fetchRecipes()),
  deleteRecipe: id => dispatch(destroyRecipe(id)),
  deleteIngredients: id => dispatch(destroyIngredientsForRecipe(id))
})

export default connect(mapState, mapDispatch)(AllRecipes)
