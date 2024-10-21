import React, { useState } from 'react';
import './style/IngredientForm.css';

export default function Calculator() {
  const [listIngredients, setListIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({ name: '', quantity: undefined });
  const [editingId, setEditingId] = useState(null);
  const [animatedText, setAnimatedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Validação do ingrediente
  const validateIngredient = (ingredient) => {
    if (/\d/.test(ingredient.name)) {
      alert('O nome do ingrediente não pode conter números');
      return false;
    } else if (ingredient.quantity < 0) {
      alert('A quantidade do ingrediente não pode ser negativa');
      return false;
    } else if (/^-?\d+$/.test(ingredient.quantity) === false) {
      alert('A quantidade do ingrediente deve ser um número inteiro');
      return false;
    }
    return true;
  };

  // Função para simular digitação no campo ao focar
  const simulateTyping = () => {
    const text = 'Digite aqui o ingrediente ...';
    let index = 0;
    setIsTyping(true);

    const type = () => {
      if (index < text.length) {
        setAnimatedText((prev) => prev + text[index]);
        index++;
        setTimeout(type, 50);
      } else {
        setIsTyping(false);
      }
    };

    setAnimatedText('');
    type();
  };

  // Adicionar ou atualizar ingrediente
  const handleIngredient = () => {
    if (ingredient.name && ingredient.quantity > 0 && validateIngredient(ingredient)) {
      if (editingId !== null) {
        const updatedIngredients = listIngredients.map((ing, index) =>
          index === editingId ? { name: ingredient.name, quantity: ingredient.quantity } : ing
        );
        setListIngredients(updatedIngredients);
        setEditingId(null);
      } else {
        setListIngredients([...listIngredients, { name: ingredient.name, quantity: ingredient.quantity }]);
      }
      setIngredient({ name: '', quantity: undefined }); // Limpa o formulário
    }
  };

  // Editar ingrediente
  const handleEdit = (element, index) => {
    setIngredient({ name: element.name, quantity: element.quantity });
    setEditingId(index);
  };

  // Remover ingrediente
  const handleRemove = (index) => {
    setListIngredients(listIngredients.filter((_, i) => i !== index));
  };

  return (
    <div id="IngredientForm" className="calculadora-section">
      <h1 className="calculator-title">Calculadora</h1>

      {listIngredients.length > 0 && (
        listIngredients.map((ingredient, index) => (
          <div key={index}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>{ingredient.name}</div>
              <div>{ingredient.quantity} gramas</div>
            </div>
            <div>
              <button onClick={() => handleEdit(ingredient, index)}>Editar</button>
              <button onClick={() => handleRemove(index)}>Remover</button>
            </div>
          </div>
        ))
      )}

      <div className="inputs">
        <input
          type="text"
          className="ingredient-input"
          placeholder={isTyping ? animatedText : "Digite aqui o ingrediente ..."}
          value={ingredient.name}
          required
          onClick={simulateTyping}
          onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Digite o peso em gramas ..."
          value={ingredient.quantity}
          required
          onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })}
        />
      </div>
      <button onClick={handleIngredient}>
        {editingId !== null ? 'Atualizar ingrediente' : 'Adicionar ingrediente'}
      </button>
    </div>
  );
}
