"use client";

import React, { useEffect, useState, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiSave, FiX, FiCheckCircle, FiAlertCircle, FiFolder } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const COMMON_TAGS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", 
  "Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", 
  "Framer Motion", "Prisma", "Supabase", "Vue", "Angular"
];

interface Project {
  id?: number;
  name: string;
  short_description: string;
  long_description: string;
  tags: string[];
  live_url: string;
  github_url: string;
  features: string[];
  image_base64: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form states
  const [formData, setFormData] = useState<Project>({
    name: "",
    short_description: "",
    long_description: "",
    tags: [],
    live_url: "",
    github_url: "",
    features: [],
    image_base64: "",
  });


  const [featuresInput, setFeaturesInput] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to load projects." });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => { fetchProjects(); }, []);

  const openModal = (project?: Project) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : JSON.parse((project.tags as unknown as string) || "[]"),
        features: Array.isArray(project.features) ? project.features : JSON.parse((project.features as unknown as string) || "[]"),
      });

      setFeaturesInput(Array.isArray(project.features) ? project.features.join("\n") : JSON.parse((project.features as unknown as string) || "[]").join("\n"));
    } else {
      setCurrentProject(null);
      setFormData({
        name: "",
        short_description: "",
        long_description: "",
        tags: [],
        live_url: "",
        github_url: "",
        features: [],
        image_base64: "",
      });

      setFeaturesInput("");
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        let width = img.width;
        let height = img.height;
        
        // Scale down if too large (max width 1200)
        const MAX_WIDTH = 1200;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // Iterative compression to hit < 200KB limit
        let quality = 0.9;
        let base64 = canvas.toDataURL("image/jpeg", quality);
        
        while (base64.length > 200000 && quality > 0.1) {
          quality -= 0.1;
          base64 = canvas.toDataURL("image/jpeg", quality);
        }

        setFormData((prev) => ({ ...prev, image_base64: base64 }));
        setCompressing(false);
      };
    };
  };

  const saveProject = async () => {
    setSaving(true);
    try {
      const featuresArray = featuresInput.split("\n").map(f => f.trim()).filter(Boolean);
      
      const payload = {
        ...formData,
        features: featuresArray
      };

      const url = currentProject?.id ? `/api/projects/${currentProject.id}` : "/api/projects";
      const method = currentProject?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save project");
      
      setNotification({ type: "success", message: "Project saved successfully." });
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to save project." });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setNotification({ type: "success", message: "Project deleted." });
      fetchProjects();
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to delete project." });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 backdrop-blur-md ${
          notification.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
        }`}>
          {notification.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-300">Manage your portfolio projects here.</p>
        </div>
        <Button variant="primary" onClick={() => openModal()} icon={<FiPlus />}>
          Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center shadow-sm">
          <FiFolder size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
          <p className="text-slate-300 mb-6">Create your first project to showcase your work.</p>
          <Button variant="primary" onClick={() => openModal()} icon={<FiPlus />}>Add Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              {proj.image_base64 ? (
                <div className="h-48 w-full bg-black/30 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={proj.image_base64} alt={proj.name} className="w-full h-full object-cover opacity-90" />
                </div>
              ) : (
                <div className="h-48 w-full bg-black/30 flex items-center justify-center text-slate-400">
                  <FiImage size={32} />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-white line-clamp-1">{proj.name}</h3>
                <p className="text-sm text-slate-300 mt-1 line-clamp-2 flex-1">{proj.short_description}</p>
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                  <Button variant="secondary" size="sm" onClick={() => openModal(proj)} className="flex-1 justify-center bg-white/5 border-white/10 text-white hover:bg-white/10" icon={<FiEdit2 />}>Edit</Button>
                  <Button variant="secondary" size="sm" onClick={() => deleteProject(proj.id!)} className="px-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 bg-white/5 border-white/10">
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a]/95 backdrop-blur-2xl border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0f172a]/95 backdrop-blur-2xl z-10">
              <h2 className="text-xl font-bold text-white">{currentProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">Project Image (Auto-compressed to &lt;200KB)</label>
                
                <div 
                  className="w-full aspect-video border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-white/5 transition-colors relative group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {compressing ? (
                    <div className="text-brand-blue flex flex-col items-center">
                      <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="font-semibold text-sm">Compressing Image...</span>
                    </div>
                  ) : formData.image_base64 ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.image_base64} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-semibold flex items-center gap-2"><FiEdit2 /> Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <FiImage size={32} className="mb-2" />
                      <span className="font-medium text-sm">Click to upload image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-200">Project Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white placeholder-slate-500" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-200">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set([...COMMON_TAGS, ...formData.tags])).map(tag => {
                      const isSelected = formData.tags.includes(tag);
                      return (
                        <label key={tag} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-brand-blue/20 border-brand-blue/50 text-brand-blue-accent" 
                            : "bg-black/20 border-white/10 text-slate-300 hover:bg-white/5"
                        }`}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, tags: [...formData.tags, tag] });
                              } else {
                                setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
                              }
                            }}
                          />
                          {tag}
                        </label>
                      );
                    })}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input 
                      type="text" 
                      placeholder="Add custom tag (press Enter)" 
                      className="px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm text-white flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val && !formData.tags.includes(val)) {
                            setFormData({ ...formData, tags: [...formData.tags, val] });
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">Short Description</label>
                <textarea value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} rows={2} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white placeholder-slate-500 resize-y" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">Long Description</label>
                <textarea value={formData.long_description} onChange={e => setFormData({...formData, long_description: e.target.value})} rows={4} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white placeholder-slate-500 resize-y" />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">Features (One per line)</label>
                <textarea value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} rows={4} placeholder="Feature 1&#10;Feature 2" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white placeholder-slate-500 resize-y" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-200">Live URL</label>
                  <input type="url" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white placeholder-slate-500" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-200">GitHub URL</label>
                  <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-white placeholder-slate-500" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0f172a]/95 backdrop-blur-2xl z-10">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</Button>
              <Button variant="primary" onClick={saveProject} disabled={saving || compressing || !formData.name || !formData.short_description} icon={<FiSave />}>
                {saving ? "Saving..." : "Save Project"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
