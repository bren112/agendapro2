import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cliente = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [, setIsCadastroModalOpen] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      alert('Login bem-sucedido!');
      navigate('/clientepagina');
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };

  const handleCadastro = (event) => {
    event.preventDefault();

    if (users.some((u) => u.email === newEmail)) {
      alert('E-mail já cadastrado. Tente outro.');
      return;
    }

    const newUser = { email: newEmail, password: newPassword };
    setUsers([...users, newUser]);
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    alert('Cadastro bem-sucedido!');
    closeCadastroModal();
  };

  const openCadastroModal = () => {
    setIsCadastroModalOpen(true);
    setIsLoginScreen(false);
  };

  const closeCadastroModal = () => {
    setIsCadastroModalOpen(false);
    setIsLoginScreen(true);
  };

  return (
    <div className='tudo'>
      <div className="page">
        {isLoginScreen ? (
          <form onSubmit={handleLogin} className="formLogin">
            <h1>Login Cliente</h1>
            <p>Digite os seus dados de acesso no campo abaixo.</p>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={openCadastroModal} className="btn-cadastro">
              Não tenho uma conta
            </button>
            <input type="submit" value="Acessar" className="btn" />
          </form>
        ) : (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeCadastroModal}>
                &times;
              </span>
              <form onSubmit={handleCadastro} className="formCadastro">
                <h1>Cadastro Cliente</h1>
                <label htmlFor="newEmail">Novo E-mail</label>
                <input
                  type="email"
                  placeholder="Digite seu novo e-mail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                <label htmlFor="newPassword">Nova Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input type="submit" value="Cadastrar" className="btn" />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cliente;
