import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleRecipe} from '../store/singleRecipe'
import {fetchIngredientsForRecipe} from '../store/ingredients'
import {fetchToolsForRecipe} from '../store/tools'
import {fetchStepsForRecipe} from '../store/steps'

export class SingleRecipe extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    await this.props.getRecipe(recipeId)
    await this.props.getIngredients(recipeId)
    await this.props.getTools(recipeId)
    await this.props.getSteps(recipeId)
    console.log('props', this.props)
  }

  render() {
    const {recipe, ingredients, tools, steps} = this.props

    if (!recipe) return <h2>Loading Recipe</h2>
    return !recipe.name ? (
      <h1>Loading Recipe</h1>
    ) : (
      <div className="single-recipe-view-container">
        <div className="recipe-info-container">
          <h1 className="recipe-name">{recipe.name}</h1>
          <img
            className="recipe-image"
            src={recipe.imageUrl}
            alt={`image of ${recipe.name}`}
            width="400"
            height="auto"
          />
          <p className="recipe-description">{recipe.description}</p>
          {recipe.time && (
            <p className="recipe-time">
              <strong>Time:</strong> {recipe.time} minutes
            </p>
          )}
          {recipe.serves && (
            <p className="recipe-servings">
              <strong>Serves:</strong> {recipe.serves}
            </p>
          )}
          {recipe.yieldQty &&
            recipe.yieldUnit && (
              <p className="recipe-yield">
                <strong>Yield:</strong> {recipe.yieldQty} {recipe.yieldUnit}
              </p>
            )}
        </div>
        {!ingredients ? (
          <div>No Ingredients</div>
        ) : (
          <div className="ingredients-container">
            <h2 className="ingredients-heading">Ingredients</h2>
            <div className="ingredients-list-container">
              {ingredients.map(ingredient => (
                <p className="ingredient-item" key={ingredient.id}>
                  {ingredient.quantity && ingredient.quantity}{' '}
                  {ingredient.unit && ingredient.unit} {ingredient.name}
                </p>
              ))}
            </div>
          </div>
        )}
        {/* only render this div if there are tools */}
        {tools[0] && (
          <div className="tools-container">
            <h2 className="equipment-heading">Equipment Needed</h2>
            <div className="tools-list-container">
              {tools.map(tool => (
                <p className="tool-item" key={tool.id}>
                  {tool.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {!steps ? (
          <div>No Steps</div>
        ) : (
          <div className="steps-container">
            <h2 className="steps-heading">Steps</h2>
            <div className="steps-list-container">
              {steps.map(step => (
                <p className="step-item" key={step.id}>
                  Step {step.place}: {step.instructions}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  recipe: state.singleRecipe,
  ingredients: state.ingredients,
  tools: state.tools,
  steps: state.steps
})

const mapDispatch = dispatch => ({
  getRecipe: id => dispatch(fetchSingleRecipe(id)),
  getIngredients: id => dispatch(fetchIngredientsForRecipe(id)),
  getTools: id => dispatch(fetchToolsForRecipe(id)),
  getSteps: id => dispatch(fetchStepsForRecipe(id))
})

export default connect(mapState, mapDispatch)(SingleRecipe)
