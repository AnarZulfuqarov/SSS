import './index.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
// import Cookies from 'js-cookie'; // Cookies-i çıxarırıq

// Resim importları
import logo from '/src/assets/logo.png';
import flagAZ from '/src/assets/az.png';
import flagEN from '/src/assets/en.png';
import flagRU from '/src/assets/ru.png';
import {FaFacebook, FaInstagram, FaTiktok} from "react-icons/fa";

function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Diller üçün tek bir obje:
    const languages = {
        az: { label: 'AZ', flag: flagAZ },
        en: { label: 'EN', flag: flagEN },
        ru: { label: 'RU', flag: flagRU },
    };

    // İlk seçim: localStorage-dan götür, əgər yoxdursa default olaraq 'az' seçilsin
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('sssLanguage') || 'az');
    const [langDropdown, setLangDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Component mount olanda seçilmiş dili yoxlayırıq
    useEffect(() => {
        const storedLang = localStorage.getItem('sssLanguage');
        if (storedLang && languages[storedLang]) {
            setSelectedLanguage(storedLang);
            i18n.changeLanguage(storedLang);
        }
    }, [i18n]);

    const toggleLangDropdown = () => {
        setLangDropdown(prev => !prev);
    };

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        setLangDropdown(false);
        i18n.changeLanguage(lang);
        localStorage.setItem('sssLanguage', lang); // Cookies istifadə olunmur
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Dropdown dışına tıklanınca kapatmaq üçün
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setLangDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Route dəyişince mobil menü kapanacaq
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <section id="navbar">
            <div className="container">
                <nav>
                    <div className="img">
                        <img
                            src={logo}
                            alt="Logo"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="links">
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
                            <img
                                src={languages[selectedLanguage].flag}
                                alt={`${languages[selectedLanguage].label} bayrağı`}
                                className="flag-icon"
                            />
                            <span className="span">{languages[selectedLanguage].label}</span>
                        </div>

                        {/* Lokasyon ikonu: tıklanınca sidebar açılsın */}
                        <div className="location" onClick={openSidebar}>
                            <MdOutlineLocationOn className="icon" />
                        </div>

                        {langDropdown && (
                            <div className="language-dropdown open" ref={dropdownRef}>
                                <ul>
                                    {Object.keys(languages).map((langKey) => (
                                        <li key={langKey} onClick={() => handleLanguageSelect(langKey)}>
                                            <img
                                                src={languages[langKey].flag}
                                                alt={`${languages[langKey].label} Bayrağı`}
                                            />
                                            <span className="span">{languages[langKey].label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="burger-menu" onClick={toggleMenu}>
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </div>
                    </div>
                </nav>
            </div>

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

            {/* Soldan açılan Sidebar */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar}>
                    <div
                        className={`sidebar ${isSidebarOpen ? 'active' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with title & close button */}
                        <div className="sidebar-header">
                            <h2>CONTACT US</h2>
                            <button className="close-btn" onClick={closeSidebar}>
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Main content */}
                        <div className="sidebar-content">
                            <address>
                                <p><a href={"tel:994552999555"}>+994 55 299 95 55</a></p>
                                <p><a href={"mailto:info.sssinsaat@gmail.com"}>
                                    info.sssinsaat@gmail.com
                                </a></p>
                                </address>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2143.2871150885803!2d49.820814339935694!3d40.39212129227946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDIzJzMyLjYiTiA0OcKwNDknMTkuMiJF!5e1!3m2!1saz!2saz!4v1744207493172!5m2!1saz!2saz"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            />
                        </div>

                        {/* Footer (social icons, etc.) */}
                        <div className="sidebar-footer">
                            <a href="https://www.facebook.com/people/Ssogluconstructions/61570216319110/" aria-label="Facebook" target={"_blank"}>
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/ssoglu.construction/" aria-label="Instagram" target={"_blank"}>
                                <FaInstagram />
                            </a>
                            <a href="https://www.tiktok.com/@ssoglu.construction" aria-label="Tiktok" target={"_blank"}>
                                <FaTiktok />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Navbar;
