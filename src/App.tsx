import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [pieces, setPieces] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [size, setSize] = useState<number>(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (started && size > 0) {
      const arr = Array.from({ length: size * size }, (_, i) => i);
      setPieces(shuffle(arr));
    }
  }, [started, size]);

  useEffect(() => {
    if (pieces.length > 0 && pieces.every((val, i) => val === i)) {
      setSolved(true);
    }
  }, [pieces]);

  function shuffle(array: number[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function swap(idx1: number, idx2: number) {
    const arr = [...pieces];
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    setPieces(arr);
  }

  function handleStart() {
    const num = parseInt(inputValue);

    if (isNaN(num) || num < 2) {
      setError('⚠️ Digite um número válido maior ou igual a 2.');
      return;
    }

    if (num % 2 !== 0) {
      setError('⚠️ O número de partes deve ser par (ex: 2, 4, 6...).');
      return;
    }

    setError('');
    setSize(num);
    setStarted(true);
    setSolved(false);
    setSelected(null);
  }

  function handlePieceClick(index: number) {
    if (selected === null) {
      setSelected(index);
    } else {
      if (selected !== index) {
        swap(selected, index);
      }
      setSelected(null);
    }
  }

  function handleRestart() {
    setStarted(false);
    setPieces([]);
    setSize(0);
    setInputValue('');
    setError('');
    setSelected(null);
    setSolved(false);
  }

  return (
    <div className="app">
      <h1>Quebra Cabeça</h1>

      {!started && (
        <div className="setup">
          <label>Quantas partes (par): </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="start-btn" onClick={handleStart}>
            Começar
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {started && (
        <div
          className="puzzle"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 100px)`,
            gridTemplateRows: `repeat(${size}, 100px)`,
            gap: '2px',
            justifyContent: 'center',
          }}
        >
          {pieces.map((piece, index) => (
            <div
              key={index}
              className={`piece ${selected === index ? 'selected' : ''}`}
              style={{
                width: '100px',
                height: '100px',
                backgroundImage: `url(/image/casal.jpeg)`,
                backgroundSize: `${size * 100}px ${size * 100}px`,
                backgroundPosition: `-${(piece % size) * 100}px -${Math.floor(piece / size) * 100}px`,
                cursor: 'pointer',
                border: selected === index ? '2px solid #00f' : '1px solid #ccc',
              }}
              onClick={() => handlePieceClick(index)}
            ></div>
          ))}
        </div>
      )}

      {solved && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Você conseguiu!</h2>
            <p>
              Assim como enfrentamos o desafio desse quebra cabeça juntos, quero enfrentar todos os problemas da vida junto com você! 💚
            </p>

            {size >= 4 && (
              <div className="proposal">
                <h3>💍 Meu amor...</h3>
                <p>
                  Eu não enxergo um mundo em que eu esteja vivendo essa vida sem você.
                  Nos dias de caos e fraquezas mentais, estar ao seu lado é o que me ajuda a permanecer andando.
                  Eu te amo e vou te amar para o resto da minha existência! Quer casar comigo? ❤️
                </p>
              </div>
            )}

            <button onClick={handleRestart}>Jogar novamente</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
