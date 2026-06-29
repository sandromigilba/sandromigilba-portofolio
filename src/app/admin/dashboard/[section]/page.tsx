"use client";

import React, { useEffect, useState } from "react";
import { FiSave, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter } from "next/navigation";

// Define the schema for sections to enforce order and nice labels
const SECTIONS_SCHEMA = [
  {
    id: "hero",
    title: "Hero Section",
    fields: [
      { key: "title", label: "Hero Title (HTML allowed)", type: "textarea" },
      { key: "title_font_size", label: "Hero Title Font Size (e.g. 64px, 4rem)", type: "text" },
      { key: "description", label: "Hero Description", type: "textarea" },
    ],
  },
  {
    id: "about",
    title: "About Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "description_p1", label: "Description Paragraph 1", type: "textarea" },
      { key: "description_p2", label: "Description Paragraph 2", type: "textarea" },
      { key: "show_stats_years", label: "Show Years Experience Box", type: "checkbox" },
      { key: "stats_years", label: "Years Experience Value", type: "text" },
      { key: "stats_years_label", label: "Years Experience Title", type: "text" },
      { key: "show_stats_projects", label: "Show Projects Completed Box", type: "checkbox" },
      { key: "stats_projects", label: "Projects Completed Value", type: "text" },
      { key: "stats_projects_label", label: "Projects Completed Title", type: "text" },
      { key: "show_stats_clients", label: "Show Happy Clients Box", type: "checkbox" },
      { key: "stats_clients", label: "Happy Clients Value", type: "text" },
      { key: "stats_clients_label", label: "Happy Clients Title", type: "text" },
      { key: "show_stats_awards", label: "Show Awards Won Box", type: "checkbox" },
      { key: "stats_awards", label: "Awards Won Value", type: "text" },
      { key: "stats_awards_label", label: "Awards Won Title", type: "text" },
    ],
  },
  {
    id: "skills",
    title: "Skills Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "text" },
    ],
  },
  {
    id: "services",
    title: "Services Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "text" },
    ],
  },
  {
    id: "contact",
    title: "Contact Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  }
];

export default function SectionEditorPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = (params.section as string).toLowerCase();

  const sectionDef = SECTIONS_SCHEMA.find((s) => s.id === sectionId);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!sectionDef) {
      router.push("/admin/dashboard");
      return;
    }

    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content");
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        
        // Find matching section by capitalizing first letter if needed
        // Note: API returns Capitalized keys (e.g. "Hero")
        const apiSectionKey = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        setFormData(data[apiSectionKey] || {});
      } catch (err) {
        console.error(err);
        setNotification({ type: "error", message: "Failed to load content from database." });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [sectionId, sectionDef, router]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setNotification(null);
    try {
      const apiSectionKey = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: apiSectionKey, data: formData }),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      
      setNotification({ type: "success", message: `${sectionDef?.title} updated successfully.` });
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: `Failed to save ${sectionDef?.title}.` });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (!sectionDef) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 backdrop-blur-md ${
          notification.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {notification.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <div className="px-6 py-5 border-b border-white/10 bg-black/20 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">{sectionDef.title}</h3>
            <p className="text-slate-300 text-sm mt-1">Manage content for the {sectionDef.title.toLowerCase()}</p>
          </div>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
            icon={<FiSave />}
            className="py-2.5 px-5 shadow-blue-glow"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        <div className="p-6 space-y-6">
          {sectionDef.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              {field.type !== "checkbox" && (
                <label className="block text-sm font-bold text-slate-200">
                  {field.label}
                </label>
              )}
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.key] || ""}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white font-medium resize-y placeholder-slate-500"
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center mt-2 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[field.key] !== "false"}
                      onChange={(e) => handleInputChange(field.key, e.target.checked ? "true" : "false")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue-accent border border-white/20 shadow-inner"></div>
                  </label>
                  <span className="ml-3 text-slate-300 text-sm font-bold">{field.label}</span>
                </div>
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white font-medium placeholder-slate-500"
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
