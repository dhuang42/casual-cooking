import React from 'react'
import {connect} from 'react-redux'
import {postRecipe} from '../store/recipes'
import RecipeForm from './RecipeForm'

const defaultState = {
  name: '',
  description: ''
}

class NewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('new change', event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()

    let {name, description} = this.state
    this.props.createRecipe({name, description})
    this.setState(defaultState)
  }

  render() {
    return (
      <RecipeForm
        name={this.state.name}
        description={this.state.description}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  createRecipe: createdRecipe => dispatch(postRecipe(createdRecipe))
})

export default connect(null, mapDispatch)(NewRecipe)
