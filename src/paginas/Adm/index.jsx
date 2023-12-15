import React, { useEffect, useState } from 'react';
import './adm.css';

function Admpage() {
  const [tabela, setTabela] = useState([]);

  useEffect(() => {
    const tabelaFromLocalStorage = getTabelaFromLocalStorage();
    setTabela(tabelaFromLocalStorage);
  }, []);

  const getTabelaFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tabela')) || [];
  };

  const resetarSemana = () => {
    localStorage.removeItem('tabela');
    setTabela([]);
    alert("Semana resetada com sucesso!");
  };

  const formatarData = (data) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  return (
    <>
      <div>
        <h1>VEJA SEUS CLIENTES DA SEMANA</h1>
        <div className='tabelaclientes'>
          <table id="agendaTable">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Telefone</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody>
              {tabela.map((item, index) => (
                <tr key={index}>
                  <td>{formatarData(item.dia)}</td>
                  <td>{item.hora}</td>
                  <td>{item.telefone}</td>
                  <td>{item.cliente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className='tabelaclientes'>
        <button onClick={resetarSemana}>Resetar Semana</button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default Admpage;
