import React, { useEffect, useRef, useState } from 'react';
import './style/IngredientForm.css';
import api from '../services/api';
import Loading from './Loading';

export default function Calculator({user}) {
  const [isLoading, setIsLoading] = useState(false);
  const [listIngredients, setListIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({ name: '', quantity: undefined });
  const [editingId, setEditingId] = useState(null);
  const [animatedText, setAnimatedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);
  const formImageRef = useRef(null);
  const inputsUpdateFoodsRef = useRef(null);
  const contentResultCalories = useRef(null);

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
      setIngredient({ name: '', quantity: '' }); // Limpa o formulário
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

      fileToBase64(file).then((base64File) => {
        setImageBase64(base64File);
      }).catch((error) => {
        console.error("Erro ao converter arquivo para Base64:", error);
      });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // Pega apenas a parte Base64
        reader.onerror = (error) => reject(error);
    });
};

  // Enviar Formulário contendo a imagem
  const handleSubmitFormImage = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { data } = await api.post('/pergunte-ao-gemini', {
        image: imageBase64,
        prompt: "Quais alimentos vê nessa imagem e me dê uma quantidade de gramas estipuladas, forneça somente esse retorno em json e nada mais, por exemplo: [{name: arroz, quantity: 100}, {name: feijao, quantity: 150}]"
      });

      if(data.result) {
        
        let cleanedString = data.completion.replace(/```json|```/g, '').trim();
        
        cleanedString = cleanedString.replace(/^"|"$/g, '');
        
        setListIngredients((prev) => [...prev, ...JSON.parse(cleanedString)]);
        
        if (formImageRef.current) {
          formImageRef.current.style.display = 'none';
        }
        
        if (inputsUpdateFoodsRef.current) {
          inputsUpdateFoodsRef.current.classList.remove('d-none');
        }
        
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }


    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao converter e enviar a imagem:", error);
    }
  }

  const handleCalculate = async () => {

    try {
      setIsLoading(true);

      let formattedString = "```json\n" + JSON.stringify(listIngredients, null, 2) + "\n```";
  
      const { data } = await api.post('/calcular-calorias', {
        prompt: `Calcule a caloria total de todos os alimentos juntos de acordo com a grama especificada e me retorne somente o valor da caloria: ${formattedString}, OBS: assuma valores médios comuns de caloria por gramas para os alimentos. E assuma 'name' como o alimento e 'quantity' como a quantidade de calorias. Me retorno somente o valor, por exemplo: 275 kcal.`,
        image: imageBase64,
        user: user
      });
  
      if(data.result) {
          setListIngredients([]);
  
          inputsUpdateFoodsRef.current.style.display = 'none';
          contentResultCalories.current.classList.remove('d-none');
  
          contentResultCalories.current.innerHTML = `
            <h1 class='text-center'>De acordo com os alimentos mencionados, <br/> a comida possuí aproximadamente: <br/> <strong>${data.response} Calorias</strong></h1>
          `;
      }


      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao efetuar os calculos", error);
      setIsLoading(false);
    }

  }

  return (
    <>
      {isLoading && <Loading message="Aguarde, estamos carregando os dados..." /> }
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
                  <div className="w-75 d-flex justify-content-between">
                    <div>{ingredient.name ?? ingredient.alimento}</div>
                    <div>{ingredient.quantity} gramas</div>
                  </div>
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
          <button onClick={handleCalculate}>
            Fazer Calculo
          </button>
        </div>

        <div className='content-result-caloria' ref={contentResultCalories}></div>
      </div>
    </>
  );
}
