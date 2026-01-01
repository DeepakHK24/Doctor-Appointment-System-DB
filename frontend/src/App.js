import { useState } from "react";
import "./App.css";

function App() {
  const [tab, setTab] = useState("login");

  return (
    <div className="container">
      <h1>Doctor Appointment System</h1>

      {/* ---- TAB BUTTONS ---- */}
      <div className="tabs">
        <button className={tab==="login" ? "active" : ""} onClick={()=>setTab("login")}>Login</button>
        <button className={tab==="register" ? "active" : ""} onClick={()=>setTab("register")}>Register</button>
        <button className={tab==="appointments" ? "active" : ""} onClick={()=>setTab("appointments")}>Appointments</button>
      </div>

      {/* ---- TAB CONTENT ---- */}
      <div className="content">
        {tab === "login" && <Login />}
        {tab === "register" && <Register />}
        {tab === "appointments" && <Appointments />}
      </div>
    </div>
  );
}

/* ------- COMPONENTS ------- */

function Login() {
  return (
    <form className="form-box">
      <h2>Login</h2>
      <input type="email" placeholder="Email" required/>
      <input type="password" placeholder="Password" required/>
      <button>Login</button>
    </form>
  );
}

function Register() {
  return (
    <form className="form-box">
      <h2>Register</h2>
      <input type="text" placeholder="Name" required/>
      <input type="email" placeholder="Email" required/>
      <input type="password" placeholder="Password" required/>
      <button>Sign Up</button>
    </form>
  );
}

function Appointments() {
  return (
    <div className="form-box">
      <h2>Your Appointments</h2>
      <p>No appointments booked yet.</p>
    </div>
  );
}

export default App;
