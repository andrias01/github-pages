import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import { AdminContext } from "../contexts/Admin.context";
import "../cssComponents/LoginAdmin.css";
import Loading from "../loaders/LoadingCircle"; // Assuming Loading component is imported

const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { admins, loading } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Por favor, complete todos los campos");
            return;
        }

        const admin = admins.find(
            (admin) =>
                admin.email.trim().toLowerCase() === email.trim().toLowerCase() &&
                admin.password === password
        );

        if (admin) {
            sessionStorage.setItem("currentAdmin", JSON.stringify(admin));
            navigate("/ShowAdmins");
        } else {
            setError("Credenciales incorrectas. Este administrador no existe.");
        }
    };

    if (loading) {
        // return <div>Cargando administradores...</div>;
        navigate("/Loading"); // Assuming Loading component is imported
    }

    if (!loading && admins.length === 0) {
        return <div>No hay administradores disponibles. Contacta al soporte.</div>;
    }

    return (
        <>
            <Header />
            <div className="containerFather">
                <Link className="ButtonAccept" to={"/"}>
                    Home
                </Link>
                <div className="container">
                    <h2 className="text-initial">Iniciar Sesión Como Admin</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="information">
                            <label className="textInput" htmlFor="email">
                                Correo
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="information">
                            <label className="textInput" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="linksWithButton">
                            <button className="ButtonAccept" type="submit">
                                Aceptar
                            </button>
                            <a className="linkForgetPassword" href="#">
                                ¿Olvidó la contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginAdmin;
