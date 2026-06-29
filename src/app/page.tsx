import { Navigation } from "@/components/Navigation";
import { SocialSidebar } from "@/components/SocialSidebar";
import { BackgroundBackdrop } from "@/components/BackgroundBackdrop";
import { AppLoader } from "@/components/AppLoader";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects, ProjectData } from "@/sections/Projects";
import { Services } from "@/sections/Services";
import { Contact } from "@/sections/Contact";
import db from "@/lib/db";

async function getSiteContent() {
  try {
    const [rows] = await db.query('SELECT section, content_key, content_value FROM site_content');
    const content = rows as { section: string; content_key: string; content_value: string }[];
    
    const result: Record<string, Record<string, string>> = {};
    for (const item of content) {
      if (!result[item.section]) result[item.section] = {};
      result[item.section][item.content_key] = item.content_value;
    }
    return result;
  } catch (error) {
    console.error("Database connection failed. Falling back to default content.", error);
    return {};
  }
}

async function getProjects() {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (rows as any[]).map(r => ({
      ...r,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
      features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
    })) as ProjectData[];
  } catch (error) {
    console.error("Database connection failed. Falling back to default projects.", error);
    return [];
  }
}

export default async function Home() {
  const content = await getSiteContent();
  const projects = await getProjects();
  
  const getContent = (section: string, key: string, fallback: string) => content[section]?.[key] || fallback;

  const heroContent = content["Hero"] || {};
  const aboutContent = content["About"] || {};
  const skillsContent = content["Skills"] || {};
  const servicesContent = content["Services"] || {};
  const contactContent = content["Contact"] || {};

  return (
    <>
      {/* Loading Screen */}
      <AppLoader />

      {/* Animated Parallax Wallpaper Backdrop */}
      <BackgroundBackdrop />

      {/* Sticky Header Navigation */}
      <Navigation />

      {/* Floating Social Sidebar */}
      <SocialSidebar />

      {/* Page Main Content Sections */}
      <main className="w-full relative z-10">
        <Hero 
          title={heroContent.title} 
          description={heroContent.description} 
          title_font_size={heroContent.title_font_size}
        />
        <About 
          title={aboutContent.title}
          description_p1={aboutContent.description_p1}
          description_p2={aboutContent.description_p2}
          show_stats_years={aboutContent.show_stats_years}
          show_stats_projects={aboutContent.show_stats_projects}
          show_stats_clients={aboutContent.show_stats_clients}
          show_stats_awards={aboutContent.show_stats_awards}
          stats_years={aboutContent.stats_years}
          stats_years_label={aboutContent.stats_years_label}
          stats_projects={aboutContent.stats_projects}
          stats_projects_label={aboutContent.stats_projects_label}
          stats_clients={aboutContent.stats_clients}
          stats_clients_label={aboutContent.stats_clients_label}
          stats_awards={aboutContent.stats_awards}
          stats_awards_label={aboutContent.stats_awards_label}
        />
        <Skills 
          title={skillsContent.title}
          subtitle={skillsContent.subtitle}
        />
        <Projects 
          title={getContent("Projects", "title", "Featured Projects")}
          subtitle={getContent("Projects", "subtitle", "My Works")}
          projects={projects}
        />
        <Services 
          title={servicesContent.title}
          subtitle={servicesContent.subtitle}
        />
        <Contact 
          title={contactContent.title}
          subtitle={contactContent.subtitle}
          heading={contactContent.heading}
          description={contactContent.description}
        />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </>
  );
}
