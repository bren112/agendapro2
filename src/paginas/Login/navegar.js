// Navegar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Navegar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de lógica de autenticação
    if (email === 'adm@123' && password === 'adm123') {
      // Login bem-sucedido, redirecionar para a página admpage
      navigate('/admpage');
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleLogin} className="formLogin">
        <h1>Login Adm</h1>
        <p>Solicite os seus dados no meu Whatsapp.</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          autoFocus={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/">Esqueci minha senha</a>
        <input type="submit" value="Acessar" className="btn" />
      </form>
    </div>
  );
}

export default Navegar;
