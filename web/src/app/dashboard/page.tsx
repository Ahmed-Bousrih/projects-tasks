// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../../lib/api';

interface Project {
  id: number;
  name: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (e) {
      setError('Failed to fetch projects');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormError('');

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/projects',
        { name: newProjectName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects([res.data, ...projects]);
      setNewProjectName('');
      setShowForm(false);
    } catch (e) {
      console.log(e);
      setFormError('Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateProject}
          className="mb-6 flex gap-2 items-center"
        >
          <input
            type="text"
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="flex-1 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg text-white ${
              creating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={creating}
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
          {formError && <p className="text-red-600 text-sm">{formError}</p>}
        </form>
      )}

      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block p-4 border rounded shadow hover:bg-gray-50 transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
              <p className="text-gray-500 text-sm mt-1">
                Created at: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
