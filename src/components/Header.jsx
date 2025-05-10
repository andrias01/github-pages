import '../cssComponents/Header.css'
import Logo from '../resources/pictures/Logo.jpeg';

function Header() {
    return (
        <>
            <div className="header">
                <nav className="navbar">
                    <img src={Logo} alt="Logo" />
                    <div className="name1">
                        <strong>Victus</strong>
                        <span className="name2">Residencias</span>
                    </div>
                    
                </nav>
            </div>
        </>
    )
}

export default Header
