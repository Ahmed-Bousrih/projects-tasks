// src/app/dashboard/[id]/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '../../../../lib/api';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
}

interface Project {
  id: number;
  name: string;
}

export default function ProjectPage() {
  const { id } = useParams(); // project ID from URL
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for creating a task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [taskError, setTaskError] = useState('');

  const fetchProjectAndTasks = useCallback(async () => {
	setLoading(true);
	try {
	  const token = localStorage.getItem('token');
  
	  const projectRes = await api.get(`/projects/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	  });
	  setProject(projectRes.data);
  
	  const tasksRes = await api.get(`/projects/${id}/tasks`, {
		headers: { Authorization: `Bearer ${token}` },
	  });
	  setTasks(tasksRes.data);
	} catch (e) {
	  console.log(e);
	  setError('Failed to fetch project or tasks');
	} finally {
	  setLoading(false);
	}
  }, [id]);
  
  useEffect(() => {
	fetchProjectAndTasks();
  }, [fetchProjectAndTasks]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setTaskError('');

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        `/projects/${id}/tasks`,
        { title: newTaskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) => [...prev, res.data]);
      setNewTaskTitle('');
    } catch (e) {
      console.log(e);
      setTaskError('Failed to create task');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading project...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!project) return <p className="text-center mt-10">Project not found</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>

      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

      {/* Add Task Form */}
      <form onSubmit={handleCreateTask} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={creating}
          className={`p-2 rounded-lg text-white font-semibold ${
            creating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {creating ? 'Adding...' : 'Add Task'}
        </button>
      </form>
      {taskError && <p className="text-red-600 mt-2">{taskError}</p>}

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded shadow hover:bg-gray-50 transition flex justify-between"
            >
              <span>{task.title}</span>
              <span className="text-gray-500 text-sm">{task.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
