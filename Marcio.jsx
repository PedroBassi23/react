import { useState, useEffect } from 'react';

function Cadastro() {
  const [nome, setNome] = useState(localStorage.getItem('nome') || '');
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem('tarefas')) || []
  );
  const [cor, setCor] = useState(localStorage.getItem('cor') || 'white');

  useEffect(() => {
    if (!nome) {
      const nomeUsuario = prompt('Qual seu nome?');
      setNome(nomeUsuario);
      localStorage.setItem('nome', nomeUsuario);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    localStorage.setItem('cor', cor);
    document.body.style.backgroundColor = cor;
  }, [cor]);

  function handleRegistro(e) {
    e.preventDefault();
    if (tarefa.trim()) {
      setTarefas([...tarefas, tarefa]);
      setTarefa('');
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Tarefas</h1>
      <p>{nome}, sua lista de tarefas:</p>
      
      <form onSubmit={handleRegistro}>
        <input
          type='text'
          placeholder='Digite uma tarefa'
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />
        <button type='submit'>Adicionar</button>
      </form>
      
      <ul>
        {tarefas.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
      
      <h3>Escolha uma cor de fundo:</h3>
      <label>
        <input
          type='radio'
          name='cor'
          value='white'
          checked={cor === 'white'}
          onChange={(e) => setCor(e.target.value)}
        />
        Branco
      </label>
      <label>
        <input
          type='radio'
          name='cor'
          value='lightblue'
          checked={cor === 'lightblue'}
          onChange={(e) => setCor(e.target.value)}
        />
        Azul Claro
      </label>
      <label>
        <input
          type='radio'
          name='cor'
          value='lightgreen'
          checked={cor === 'lightgreen'}
          onChange={(e) => setCor(e.target.value)}
        />
        Verde Claro
      </label>
    </div>
  );
}

export default Cadastro;
