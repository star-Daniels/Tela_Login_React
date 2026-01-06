import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./style/Dashboard.css";

function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      if (!auth.currentUser) return;

      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <h1>👋 Olá, {name}!</h1>
        <p>Bem-vindo ao sistema.</p>
      </div>
    </div>
  );
}

export default Dashboard;
