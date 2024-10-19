import React, { useState } from 'react'

export default function IngredientForm() {
  const [listIngredients, setListIngredients] = useState([])
  const [ingredient, setIngredient] = useState({name: '', quantity: undefined})
  const [editingId, setEditingId] = useState(null)

  const valdiadeIngredient = (ingredient) => {
    if  (/\d/.test(ingredient.name)) {
      alert('O nome do ingrediente não pode conter números')
      return false
    }
    else if (ingredient.quantity < 0) {
      alert('A quantidade do ingrediente não pode ser negativa')
      return false
    }
    else if (/^-?\d+$/.test(ingredient.quantity) === false) {
      alert('A quantidade do ingrediente deve ser um número inteiro')
      return false
    }
    return true
  }
  
  const handleIngredient = () => {
    if (ingredient.name && ingredient.quantity > 0 && valdiadeIngredient(ingredient)) {
      if (editingId !== null) {
        // Atualiza o ingrediente existente
        const updatedIngredients = listIngredients.map((ing, index) => 
          index === editingId ? {name: ingredient.name, quantity: ingredient.quantity} : ing
        )
        setListIngredients(updatedIngredients)
        setEditingId(null) // Reseta o estado de edição
      } else {
        // Adiciona novo ingrediente
        setListIngredients([...listIngredients, {name: ingredient.name, quantity: ingredient.quantity}])
      }
      setIngredient({name: '', quantity: ''}) // Limpa o formulário
    }
  }
  
  const handleEdit = (element, index) => {
    setIngredient({name: element.name, quantity: element.quantity})
    setEditingId(index)
  }

  const handleRemove = (index) => {
    setListIngredients(listIngredients.filter((_, i) => i !== index))
  }

  return (
    <div style={{display:'grid', justifyContent:'center', color:'blueviolet', backgroundColor:'white'}}>

      {listIngredients.length > 0 && (
        listIngredients.map((ingredient, index) => (
          <div key={index}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
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

      <div className='inputs'>
        <input 
          type="text" 
          placeholder="Digite aqui o ingrediente ..." 
          value={ingredient.name}
          required
          onChange={(e) => setIngredient({...ingredient, name: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Digite o peso em gramas ..." 
          value={ingredient.quantity}
          required
          onChange={(e) => setIngredient({...ingredient, quantity: e.target.value})} 
        />
      </div>
      <button onClick={handleIngredient}>{editingId !== null ? 'Atualizar ingrediente': 'Adicionar ingrediente'}</button>

    </div>
  )
}
