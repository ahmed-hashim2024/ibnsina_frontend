import React from "react";
import HeroContactUs from "../components/HeroContactUs";
import ContactUs from "../components/forms/ContactUs";
import Map from "../components/map/Map";

const ContactPage = () => {
  return (
    <div>
      <HeroContactUs />
      <ContactUs />
      {/* Map Section with full width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
