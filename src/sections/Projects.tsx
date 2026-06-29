"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { SectionTitle } from "../components/SectionTitle";
import { FiExternalLink, FiGithub, FiMaximize2 } from "react-icons/fi";

export interface ProjectData {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  tags: string[];
  live_url: string;
  github_url: string;
  image_base64: string;
  features: string[];
}

interface ProjectsProps {
  title?: string;
  subtitle?: string;
  projects?: ProjectData[];
}

export const Projects: React.FC<ProjectsProps> = ({
  title = "Featured Projects",
  subtitle = "My Works",
  projects = []
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section id="projects" className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transitionEnd: { filter: "none" },
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="flex"
            >
              <Card
                className="w-full flex flex-col justify-between p-5 h-full hover:shadow-blue-500/10 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  {/* Project Image */}
                  <div className="w-full h-48 flex items-center justify-center mb-6 overflow-hidden rounded-[20px] shadow-sm backdrop-blur-xl bg-transparent border border-white/15 dark:border-white/10 relative">
                    {project.image_base64 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image_base64} alt={project.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-400">No Image</div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                    {project.name}
                    <FiMaximize2 className="text-slate-400 hover:text-brand-blue-accent" size={16} />
                  </h3>

                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-6 text-left">
                    {project.short_description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="primary">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary">+{project.tags.length - 3} more</Badge>
                    )}
                  </div>

                  {/* CTAs */}
                  <div
                    className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<FiExternalLink />}
                      onClick={() => window.open(project.live_url, "_blank")}
                      className="flex-1 py-2 text-xs"
                    >
                      Demo
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<FiGithub />}
                      onClick={() => window.open(project.github_url, "_blank")}
                      className="flex-1 py-2 text-xs"
                    >
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal for detail view */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.name}
        >
          {selectedProject && (
            <div className="flex flex-col gap-6 text-left">
              {/* Image Preview */}
              <div className="w-full max-h-64 flex items-center justify-center overflow-hidden rounded-[20px] bg-transparent border border-white/15 dark:border-white/10 shadow-inner backdrop-blur-md">
                {selectedProject.image_base64 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedProject.image_base64} alt={selectedProject.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="p-12 text-slate-400">No Image Available</div>
                )}
              </div>

              {/* Extended Description */}
              <div>
                <h4 className="text-sm uppercase font-bold text-brand-blue dark:text-brand-blue-accent tracking-wider mb-2">
                  Project Overview
                </h4>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                  {selectedProject.long_description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-sm uppercase font-bold text-brand-blue dark:text-brand-blue-accent tracking-wider mb-3">
                  Key Features
                </h4>
                <ul className="list-disc pl-5 flex flex-col gap-2 text-slate-800 dark:text-slate-200">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div>
                <h4 className="text-sm uppercase font-bold text-brand-blue dark:text-brand-blue-accent tracking-wider mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <Button
                  variant="primary"
                  icon={<FiExternalLink />}
                  onClick={() => window.open(selectedProject.live_url, "_blank")}
                  className="flex-1 py-3"
                >
                  Live Demonstration
                </Button>
                <Button
                  variant="secondary"
                  icon={<FiGithub />}
                  onClick={() => window.open(selectedProject.github_url, "_blank")}
                  className="flex-1 py-3"
                >
                  View GitHub Source
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};
