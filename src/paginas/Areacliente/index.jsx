import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import './areacliente.css';
import img from '../../img/calendario.jpg';

import './areacliente.css';

registerLocale('pt-BR', ptBR);

function PaginaCliente() {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [tabela, setTabela] = useState([]);

  useEffect(() => {
    const tabelaFromLocalStorage = obterTabelaDoLocalStorage();
    setTabela(tabelaFromLocalStorage);
  }, []);

  const abrirModal = (dia) => {
    setDiaSelecionado(dia);
  };

  const fecharModal = () => {
    setDiaSelecionado(null);
  };

  const verificarDisponibilidade = () => {
    if (!diaSelecionado || !horarioSelecionado) {
      alert('Escolha uma data e horário no calendário.');
      return;
    }
  
    const dados = {
      dia: diaSelecionado,
      hora: horarioSelecionado,
      telefone: telefone,
      cliente: nomeCliente,
    };
  
    const conflito = tabela.some(
      (item) =>
        item.dia.toDateString() === dados.dia.toDateString() &&
        item.hora === dados.hora
    );
  
    if (conflito) {
      alert('Este horário já foi marcado. Escolha outro horário.');
      return;
    }
  
    adicionarNaTabela(dados);
  
    setTelefone('');
    setNomeCliente('');
  
    fecharModal();
  };

  const adicionarNaTabela = (dados) => {
    setTabela((prevTabela) => [...prevTabela, dados]);

    const novaTabela = obterTabelaDoLocalStorage();
    novaTabela.push(dados);
    salvarTabelaNoLocalStorage(novaTabela);
    alert('Horário marcado com sucesso para ' + dados.cliente);
  };

  const obterTabelaDoLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tabela')) || [];
  };

  const salvarTabelaNoLocalStorage = (tabela) => {
    localStorage.setItem('tabela', JSON.stringify(tabela));
  };

  const horarios = [];
  for (let i = 8; i <= 19; i++) {
    const hora = `${i.toString().padStart(2, '0')}:00`;
    horarios.push(hora);
  }

  return (
    <>
      <h1>AGENDE AQUI SEU HORÁRIO!</h1>
      <p>
        Clique no dia da semana e agende{' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-calendar3"
          viewBox="0 0 16 16"
        ></svg>
      </p>
      <div className="pagina-app">
        <div className="container">
          <div className="calendario">
            <DatePicker
              selected={diaSelecionado}
              onChange={(date) => abrirModal(date)}
              minDate={new Date()}
              inline
              calendarClassName="custom-calendar"
              dayClassName={(date) =>
                tabela.some(
                  (item) =>
                    new Date(item.dia).toDateString() === date.toDateString() && item.hora !== ''
                )
                  ? 'horario-marcado'
                  : null
              }
              locale="pt-BR"
            />
          </div>
          <div
            id="janela-modal"
            className="janela-modal"
            style={{ display: diaSelecionado ? 'block' : 'none' }}
          >
            <div className="modal-conteudo">
              <span className="fechar" onClick={fecharModal}>
                &times;
              </span>
              <p>Escolha o horário:</p>
              <div className="lista-horarios">
                {horarios.map((hora, index) => (
                  <button
                    key={index}
                    className={`horario-item ${horarioSelecionado === hora ? 'selecionado' : ''}`}
                    onClick={() => setHorarioSelecionado((prevHora) => (prevHora === hora ? '' : hora))}
                    disabled={horarioSelecionado && horarioSelecionado !== hora}
                  >
                    {hora}
                  </button>
                ))}
              </div>
              <p>Telefone:</p>
              <input
                type="tel"
                id="telefone"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                pattern="\d*"
              />
              <p>Nome do Cliente:</p>
              <input
                type="text"
                id="nomeCliente"
                placeholder="Nome do Cliente"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
              />
              <br />
              <button onClick={verificarDisponibilidade} id="btnn">
                Verificar Disponibilidade
              </button>
            </div>
          </div>
        </div>

        <div className="dir">
          <img src={img} alt="img" id="calendar" />
        </div>
      </div>
    </>
  );
}

export default PaginaCliente;
