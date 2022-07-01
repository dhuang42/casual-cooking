import React from 'react'

const RecipeForm = props => {
  return (
    <div className="recipe-form-container">
      <h1>Recipe Info</h1>
      <form className="recipe-form" onSubmit={props.handleSubmit}>
        <label htmlFor="name">Recipe Name *</label>
        <input
          name="name"
          type="text"
          onChange={props.handleChange}
          value={props.name}
          required="required"
        />

        <label htmlFor="description">Description *</label>
        <textarea
          rows="3"
          name="description"
          type="text"
          onChange={props.handleChange}
          value={props.description}
          required="required"
        />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  )
}

export default RecipeForm
