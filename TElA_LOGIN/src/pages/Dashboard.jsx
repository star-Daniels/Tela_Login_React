import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Dashboard() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Você está logado ✅</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;
