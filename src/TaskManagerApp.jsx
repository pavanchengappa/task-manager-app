import React, { useState, useEffect } from 'react';
import { Home, Layers, Moon, Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Notification from './components/Notification';

const TaskManagerApp = () => {
  // Main state
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, title: 'Complete project proposal', description: 'Finish the quarterly project proposal for the marketing team', priority: 'high', deadline: '2025-03-10', completed: false, category: 'work' },
          { id: 2, title: 'Schedule dentist appointment', description: 'Call Dr. Smith to book a check-up', priority: 'medium', deadline: '2025-03-20', completed: false, category: 'personal' },
          { id: 3, title: 'Buy groceries', description: 'Milk, eggs, bread, vegetables', priority: 'low', deadline: '2025-03-07', completed: true, category: 'personal' },
          { id: 4, title: 'Review team performance', description: 'Quarterly review of team metrics and KPIs', priority: 'high', deadline: '2025-03-15', completed: false, category: 'work' },
          { id: 5, title: 'Update portfolio website', description: 'Add recent projects and refresh design', priority: 'medium', deadline: '2025-03-25', completed: false, category: 'personal' }
        ];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [animateCard, setAnimateCard] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    completed: false,
    category: 'personal'
  });

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Notification helper
  const displayNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Task CRUD functions
  const handleAddTask = () => {
    if (!newTask.title) return;
    const task = { ...newTask, id: Date.now() };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium', deadline: '', completed: false, category: 'personal' });
    setModalOpen(false);
    displayNotification('Task added successfully');
  };

  const handleUpdateTask = () => {
    if (!editTask.title) return;
    setTasks(tasks.map(task => task.id === editTask.id ? editTask : task));
    setEditTask(null);
    setModalOpen(false);
    displayNotification('Task updated successfully');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    displayNotification('Task deleted');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = !task.completed;
        if (newStatus) displayNotification('Great job! Task completed 🎉');
        return { ...task, completed: newStatus };
      }
      return task;
    }));
  };

  // Compute filtered tasks based on filter and category
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      if (filter === 'overdue') return !task.completed && new Date(task.deadline) < new Date();
      if (filter === 'upcoming') {
        const today = new Date();
        const deadline = new Date(task.deadline);
        const diffTime = Math.abs(deadline - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return !task.completed && diffDays <= 3 && deadline > today;
      }
      return true;
    })
    .filter(task => {
      if (categoryFilter === 'all') return true;
      return task.category === categoryFilter;
    });

  const handleCardHover = (id) => {
    setAnimateCard(id);
  };

  // Get unique categories for the dropdown filter
  const categories = ['all', ...new Set(tasks.map(task => task.category))];

  return (
    <div className="task-manager-app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <nav>
          <button onClick={() => setCurrentPage('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>
            <Home size={16} /> Dashboard
          </button>
          <button onClick={() => setCurrentPage('tasks')} className={currentPage === 'tasks' ? 'active' : ''}>
            <Layers size={16} /> Tasks
          </button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </header>
      
      <main>
        {currentPage === 'dashboard' && <Dashboard tasks={tasks} />}
        {currentPage === 'tasks' && (
          <TaskList
            tasks={filteredTasks}
            filter={filter}
            setFilter={setFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
            toggleComplete={toggleComplete}
            handleDeleteTask={handleDeleteTask}
            setEditTask={setEditTask}
            setModalOpen={setModalOpen}
            animateCard={animateCard}
            handleCardHover={handleCardHover}
          />
        )}
      </main>
      
      {modalOpen && (
        <TaskModal
          modalOpen={modalOpen}
          editTask={editTask}
          newTask={newTask}
          setNewTask={setNewTask}
          setEditTask={setEditTask}
          setModalOpen={setModalOpen}
          handleAddTask={handleAddTask}
          handleUpdateTask={handleUpdateTask}
        />
      )}

      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
};

export default TaskManagerApp;
