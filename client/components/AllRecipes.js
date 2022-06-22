import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchRecipes} from '../store/recipes'

//! turn into cards
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
  getRecipes: () => dispatch(fetchRecipes())
})

export default connect(mapState, mapDispatch)(AllRecipes)
