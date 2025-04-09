import './index.scss';
import { useState, useRef, useEffect } from "react";
import image1 from "/src/assets/logo.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import image2 from "/src/assets/az.png";
import image3 from "/src/assets/en.png";
import image4 from "/src/assets/ru.png";
import { useTranslation } from "react-i18next";

function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [langDropdown, setLangDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('AZ');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const flagMapping = {
        'az': image2,
        'en': image3,
        'ru': image4
    };

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleLangDropdown = () => {
        setLangDropdown(prev => !prev);
    };

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        setLangDropdown(false);
        // Dili i18n və localStorage vasitəsilə yenilə
        i18n.changeLanguage(lang);
        localStorage.setItem("appLanguage", lang);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Komponent yükləndikdə saxlanılmış dili yoxla və təyin et
    useEffect(() => {
        const storedLang = localStorage.getItem("appLanguage");
        if (storedLang) {
            setSelectedLanguage(storedLang);
            i18n.changeLanguage(storedLang);
        }
    }, [i18n]);

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
                        {/* Menyu elementləri üçün i18n istifadə olunur */}
                        <Link to="/" className={`link ${pathname === '/' ? 'selected' : ''}`}>
                            {t('menu.home')}
                        </Link>
                        <Link to="/services" className={`link ${pathname === '/services' ? 'selected' : ''}`}>
                            {t('menu.services')}
                        </Link>
                        <Link to="/portfolio" className={`link ${pathname === '/portfolio' ? 'selected' : ''}`}>
                            {t('menu.portfolio')}
                        </Link>
                        <Link to="/about" className={`link ${pathname === '/about' ? 'selected' : ''}`}>
                            {t('menu.about')}
                        </Link>
                        <Link to="/contact" className={`link ${pathname === '/contact' ? 'selected' : ''}`}>
                            {t('menu.contact')}
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
                                <li onClick={() => handleLanguageSelect('az')}>
                                    <img src={image2} alt="AZ Bayrağı" />
                                    <span className="span">AZ</span>
                                </li>
                                <li onClick={() => handleLanguageSelect('en')}>
                                    <img src={image3} alt="EN Bayrağı" />
                                    <span className="span">EN</span>
                                </li>
                                <li onClick={() => handleLanguageSelect('ru')}>
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
                    <Link to="/" className={`mobile-link ${pathname === '/' ? 'selected' : ''}`}>
                        {t('menu.home')}
                    </Link>
                    <Link to="/services" className={`mobile-link ${pathname === '/services' ? 'selected' : ''}`}>
                        {t('menu.services')}
                    </Link>
                    <Link to="/portfolio" className={`mobile-link ${pathname === '/portfolio' ? 'selected' : ''}`}>
                        {t('menu.portfolio')}
                    </Link>
                    <Link to="/about" className={`mobile-link ${pathname === '/about' ? 'selected' : ''}`}>
                        {t('menu.about')}
                    </Link>
                    <Link to="/contact" className={`mobile-link ${pathname === '/contact' ? 'selected' : ''}`}>
                        {t('menu.contact')}
                    </Link>
                </div>
            )}
        </section>
    );
}

export default Navbar;
