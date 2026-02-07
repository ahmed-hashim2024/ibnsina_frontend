import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const AboutAsks = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  // Questions Data
  const questions = [
    { id: 1, question: t.faqQ1, answer: t.faqA1 },
    { id: 2, question: t.faqQ2, answer: t.faqA2 },
    { id: 3, question: t.faqQ3, answer: t.faqA3 },
    { id: 4, question: t.faqQ4, answer: t.faqA4 },
    { id: 5, question: t.faqQ5, answer: t.faqA5 },
  ];

  // State for active accordion item
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-10 bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* === Left Side: Title & Description === */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4 leading-tight">
              {t.faqTitle}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{t.faqDesc}</p>
          </div>

          {/* === Right Side: Accordion Questions === */}
          <div className="lg:col-span-7 space-y-2">
            {questions.map((item) => (
              <div
                key={item.id}
                className={`border-b border-gray-200 pb-4 last:border-0`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex justify-between items-center py-3 text-start group hover:text-sky-600 transition-colors duration-300"
                >
                  <span className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300 leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`text-xs p-2 rounded-full border transition-colors duration-300 ${
                      activeId === item.id
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-400 border-gray-300 group-hover:border-sky-600 group-hover:text-sky-600"
                    }`}
                  >
                    {activeId === item.id ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 leading-relaxed pb-3 text-sm">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAsks;
