import ServicesData from "../components/servicesData";
import ServicesHero from "../components/ServicesHero";
import service1 from "../assets/image/services1.png";
import service2 from "../assets/image/services2.png";
import service3 from "../assets/image/services3.png";
import service4 from "../assets/image/services4.png";
import service5 from "../assets/image/services5.png";
import service6 from "../assets/image/services6.png";
import service7 from "../assets/image/services7.png";
import service8 from "../assets/image/services8.png";
import AboutAsks from "../components/AboutAsks";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

const ServicesPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const servicesData = [
    {
      title: t.service1Title,
      description: t.service1Desc,
      image: service1,
    },
    {
      title: t.service2Title,
      description: t.service2Desc,
      image: service2,
    },
    {
      title: t.service3Title,
      description: t.service3Desc,
      image: service3,
    },
    {
      title: t.service4Title,
      description: t.service4Desc,
      image: service4,
    },
    {
      title: t.service5Title,
      description: t.service5Desc,
      image: service5,
    },
    {
      title: t.service6Title,
      description: t.service6Desc,
      image: service6,
    },
    {
      title: t.service7Title,
      description: t.service7Desc,
      image: service7,
    },
    {
      title: t.service8Title,
      description: t.service8Desc,
      image: service8,
    },
  ];

  return (
    <div>
      <ServicesHero />
      <ServicesData services={servicesData} />
      <AboutAsks />
      {/* Additional services content can be added here */}
    </div>
  );
};

export default ServicesPage;
