import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./style/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !passwordConfirm) {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== passwordConfirm) {
      setError("As senhas não conferem");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        password,
        createdAt: serverTimestamp(),
        
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        setError("Este email já está em uso");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter no mínimo 6 caracteres");
      } else {
        setError("Erro ao criar conta");
      }
    }
  }

  return (
    <div className="register-container">
      <div className="info-section">
        <h2>BEM-VINDO !</h2>
        <p>É um prazer ter você aqui.</p>
        <p> Crie sua conta para continuar.</p>
        
        
        <div className="layout-btn-sign-in">
          <Link to="/"><button className="btn-sign-in">Entrar</button></Link>
        </div>
        
      </div>

      <div className="container-right">
        <div className="container-forms">
          <h1>Criar Conta</h1>
          <form onSubmit={handleRegister}>
            <div className="layout-input-forms">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                type="password"
                placeholder="Confirmar senha"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <div className="btn-register"><button  type="submit">Criar conta</button></div>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
