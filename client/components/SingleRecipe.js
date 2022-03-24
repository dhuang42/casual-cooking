import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleRecipe} from '../store/singleRecipe'

export class SingleRecipe extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    await this.props.getRecipe(recipeId)
  }

  render() {
    const {recipe} = this.props
    if (!recipe) return <h1>Loading Recipe</h1>
    return !recipe.name ? (
      <h1>Loading Recipe</h1>
    ) : (
      <div className="single-recipe-view-container">
        <h1 className="recipe-name">{recipe.name}</h1>
      </div>
    )
  }
}

const mapState = state => ({
  recipe: state.SingleRecipe
})

const mapDispatch = dispatch => ({
  getRecipe: id => dispatch(fetchSingleRecipe(id))
})

export default connect(mapState, mapDispatch)(SingleRecipe)
