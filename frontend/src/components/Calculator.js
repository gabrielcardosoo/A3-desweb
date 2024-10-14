import React from 'react'
import UploadButton from './UploadButton'
import IngredientForm from './IngredientForm'

export const Calculator = () => {
  return (
    <div id="calc" className="calculator-container" >
      <h1>Calculadora</h1>
      <IngredientForm />
      <UploadButton />
    </div>
  )
}

export default Calculator