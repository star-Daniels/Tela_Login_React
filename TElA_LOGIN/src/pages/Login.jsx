import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Email ou senha inválidos");
    }
  }

  return (
    <div className="login-container">


      <div className="login-container-left">
        <div className="login-container-forms">
          <h1>Entrar</h1>

          <form onSubmit={handleLogin}>
            <div className="login-layout-input-forms">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-btn-register">
              <button type="submit">Entrar</button>
            </div>
          </form>

          {error && <p className="login-error">{error}</p>}
        </div>
      </div>

      <div className="login-info-section">
        <h2>BEM-VINDO DE VOLTA!</h2>
        <p>Que bom ver você novamente.</p>
        <p>Entre na sua conta para continuar.</p>

        <div className="login-layout-btn-sign-in">
          <Link to="/register">
            <button className="login-btn-sign-in">Criar conta</button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
