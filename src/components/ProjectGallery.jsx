import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectGallery = ({ images }) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  if (!images || images.length === 0) {
    return null;
  }

  // تحويل صور المشروع من الباكند للصيغة المناسبة
  const galleryImages = images.map((img) => ({
    id: img.id,
    url: typeof img === "string" ? img : img.image,
    alt: `Gallery Image ${img.order || img.id}`,
  }));

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.projectGallery || "Project Gallery"}
        </h2>
      </div>

      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={galleryImages.length > 1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 30 },
            768: { slidesPerView: 2.2, spaceBetween: 40 },
            1024: { slidesPerView: 2.5, spaceBetween: 50 },
          }}
          className="project-gallery-swiper pb-16 px-4! md:px-0!"
        >
          {galleryImages.map((img) => (
            <SwiperSlide
              key={img.id}
              className="rounded-3xl overflow-hidden shadow-xl aspect-video"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectGallery;
