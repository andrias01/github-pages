import '../cssComponents/Header.css'
import BoxVision from '../resources/pictures/BoxVision.png';

function Header() {
    return (
        <>
            <div className="header">
                <nav className="navbar">
                    <img src={BoxVision} alt="Box Vision" />
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
