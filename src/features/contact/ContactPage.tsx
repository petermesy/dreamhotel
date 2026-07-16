import React from "react";
import ContactHero from "./components/ContactHero";
import ContactChannelCard from "./components/ContactChannelCard";
import ContactStandardsGrid from "./components/ContactStandardsGrid";
import ContactForm from "./components/ContactForm";
import LocationMap from "./components/LocationMap";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.subject,
          eventType: "Contact",
          date: new Date().toISOString(),
          estimatedAttendance: 1,
          cateringRequirement: false,
          message: `${formData.message}\n\nReply email: ${formData.email}`
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send your message.");
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 6000);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen animate-fade-in" id="contact-us-page-container">
      <ContactHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="contact-channels">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactChannelCard
            icon="map"
            title="Our Destination"
            line1={<span>Gofa, Sawla, Ethiopia</span>}
            line2={<span>Centrally situated inside the premium highland district, minutes away from the key municipal facilities and commercial terminals.</span>}
          />
          <ContactChannelCard
            icon="phone"
            title="Direct Hotlines"
            line1={<span>Mobile: <a href="tel:+251985876478" className="text-indigo-600 hover:underline font-bold">+251 985 876 478</a></span>}
            line2={<span>Our front-desk receptionists are active 24 hours a day, 7 days a week, supporting midnight check-ins, local transport coordinators, and immediate guest queries.</span>}
            delay={0.1}
          />
          <ContactChannelCard
            icon="mail"
            title="Digital Correspondence"
            line1={<span>General: <a href="mailto:dreamhotel@gmail.com" className="text-indigo-600 hover:underline font-bold">dreamhotel@gmail.com</a></span>}
            line2={<span>Submit corporate lodging requests, conference room bookings, NGO seminar plans, or special group dining menus directly to our billing department.</span>}
            delay={0.2}
          />
        </div>
      </div>

      <ContactStandardsGrid />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" id="map-form-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <ContactForm
            formData={formData}
            loading={loading}
            success={success}
            onFieldChange={handleFieldChange}
            onSubmit={handleContactSubmit}
          />
          <LocationMap />
        </div>
      </div>
    </div>
  );
}
