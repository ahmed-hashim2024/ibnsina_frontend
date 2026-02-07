import React, { useState } from "react";
import { sendContactMessage } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const ContactUs = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await sendContactMessage({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      alert(
        lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!",
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert(lang === "ar" ? "حدث خطأ أثناء الإرسال" : "Error sending message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-32"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form Section */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.firstName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={t.firstNamePlaceholder}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 
                             focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 
                             transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.lastName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={t.lastNamePlaceholder}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 
                             focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 
                             transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 
                             focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 
                             transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={t.phonePlaceholder}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="px-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 
                             focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 
                             transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700"
                >
                  {t.subject} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t.subjectPlaceholder}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="px-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 
                           focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 
                           transition-all duration-300 placeholder:text-gray-400"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  {t.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="px-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 
                           focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 
                           transition-all duration-300 placeholder:text-gray-400 resize-vertical min-h-30"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-sky-500 text-white font-semibold px-8 py-3.5 rounded-lg text-base cursor-pointer 
                           transition-all duration-300 self-start shadow-lg shadow-blue-900/30
                           hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/40
                           active:translate-y-0 sm:w-auto w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {lang === "ar" ? "جاري الإرسال..." : "Sending..."}
                  </>
                ) : (
                  t.sendMessage
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Card */}
          <div
            className="bg-linear-to-br from-sky-500 to-sky-600 text-white p-10 rounded-3xl 
                       shadow-2xl shadow-blue-900/30 flex flex-col gap-8 lg:sticky lg:top-24"
          >
            {/* Address */}
            <div className="pb-6 border-b border-white/20">
              <h3 className="text-lg font-semibold mb-4">{t.addressTitle}</h3>
              <p className="text-sm leading-relaxed text-white/90">
                {t.address}
              </p>
            </div>

            {/* Contact */}
            <div className="pb-6 border-b border-white/20">
              <h3 className="text-lg font-semibold mb-4">{t.contactTitle2}</h3>
              <p className="text-sm my-1.5 text-white/90">
                <strong>{t.phone}</strong> +2001011400291
              </p>
              <p className="text-sm my-1.5 text-white/90">
                <strong>{t.email}</strong> ibnsina@gmail.com
              </p>
            </div>

            {/* Clinic Hours */}
            <div className="pb-6 border-b border-white/20">
              <h3 className="text-lg font-semibold mb-4">{t.clinicHours}</h3>
              <div className="flex justify-between my-2 text-sm text-white/90">
                <span>{t.saturdayWednesday}</span>
                <span>09:00 - 18:00</span>
              </div>

              <div className="flex justify-between my-2 text-sm text-white/90">
                <span>{t.friday}</span>
                <span>{t.closed}</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.stayConnected}</h3>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-white text-lg 
                           transition-all duration-300 backdrop-blur-md
                           hover:bg-white hover:text-sky-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-white text-lg 
                           transition-all duration-300 backdrop-blur-md
                           hover:bg-white hover:text-sky-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-white text-lg 
                           transition-all duration-300 backdrop-blur-md
                           hover:bg-white hover:text-sky-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-white text-lg 
                           transition-all duration-300 backdrop-blur-md
                           hover:bg-white hover:text-sky-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
