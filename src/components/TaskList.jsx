import React from 'react';
import { Circle, CheckCircle, Settings, Trash2, Plus } from 'lucide-react';

const TaskList = ({
  tasks,
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  toggleComplete,
  handleDeleteTask,
  setEditTask,
  setModalOpen,
  animateCard,
  handleCardHover
}) => {
  return (
    <div className="task-list">
      <div className="list-header">
        <h2>Tasks</h2>
        <button 
          className="add-task-btn" 
          onClick={() => {
            setEditTask(null);
            setModalOpen(true);
          }}
        >
          <Plus size={16} /> Add Task
        </button>
      </div>
      
      <div className="filters">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
          <option value="upcoming">Upcoming</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="tasks-container">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`task-card ${animateCard === task.id ? 'animate' : ''}`}
            onMouseEnter={() => handleCardHover(task.id)}
          >
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <p><strong>Category:</strong> {task.category}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
              </button>
              <button onClick={() => { setEditTask(task); setModalOpen(true); }}>
                <Settings size={16} />
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="no-tasks">No tasks to display.</p>}
      </div>
    </div>
  );
};

export default TaskList;
