import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav>
      <span>Doctor Appointment System</span>

      {user.role === "patient" && (
        <>
          <Link to="/patient">Dashboard</Link>
          <Link to="/my-appointments">My Appointments</Link>
        </>
      )}

      {user.role === "doctor" && (
        <Link to="/doctor">Dashboard</Link>
      )}

      {user.role === "admin" && (
        <Link to="/admin">Dashboard</Link>
      )}

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
