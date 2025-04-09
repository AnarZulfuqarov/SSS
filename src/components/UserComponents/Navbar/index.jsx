import './index.scss'; // scss dosyanız
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

// Resim importları (Vite ise /src/... yolları genelde çalışır)
// CRA'de genelde import logo from '../assets/logo.png' gibi kullandığımızı unutmayın
import logo from '/src/assets/logo.png';
import flagAZ from '/src/assets/az.png';
import flagEN from '/src/assets/en.png';
import flagRU from '/src/assets/ru.png';

function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Diller için tek bir obje:
    const languages = {
        az: { label: 'AZ', flag: flagAZ },
        en: { label: 'EN', flag: flagEN },
        ru: { label: 'RU', flag: flagRU },
    };

    // Başlangıçta tarayıcı veya cookies’den bir değer yoksa fallback olarak 'az' kullan
    const [selectedLanguage, setSelectedLanguage] = useState('az');
    const [langDropdown, setLangDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        // Cookies'ten language çek
        const storedLang = Cookies.get('appLanguage');
        if (storedLang && languages[storedLang]) {
            // Eğer storedLang 'az','en','ru' dışında bir şeyse set etme
            setSelectedLanguage(storedLang);
            i18n.changeLanguage(storedLang);
        }
    }, [i18n]);

    const toggleLangDropdown = () => {
        setLangDropdown((prev) => !prev);
    };

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);     // 'az' | 'en' | 'ru'
        setLangDropdown(false);
        i18n.changeLanguage(lang);
        Cookies.set('appLanguage', lang, { expires: 30 });
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Dropdown dışına tıklanınca kapatmak için
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

    // route değişince mobil menü kapanacak
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <section id="navbar">
            <div className="container">
                <nav>
                    <div className="img">
                        {/* Logo üzerine tıklayınca anasayfaya dönsün */}
                        <img
                            src={logo}
                            alt="Logo"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>

                    {/* Masaüstü Linkler */}
                    <div className="links">
                        <Link
                            to="/"
                            className={`link ${pathname === '/' ? 'selected' : ''}`}
                        >
                            {t('menu.home')}
                        </Link>
                        <Link
                            to="/services"
                            className={`link ${pathname === '/services' ? 'selected' : ''}`}
                        >
                            {t('menu.services')}
                        </Link>
                        <Link
                            to="/portfolio"
                            className={`link ${pathname === '/portfolio' ? 'selected' : ''}`}
                        >
                            {t('menu.portfolio')}
                        </Link>
                        <Link
                            to="/about"
                            className={`link ${pathname === '/about' ? 'selected' : ''}`}
                        >
                            {t('menu.about')}
                        </Link>
                        <Link
                            to="/contact"
                            className={`link ${pathname === '/contact' ? 'selected' : ''}`}
                        >
                            {t('menu.contact')}
                        </Link>
                    </div>

                    <div className="location-wrapper">
                        {/* Dil Seçme Butonu */}
                        <div
                            onClick={toggleLangDropdown}
                            ref={buttonRef}
                            className="selectedLanguage"
                        >
                            <img
                                src={languages[selectedLanguage].flag}
                                alt={`${languages[selectedLanguage].label} bayrağı`}
                                className="flag-icon"
                            />
                            <span className="span">{languages[selectedLanguage].label}</span>
                        </div>

                        {/* Lokasyon ikonu (örnek) */}
                        <div className="location">
                            <MdOutlineLocationOn className="icon" />
                        </div>

                        {/* Dropdown */}
                        {langDropdown && (
                            <div
                                className="language-dropdown open"
                                ref={dropdownRef}
                            >
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

                        {/* Burger Menü (Mobil görünümde aç/kapa) */}
                        <div className="burger-menu" onClick={toggleMenu}>
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobil menü overlay */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link
                        to="/"
                        className={`mobile-link ${pathname === '/' ? 'selected' : ''}`}
                    >
                        {t('menu.home')}
                    </Link>
                    <Link
                        to="/services"
                        className={`mobile-link ${pathname === '/services' ? 'selected' : ''}`}
                    >
                        {t('menu.services')}
                    </Link>
                    <Link
                        to="/portfolio"
                        className={`mobile-link ${pathname === '/portfolio' ? 'selected' : ''}`}
                    >
                        {t('menu.portfolio')}
                    </Link>
                    <Link
                        to="/about"
                        className={`mobile-link ${pathname === '/about' ? 'selected' : ''}`}
                    >
                        {t('menu.about')}
                    </Link>
                    <Link
                        to="/contact"
                        className={`mobile-link ${pathname === '/contact' ? 'selected' : ''}`}
                    >
                        {t('menu.contact')}
                    </Link>
                </div>
            )}
        </section>
    );
}

export default Navbar;
