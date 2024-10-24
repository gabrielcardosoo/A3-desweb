import React, { useEffect, useRef, useState } from 'react';
import './style/IngredientForm.css';

export default function Calculator() {
  const [listIngredients, setListIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({ name: '', quantity: undefined });
  const [editingId, setEditingId] = useState(null);
  const [animatedText, setAnimatedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const formImageRef = useRef(null);
  const inputsUpdateFoodsRef = useRef(null);

  useEffect(() => {
    return () => {
      // Libera a URL temporária criada
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
    };
  }, [selectedFile]);

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

  // Adicionar Imagem
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  // Enviar Formulário contendo a imagem
  const handleSubmitFormImage = (event) => {
    event.preventDefault();

    const foods = [
      {
        name: 'Arroz',
        quantity: 100
      },
      {
        name: 'Feijão',
        quantity: 200
      },
      {
        name: 'Carne',
        quantity: 300
      }
    ]

    setListIngredients(foods);

    formImageRef.current.style.display = 'none';
    inputsUpdateFoodsRef.current.classList.remove('d-none');
  }

  return (
    <div id="IngredientForm" className="calculadora-section">
      <h1 className="calculator-title">Calculadora</h1>
      
      {/* Este é o botão customizado que você pode estilizar como quiser */}
      <form 
        className="form-image" 
        onSubmit={handleSubmitFormImage}
        ref={formImageRef}
      >
        <div className="input-image">
          <label htmlFor="image-food">
            {selectedFile ? (
              <img src={selectedFile} alt="Selected" style={{ width: '100%', height: '100%' }} />
            ) : (
              <>
                <i className="fa-solid fa-bowl-food"></i>
                <p>Foto da Comida</p>
              </>
            )}
          </label>
          <input
            type="file"
            name="image-food"
            id="image-food"
            ref={fileInputRef}
            className="d-none"
            accept='.jpg, .jpeg, .png'
            onChange={handleFileChange}
          />
        </div>
        {selectedFile && (
          <button className='btn button-send' type="submit">Enviar Imagem</button>
        )}
      </form>

      {listIngredients.length > 0 && (
        <div className='content-foods-list'>
          {selectedFile && (
            <img src={selectedFile} alt="Selected" style={{ width: '100%', height: '100%' }} />
          )}
          {listIngredients.map((ingredient, index) => (
            <div key={index}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>{ingredient.name}</div>
                <div>{ingredient.quantity} gramas</div>
                <div className="actions-buttons">
                  <i onClick={() => handleEdit(ingredient, index)} className="fa-regular fa-pen-to-square"></i>
                  <i onClick={() => handleRemove(index)} className="fa-regular fa-circle-xmark"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="inputs d-none" ref={inputsUpdateFoodsRef}>
        <div className="inputs-group">
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
    </div>
  );
}
