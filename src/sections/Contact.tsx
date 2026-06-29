"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SectionTitle } from "../components/SectionTitle";
import {
  FiMail,
  FiMessageSquare,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  href: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: "mail",
    icon: <FiMail className="text-blue-600 dark:text-blue-400" size={22} />,
    iconBg: "bg-blue-100/60 dark:bg-blue-900/30",
    label: "Email Me",
    value: "sandromigilba10@gmail.com",
    href: "mailto:sandromigilba10@gmail.com",
  },
  {
    id: "whatsapp",
    icon: <FiMessageSquare className="text-emerald-600 dark:text-emerald-400" size={22} />,
    iconBg: "bg-emerald-100/60 dark:bg-emerald-900/30",
    label: "WhatsApp",
    value: "+62 895-1643-4876",
    href: "https://wa.me/+6289516434876",
  },
  {
    id: "linkedin",
    icon: <FiLinkedin className="text-indigo-600 dark:text-indigo-400" size={22} />,
    iconBg: "bg-indigo-100/60 dark:bg-indigo-900/30",
    label: "LinkedIn",
    value: "linkedin.com/in/sandromigilba",
    href: "https://www.linkedin.com/in/sandromigilba/",
  },
  {
    id: "github",
    icon: <FiGithub className="text-slate-800 dark:text-slate-200" size={22} />,
    iconBg: "bg-slate-200/50 dark:bg-slate-800/60",
    label: "GitHub",
    value: "github.com/sandromigilba",
    href: "https://github.com/sandromigilba",
  },
];

interface ContactProps {
  title?: string;
  subtitle?: string;
  heading?: string;
  description?: string;
}

export const Contact: React.FC<ContactProps> = ({
  title = "Get In Touch",
  subtitle = "Contact",
  heading = "Let's talk about your project",
  description = "Fill out the form to email me directly, or reach out via my social channels. I usually respond within 24 hours."
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        {/* Large floating contact card */}
        <Card
          hoverable={false}
          className="w-full max-w-5xl mx-auto shadow-blue-500/5 dark:shadow-none p-6 md:p-12 border border-slate-200/60 dark:border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

            {/* Left Column: Direct Methods */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3" dangerouslySetInnerHTML={{ __html: heading }} />
                <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              {/* Direct links list */}
              <div className="flex flex-col gap-6 mb-8 lg:mb-0">
                {contactMethods.map((method) => (
                  <motion.a
                    key={method.id}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div
                      className={`p-3.5 rounded-[16px] flex items-center justify-center transition-transform group-hover:scale-105 ${method.iconBg}`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
                        {method.label}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-brand-blue-accent transition-colors">
                        {method.value}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-[1px] bg-slate-200 dark:bg-slate-800 self-stretch my-2" />

            {/* Right Column: Contact Form */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center p-8 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-[24px]"
                  >
                    <FiCheckCircle
                      className="text-brand-blue dark:text-brand-blue-accent mb-4"
                      size={48}
                    />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed max-w-sm">
                      Thank you for reaching out. I have received your message and will get back to
                      you as soon as possible.
                    </p>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center p-8 bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-[24px]"
                  >
                    <FiAlertCircle className="text-red-500 mb-4" size={48} />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Failed to Send
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed max-w-sm">
                      Something went wrong. Please try again or contact me directly via email.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        label="Full Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        disabled={status === "loading"}
                      />
                      <Input
                        name="email"
                        label="Email Address"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={status === "loading"}
                      />
                    </div>

                    <Input
                      name="subject"
                      label="Subject"
                      placeholder="Project discussion"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={errors.subject}
                      disabled={status === "loading"}
                    />

                    <Input
                      name="message"
                      label="Message"
                      multiline={true}
                      placeholder="How can I help you?"
                      value={formData.message}
                      onChange={handleInputChange}
                      error={errors.message}
                      disabled={status === "loading"}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === "loading"}
                      icon={status === "loading" ? null : <FiSend />}
                      className="w-full mt-2 py-4"
                    >
                      {status === "loading" ? "Sending Message..." : "Send Message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
