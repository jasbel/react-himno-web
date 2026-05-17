import React from 'react';
import ChordLyrics from './ChordLyrics';

const ChordExample: React.FC = () => {
  const exampleText = "Un [C] día de estos al [G] pasar\nyo te [Am] quise saludar [F]\n[C] Tú me miraste un [G] poco extrañado\n[Am] como queriendo [F] preguntar";

  const exampleChoir = "[C] Salvador, [G] mi amigo [Am] fiel\n[F] Tu nombre [C] cantaré [G]";

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Ejemplo de Acordes</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px' }}>Verso con Acordes:</h3>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <ChordLyrics text={exampleText} fontSize={16} />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px' }}>Coro con Acordes:</h3>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', fontStyle: 'italic', fontWeight: 'bold' }}>
          <ChordLyrics text={exampleChoir} fontSize={16} />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px' }}>Cómo Usar:</h3>
        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', fontSize: '14px' }}>
          <p><strong>Para agregar acordes a tus canciones:</strong></p>
          <ol style={{ marginLeft: '20px' }}>
            <li>Escribe el acorde entre corchetes: <code>[C]</code>, <code>[G]</code>, <code>[Am]</code>, etc.</li>
            <li>Coloca el acorde inmediatamente antes de la palabra donde debe sonar</li>
            <li>Ejemplo: <code>Un [C] día de estos</code> mostrará el acorde Do sobre "día"</li>
          </ol>
          <p style={{ marginTop: '10px' }}><strong>Acordes Soportados:</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>Notas básicas: C, D, E, F, G, A, B</li>
            <li>Sostenidos: C#, F#, etc.</li>
            <li>Menores: Am, Dm, Em, etc.</li>
            <li>Séptimas: C7, G7, etc.</li>
            <li>Acordes con barra: C/G, Am/F#, etc.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChordExample;
