import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLanguageSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";
import logo from "../../assets/image/logo.svg";

import { Menu, X } from "lucide-react";

const Navbar = () => {
  // 1. إدارة حالة السكرول والقائمة الجانبية
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  // 2. إدارة اللغة
  const { lang, changeLanguage, t } = useLanguage();

  // 3. مراقبة السكرول لتفعيل تأثير البلور
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. إغلاق قائمة اللغة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-100 ease-in-out border-b border-transparent
        ${
          scrolled
            ? "bg-white/30 backdrop-blur-md shadow-sm  border-gray-100" // حالة السكرول (زجاجي)
            : "bg-transparent py-2" // حالة البداية (شفاف)
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* === القسم الأيسر: اللغة + الروابط === */}
          <div className="flex items-center gap-4 z-20">
            {/* 1. زر اللغة الدائري */}
            {/* 1. زر اللغة الدائري + القائمة المنسدلة */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-gray-400 font-bold hover:text-sky-500 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                title="Change Language"
              >
                <IoLanguageSharp className="size-5" />
              </button>

              {/* Language Dropdown */}
              {isLangMenuOpen && (
                <div className="absolute top-10 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-32 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={() => {
                      if (lang !== "ar") changeLanguage("ar");
                      setIsLangMenuOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-bold text-right hover:bg-sky-50 transition-colors flex items-center justify-between gap-2 ${
                      lang === "ar"
                        ? "text-sky-600 bg-sky-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>العربية</span>
                    {lang === "ar" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                    )}
                  </button>
                  <div className="h-px bg-gray-100 w-full"></div>
                  <button
                    onClick={() => {
                      if (lang !== "en") changeLanguage("en");
                      setIsLangMenuOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-bold text-left hover:bg-sky-50 transition-colors flex items-center justify-between gap-2 ${
                      lang === "en"
                        ? "text-sky-600 bg-sky-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>English</span>
                    {lang === "en" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                    )}
                  </button>
                  <div className="h-px bg-gray-100 w-full"></div>
                  <button
                    onClick={() => {
                      if (lang !== "fr") changeLanguage("fr");
                      setIsLangMenuOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-bold text-left hover:bg-sky-50 transition-colors flex items-center justify-between gap-2 ${
                      lang === "fr"
                        ? "text-sky-600 bg-sky-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>Français</span>
                    {lang === "fr" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 2. الروابط (شكل بيضاوي) - تظهر فقط في الشاشات الكبيرة */}
            <div className="hidden lg:flex items-center gap-6 bg-gray-100/80 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-200 shadow-inner">
              <NavLink to="/" text={t.home || "Home"} />
              <NavLink to="/about" text={t.about || "About"} />
              <NavLink to="/services" text={t.services || "Services"} />
              <NavLink to="/projects" text={t.projects || "Projects"} />
              <NavLink to="/careers" text={t.careers || "Careers"} />
              <NavLink to="/contact" text={t.contact || "contact"} />
            </div>
          </div>

          {/* === المنتصف: اللوجو (للموبايل فقط) === */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 lg:hidden">
            <Link
              to="/"
              className={`flex items-center hover:opacity-80 transition-all duration-300 ${
                scrolled ? "opacity-100" : "opacity-0 invisible"
              }`}
            >
              <img src={logo} alt="Ibn Sina Logo" className="h-10" />
            </Link>
          </div>

          {/* === القسم الأيمن: أيقونات التواصل الاجتماعي + زر القائمة للموبايل === */}
          <div className="flex items-center gap-4 z-20">
            {/* أيقونات التواصل (مخفية في الموبايل) */}
            {/* أيقونات التواصل الاجتماعي (تختفي عند السكرول) */}
            <div
              className={`hidden md:flex items-center gap-3 transition-all duration-300 ${
                scrolled ? "hidden opacity-0" : "flex opacity-100"
              }`}
            >
              <a
                href="#"
                className="w-8 h-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 text-lg 
                         transition-all duration-300 backdrop-blur-md border border-gray-200
                         hover:bg-sky-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
              >
                <FaFacebookSquare className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 text-lg 
                         transition-all duration-300 backdrop-blur-md border border-gray-200
                         hover:bg-sky-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 text-lg 
                         transition-all duration-300 backdrop-blur-md border border-gray-200
                         hover:bg-sky-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
              >
                <FaSquareInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 text-lg 
                         transition-all duration-300 backdrop-blur-md border border-gray-200
                         hover:bg-sky-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>

            {/* اللوجو (يظهر فقط عند السكرول مكان الأيقونات) */}
            <Link
              to="/"
              className={`hidden md:block transition-all duration-500 ease-in-out ${
                scrolled
                  ? "opacity-100 w-auto translate-x-0"
                  : "opacity-0 w-0 -translate-x-10 overflow-hidden"
              }`}
            >
              <img src={logo} alt="Ibn Sina Logo" className="h-10" />
            </Link>

            {/* زر الموبايل (يظهر فقط في الصغير - في الجهة المقابلة للغة) */}
            <button
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-blue-400 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* === قائمة الموبايل المنسدلة === */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95  border-t border-gray-100/50 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-4">
          <MobileLink
            to="/"
            text={t.home || "Home"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileLink
            to="/about"
            text={t.about || "About"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileLink
            to="/services"
            text={t.services || "Services"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileLink
            to="/projects"
            text={t.projects || "Projects"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileLink
            to="/careers"
            text={t.careers || "Careers"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileLink
            to="/contact"
            text={t.contact || "Contact"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};

// مكون صغير للروابط (لتقليل التكرار)
const NavLink = ({ to, text }) => (
  <Link
    to={to}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="text-sm font-medium text-gray-600 hover:text-sky-500 transition-colors duration-200"
  >
    {text}
  </Link>
);

// مكون للأيقونات
const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-8 h-8 flex items-center justify-center rounded-full text-sky-500 hover:bg-blue-50 hover:scale-110 transition-all duration-200"
  >
    {icon}
  </a>
);

// مكون روابط الموبايل
const MobileLink = ({ to, text, onClick }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onClick) onClick();
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="text-lg font-bold text-gray-900 hover:text-sky-600 w-full text-center py-2 hover:bg-white/40 transition-colors"
    >
      {text}
    </Link>
  );
};

export default Navbar;
