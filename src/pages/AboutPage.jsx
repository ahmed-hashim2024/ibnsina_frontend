import PageHero from "../components/common/PageHero";
import heroImage from "../assets/image/abouthero4.png";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import AboutWhyChooseUs from "../components/AboutWhyChooseUs";
import AboutOurProjects from "../components/AboutOurProjects";
import AboutAsks from "../components/AboutAsks";
import AboutVision from "../components/AboutVision";
import AboutMission from "../components/AboutMission";

const AboutPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  return (
    <div>
      <PageHero
        title={t.aboutTitle}
        description={t.aboutDescription}
        backgroundImage={heroImage}
      />

      <AboutVision />
      <AboutMission />
      <AboutWhyChooseUs />
      <AboutAsks />
    </div>
  );
};

export default AboutPage;
