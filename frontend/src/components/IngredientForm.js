import React, { useState } from 'react';
import './style/IngredientForm.css'; // Estilos customizados

const IngredientForm = () => {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  return (
    <div className="ingredient-form-container">
      <h2>Ingredientes <span>Peso</span></h2>
      {ingredients.map((ingredient, index) => (
        <div className="ingredient-row" key={index}>
          <input
            type="text"
            placeholder="Escreva aqui..."
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            className="ingredient-input"
          />
          <input
            type="number"
            placeholder="0"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            className="quantity-input"
          />
        </div>
      ))}
      <button className="add-ingredient-btn" onClick={handleAddIngredient}>
        Adicionar ingrediente <span>+</span>
      </button>
    </div>
  );
};

export default IngredientForm;
