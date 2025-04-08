import { Navigate, useNavigate } from "react-router-dom";

import "../cssComponents/AdminDashboard.css"; // o usa Tailwind si prefieres
const buttonData = [
    { label: "Conjuntos", icon: "🏢", path: "/" },
    { label: "Zonas Comunes", icon: "🧱", path: "/" },
    { label: "Agendas", icon: "📆", path: "/" },
    { label: "Administradores", icon: "👥", path: "/ManagementAdmin" },
    { label: "Porteros", icon: "🧍", path: "/" },
    { label: "Viviendas", icon: "🏠", path: "/" },
    { label: "Residentes", icon: "👨‍👩‍👧", path: "/" },
    { label: "Asignar Usuarios", icon: "✅", path: "/" },
];
function AdminDashboard() {
    const Navigate = useNavigate();
    return (
        <>
            <div className="admin-dashboard">
                <header className="admin-topbar">
                    <h2>Hola, <span>Administrador</span></h2>
                </header>

                <div className="admin-grid">
                    {buttonData.map((btn, index) => (
                        <div
                            key={index}
                            className="admin-card"
                            onClick={() => Navigate(btn.path)}
                        >
                            <div className="admin-icon">{btn.icon}</div>
                            <p>{btn.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;
