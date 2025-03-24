/**
 * Componente Cadastro de Tarefas
 * 
 * Este componente permite ao usuário cadastrar tarefas,
 * salvar seu nome e personalizar a cor de fundo da página.
 * As informações são armazenadas no localStorage para persistência de dados.
 */

import { useState, useEffect } from 'react';

function Cadastro() {
  // Estado para armazenar o nome do usuário
  const [nome, setNome] = useState(localStorage.getItem('nome') || '');
  
  // Estado para armazenar a tarefa digitada
  const [tarefa, setTarefa] = useState('');
  
  // Estado para armazenar a lista de tarefas
  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem('tarefas')) || []
  );
  
  // Estado para armazenar a cor de fundo da página
  const [cor, setCor] = useState(localStorage.getItem('cor') || 'white');

  // Pergunta o nome do usuário ao entrar na página
  useEffect(() => {
    if (!nome) {
      const nomeUsuario = prompt('Qual seu nome?');
      setNome(nomeUsuario);
      localStorage.setItem('nome', nomeUsuario);
    }
  }, []);

  // Salva a lista de tarefas no localStorage
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  // Atualiza a cor de fundo e salva no localStorage
  useEffect(() => {
    localStorage.setItem('cor', cor);
    document.body.style.backgroundColor = cor;
  }, [cor]);

  // Adiciona uma nova tarefa à lista
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
      
      {/* Exibe a lista de tarefas */}
      <ul>
        {tarefas.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
      
      {/* Opções de cores para fundo */}
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
