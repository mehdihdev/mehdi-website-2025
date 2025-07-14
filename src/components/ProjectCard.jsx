import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, CodeIcon, DocumentTextIcon } from '@heroicons/react/outline';

const ProjectCard = ({ project, onClick }) => {
  const handleExternalLink = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
      onClick={onClick}
    >
      {/* Project Image */}
      {project.image && (
        <div className="h-48 bg-gray-200 dark:bg-slate-700 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        {/* Title and Links */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex-1">
            {project.title}
          </h3>
          <div className="flex space-x-2 ml-4">
            {project.github && (
              <button
                onClick={(e) => handleExternalLink(e, project.github)}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <CodeIcon className="w-5 h-5" />
              </button>
            )}
            {project.website && (
              <button
                onClick={(e) => handleExternalLink(e, project.website)}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Live Website"
              >
                <ExternalLinkIcon className="w-5 h-5" />
              </button>
            )}
            {project.paper && (
              <button
                onClick={(e) => handleExternalLink(e, project.paper)}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Research Paper"
              >
                <DocumentTextIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {project.tags?.length > 4 && (
            <span className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="inline-block">
            <span className="bg-blue-100 dark:bg-blue-400/20 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Click to view more */}
        <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
          Click to view details →
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
