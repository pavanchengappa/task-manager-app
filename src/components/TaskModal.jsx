import React from 'react';
import { X } from 'lucide-react';

const TaskModal = ({
  modalOpen,
  editTask,
  newTask,
  setNewTask,
  setEditTask,
  setModalOpen,
  handleAddTask,
  handleUpdateTask
}) => {
  const modalTask = editTask || newTask;
  return (
    <div className="modal-overlay" onClick={() => { setModalOpen(false); setEditTask(null); }}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editTask ? 'Edit Task' : 'Add New Task'}</h2>
          <button className="close-btn" onClick={() => { setModalOpen(false); setEditTask(null); }}>
            <X size={20} />
          </button>
        </div>
        
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={modalTask.title} 
            onChange={e => editTask 
              ? setEditTask({ ...editTask, title: e.target.value }) 
              : setNewTask({ ...newTask, title: e.target.value })
            } 
            placeholder="Task title"
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={modalTask.description} 
            onChange={e => editTask 
              ? setEditTask({ ...editTask, description: e.target.value }) 
              : setNewTask({ ...newTask, description: e.target.value })
            } 
            placeholder="Add details..."
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select 
              value={modalTask.priority} 
              onChange={e => editTask 
                ? setEditTask({ ...editTask, priority: e.target.value }) 
                : setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={modalTask.category}
              onChange={e => editTask 
                ? setEditTask({ ...editTask, category: e.target.value }) 
                : setNewTask({ ...newTask, category: e.target.value })
              }
              placeholder="e.g., work, personal, study"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Deadline</label>
          <input 
            type="date" 
            value={modalTask.deadline} 
            onChange={e => editTask 
              ? setEditTask({ ...editTask, deadline: e.target.value }) 
              : setNewTask({ ...newTask, deadline: e.target.value })
            } 
          />
        </div>
        
        <div className="modal-actions">
          <button 
            className="primary-btn" 
            onClick={editTask ? handleUpdateTask : handleAddTask}
          >
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
