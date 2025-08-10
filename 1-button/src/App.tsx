import React, { ChangeEvent } from 'react';
import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;

    const numero = valor === '' ? 0 : Number(valor);

    setContador(numero);
  }

  return (
    <div>
      <h1>Botão</h1>
      <input 
      placeholder='Digite um valor inicial' 
      type='number'
      value={contador}
      onChange={handleInputChange}
      />

      <button onClick={() => {
        if (contador === 10) {
          setContador(10);
        } else {
          setContador(contador + 1);
        }
      }}>+</button>
      <button onClick={() => {
        if (contador === 0) {
          setContador(0);
        } else {
          setContador(contador - 1);
        }
      }}>-</button>
      <button onClick={() => setContador(0)}>Reset</button>
      <h1>{contador}</h1>
    </div>
  );
}

export default App;
