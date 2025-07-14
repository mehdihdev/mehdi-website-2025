import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ExternalLinkIcon, CodeIcon, DocumentTextIcon } from '@heroicons/react/outline';
import ReactMarkdown from 'react-markdown';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project.title}</h2>
                <div className="flex space-x-2">
                  {project.github && (
                    <button
                      onClick={() => handleExternalLink(project.github)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
                      title="GitHub Repository"
                    >
                      <CodeIcon className="w-5 h-5" />
                    </button>
                  )}
                  {project.website && (
                    <button
                      onClick={() => handleExternalLink(project.website)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
                      title="Live Website"
                    >
                      <ExternalLinkIcon className="w-5 h-5" />
                    </button>
                  )}
                  {project.paper && (
                    <button
                      onClick={() => handleExternalLink(project.paper)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
                      title="Research Paper"
                    >
                      <DocumentTextIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Project Image */}
              {project.image && (
                <div className="w-full h-64 bg-gray-200 dark:bg-slate-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Short Description */}
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Detailed Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-blue-600 dark:prose-headings:text-blue-400 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <span className="text-gray-900 dark:text-white font-semibold">
                          {children}
                        </span>
                      ),
                      em: ({ children }) => (
                        <span className="text-blue-600 dark:text-blue-400 italic">
                          {children}
                        </span>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 mt-8">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4 mt-8">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 mt-6">
                          {children}
                        </h3>
                      ),
                    }}
                  >
                    {project.content}
                  </ReactMarkdown>
                </div>

                {/* Project Links Section */}
                {(project.github || project.website || project.paper) && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Links</h3>
                    <div className="flex flex-wrap gap-4">
                      {project.github && (
                        <button
                          onClick={() => handleExternalLink(project.github)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                        >
                          <CodeIcon className="w-4 h-4 mr-2" />
                          View Code
                        </button>
                      )}
                      {project.website && (
                        <button
                          onClick={() => handleExternalLink(project.website)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                        >
                          <ExternalLinkIcon className="w-4 h-4 mr-2" />
                          Live Demo
                        </button>
                      )}
                      {project.paper && (
                        <button
                          onClick={() => handleExternalLink(project.paper)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                        >
                          <DocumentTextIcon className="w-4 h-4 mr-2" />
                          Read Paper
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
