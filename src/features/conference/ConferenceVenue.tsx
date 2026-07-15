import React from "react";
import ConferenceHeader from "./components/ConferenceHeader";
import ConferenceCarousel from "./components/ConferenceCarousel";
import VenueSpecificationsCard from "./components/VenueSpecificationsCard";
import HireTariffsAndAVCard from "./components/HireTariffsAndAVCard";
import AdditionalFeaturesCard from "./components/AdditionalFeaturesCard";
import VenueEnquiryForm from "./components/VenueEnquiryForm";

export default function ConferenceVenue() {
  const [formData, setFormData] = React.useState({
    name: "",
    organization: "",
    eventType: "Conference",
    date: "",
    estimatedAttendance: "",
    cateringRequirement: false,
    message: ""
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const conferenceImages = [
    "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768436/0V1A3568_cb5a05.jpg",
    "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768391/0V1A3574_khwj2b.jpg",
    "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783760802/0V1A3580_lvirqe.jpg",
    "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768677/0V1A3582_jrconh.jpg",
  ];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % conferenceImages.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + conferenceImages.length) % conferenceImages.length);
  };

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      nextSlide();
    }, 4500);
    return () => window.clearInterval(timer);
  }, [carouselIndex]);

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit enquiry form");
      }

      setSuccess(true);
      setFormData({
        name: "",
        organization: "",
        eventType: "Conference",
        date: "",
        estimatedAttendance: "",
        cateringRequirement: false,
        message: ""
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ConferenceHeader />

        <ConferenceCarousel
          images={conferenceImages}
          activeIndex={carouselIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
          onSelect={setCarouselIndex}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <VenueSpecificationsCard />
          <HireTariffsAndAVCard />
          <AdditionalFeaturesCard />
        </div>

        <VenueEnquiryForm
          formData={formData}
          loading={loading}
          error={error}
          success={success}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
