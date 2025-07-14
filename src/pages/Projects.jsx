import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedTags]);

  const loadProjects = async () => {
    try {
      // Import all markdown files from the projects directory
      const projectModules = import.meta.glob('/projects/*.md', { as: 'raw' });
      const projectsData = [];
      
      for (const path in projectModules) {
        const content = await projectModules[path]();
        const project = parseMarkdownProject(content, path);
        projectsData.push(project);
      }
      
      // Sort by date (newest first)
      projectsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setProjects(projectsData);
      
      // Extract all unique tags
      const tags = [...new Set(projectsData.flatMap(project => project.tags))];
      setAllTags(tags);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setIsLoading(false);
    }
  };

  const parseMarkdownProject = (content, path) => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      throw new Error('Invalid markdown format');
    }
    
    const frontmatter = match[1];
    const body = match[2];
    
    const metadata = {};
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        if (key.trim() === 'tags') {
          metadata[key.trim()] = JSON.parse(value);
        } else {
          metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      }
    });
    
    return {
      ...metadata,
      content: body,
      slug: path.split('/').pop().replace('.md', ''),
      featured: metadata.featured === 'true' || metadata.featured === true
    };
  };

  const filterProjects = () => {
    if (selectedTags.length === 0) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        selectedTags.every(tag => project.tags?.includes(tag))
      );
      setFilteredProjects(filtered);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my work spanning web development, machine learning, research, and creative projects.
          </p>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            {/* All Filter Button */}
            <button
              onClick={() => setSelectedTags([])}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTags.length === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => openProjectModal(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found with the selected filters.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </div>
  );
};

export default Projects;
