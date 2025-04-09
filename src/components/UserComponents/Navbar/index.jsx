import './index.scss';
import { useState, useRef, useEffect } from "react";
import image1 from "/src/assets/logo.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import image2 from "/src/assets/az.png";
import image3 from "/src/assets/en.png";
import image4 from "/src/assets/ru.png";

function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [langDropdown, setLangDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('AZ');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const flagMapping = {
        'AZ': image2,
        'EN': image3,
        'RU': image4
    };

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleLangDropdown = () => {
        setLangDropdown(prev => !prev);
    };

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        setLangDropdown(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setLangDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Navigasiya dəyişdikdə mobil menyunu avtomatik bağla
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <section id="navbar">
            <div className="container">
                <nav>
                    <div className="img">
                        <img src={image1} alt="Logo" onClick={() => navigate('/')} />
                    </div>
                    <div className="links">
                        <Link to="/" className={`link ${pathname === '/' ? 'selected' : ''}`}>
                            Ana səhifə
                        </Link>
                        <Link to="/services" className={`link ${pathname === '/services' ? 'selected' : ''}`}>
                            Xidmətlər
                        </Link>
                        <Link to="/portfolio" className={`link ${pathname === '/portfolio' ? 'selected' : ''}`}>
                            Layihələrimiz
                        </Link>
                        <Link to="/about" className={`link ${pathname === '/about' ? 'selected' : ''}`}>
                            Haqqımızda
                        </Link>
                        <Link to="/contact" className={`link ${pathname === '/contact' ? 'selected' : ''}`}>
                            Əlaqə
                        </Link>
                    </div>
                    <div className="location-wrapper">
                        <div onClick={toggleLangDropdown} ref={buttonRef} className="selectedLanguage">
                            <img src={flagMapping[selectedLanguage]} alt={`${selectedLanguage} Bayrağı`} className="flag-icon" />
                            <span className="span">{selectedLanguage}</span>
                        </div>
                        <div className="location">
                            <MdOutlineLocationOn className="icon" />
                        </div>
                        <div className={`language-dropdown ${langDropdown ? 'open' : ''}`} ref={dropdownRef}>
                            <ul>
                                <li onClick={() => handleLanguageSelect('AZ')}>
                                    <img src={image2} alt="AZ Bayrağı" />
                                    <span className="span">AZ</span>
                                </li>
                                <li onClick={() => handleLanguageSelect('EN')}>
                                    <img src={image3} alt="EN Bayrağı" />
                                    <span className="span">EN</span>
                                </li>
                                <li onClick={() => handleLanguageSelect('RU')}>
                                    <img src={image4} alt="RU Bayrağı" />
                                    <span className="span">RU</span>
                                </li>
                            </ul>
                        </div>
                        {/* Burger menyu ikonu mobil görünüş üçün */}
                        <div className="burger-menu" onClick={toggleMenu}>
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </div>
                    </div>
                </nav>
            </div>
            {/* Fullscreen overlay olaraq açılan mobil menyu */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className={`mobile-link ${pathname === '/' ? 'selected' : ''}`}>Ana səhifə</Link>
                    <Link to="/services" className={`mobile-link ${pathname === '/services' ? 'selected' : ''}`}>Xidmətlər</Link>
                    <Link to="/portfolio" className={`mobile-link ${pathname === '/portfolio' ? 'selected' : ''}`}>Layihələrimiz</Link>
                    <Link to="/about" className={`mobile-link ${pathname === '/about' ? 'selected' : ''}`}>Haqqımızda</Link>
                    <Link to="/contact" className={`mobile-link ${pathname === '/contact' ? 'selected' : ''}`}>Əlaqə</Link>
                </div>
            )}
        </section>
    );
}

export default Navbar;
