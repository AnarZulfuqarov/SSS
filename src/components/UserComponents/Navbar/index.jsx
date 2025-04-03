import './index.scss';
import {useState, useRef, useEffect} from "react";
import image1 from "/src/assets/logo.png";
import {useLocation, Link, useNavigate} from "react-router-dom";
import {MdOutlineLocationOn} from "react-icons/md";
import image2 from "/src/assets/az.png";
import image3 from "/src/assets/en.png";
import image4 from "/src/assets/ru.png";

function Navbar() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [langDropdown, setLangDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('AZ');

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

    return (
        <section id="navbar">
            <div className="container">
                <nav>
                    <div className={"img"}>
                        <img src={image1} alt="Logo" onClick={() => navigate('/')}/>
                    </div>
                    <div className="links">
                        <Link to="/" className={`link ${pathname === '/' ? 'selected' : ''}`}>
                            Ana səhifə
                        </Link>
                        <Link to="/services" className={`link ${pathname === '/services' ? 'selected' : ''}`}>
                            Xidmətlər
                        </Link>
                        <Link to="/projects" className={`link ${pathname === '/projects' ? 'selected' : ''}`}>
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
                        <div onClick={toggleLangDropdown} ref={buttonRef} className={"selectedLanguage"}>
                            <img src={flagMapping[selectedLanguage]} alt={`${selectedLanguage} Bayrağı`}
                                 className="flag-icon"/>
                            <span className={"span"}>{selectedLanguage}</span>
                        </div>
                        <div className="location">
                            <MdOutlineLocationOn className="icon"/>
                        </div>
                        <div className={`language-dropdown ${langDropdown ? 'open' : ''}`} ref={dropdownRef}>
                            <ul>
                                <li onClick={() => handleLanguageSelect('AZ')}>
                                    <img src={image2} alt="AZ Bayrağı"/>
                                    <span className={"span"}>AZ</span>
                                </li>
                                <li onClick={() => handleLanguageSelect('EN')}>
                                    <img src={image3} alt="EN Bayrağı"/>
                                    <span className={"span"}>EN</span>
                                </li>
                                <li onClick={() => handleLanguageSelect('RU')}>
                                    <img src={image4} alt="RU Bayrağı"/>
                                    <span className={"span"}>RU</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default Navbar;
