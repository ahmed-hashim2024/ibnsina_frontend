import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../translations";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import logo from "../../assets/image/logo.svg";

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  // Links using translations
  const exploreLinks = [
    { key: "home", label: t.home },
    { key: "about", label: t.about },
    { key: "services", label: t.services },
    { key: "contact", label: t.contact },
  ];

  const knowMoreLinks = [
    { key: "projects", label: t.footerProjects },
    { key: "portfolio", label: t.footerPortfolio },
    { key: "gallery", label: t.footerGallery },
    { key: "resources", label: t.footerResources },
  ];

  const aboutLinks = [
    { key: "team", label: t.footerTeam },
    { key: "careers", label: t.footerCareers },
    { key: "partners", label: t.footerPartners },
    { key: "terms", label: t.footerTerms },
  ];

  const socialLinks = [
    { key: "facebook", label: t.socialFacebook },
    { key: "linkedin", label: t.socialLinkedin },
    { key: "twitter", label: t.socialTwitter },
    { key: "instagram", label: t.socialInstagram },
  ];

  return (
    <footer className="bg-sky-50/50 pt-16 pb-8 border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Column 1: Brand & Info */}
          <div className="col-span-2 lg:col-span-1 space-y-6 text-center lg:text-start">
            <div>
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <img src={logo} alt="Ibn Sina Logo" className="h-10" />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
                {t.footerDesc}
              </p>
              <p className="text-gray-500 text-sm mt-2">{t.footerAddress}</p>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="text-center lg:text-start">
            <h3 className="text-sky-500 font-bold mb-6 uppercase tracking-wider text-sm">
              {t.footerExplore}
            </h3>
            <ul className="space-y-4">
              {exploreLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-sky-500 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Know More */}
          <div className="text-center lg:text-start">
            <h3 className="text-sky-500 font-bold mb-6 uppercase tracking-wider text-sm">
              {t.footerKnowMore}
            </h3>
            <ul className="space-y-4">
              {knowMoreLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-sky-500 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About */}
          <div className="text-center lg:text-start">
            <h3 className="text-sky-500 font-bold mb-6 uppercase tracking-wider text-sm">
              {t.footerAbout}
            </h3>
            <ul className="space-y-4">
              {aboutLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-sky-500 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Social Media */}
          <div className="text-center lg:text-start">
            <h3 className="text-sky-500 font-bold mb-6 uppercase tracking-wider text-sm">
              {t.footerSocial}
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-sky-500 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    className="text-sky-500 text-xl hover:scale-110 transition-transform duration-200"
  >
    {icon}
  </a>
);

export default Footer;
