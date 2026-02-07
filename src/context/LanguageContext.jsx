import React, { createContext, useState, useContext } from "react";
import translations from "../translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("ar");

  // Allow setting specific language
  const changeLanguage = (newLang) => {
    if (["en", "ar", "fr"].includes(newLang)) {
      setLang(newLang);
    }
  };

  // Keep toggle for backward compatibility if needed, but primarily use changeLanguage
  const toggleLang = () => {
    setLang((prev) => {
      if (prev === "ar") return "en";
      if (prev === "en") return "fr";
      return "ar";
    });
  };

  const t = translations[lang] || translations["en"];

  React.useEffect(() => {
    document.documentElement.dir = t.dir || "ltr";
    document.documentElement.lang = lang;
  }, [lang, t]);

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage, toggleLang }}>
      <div dir={t?.dir || "ltr"} className={t?.font || ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
