import React from 'react';
import { CheckCircle, Calendar, Bell } from 'lucide-react';

const Dashboard = ({ tasks = [] }) => {
  // Today's date at 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const overdueCount = tasks.filter(task => {
    if (task.completed || !task.deadline) return false;
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
  }).length;

  const upcomingCount = tasks.filter(task => {
    if (task.completed || !task.deadline) return false;
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    const diffTime = deadline - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 3;
  }).length;

  const taskCategories = [...new Set(tasks.map(t => t.category).filter(Boolean))];
  const categoryStats = taskCategories.map(category => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const categoryCompleted = categoryTasks.filter(t => t.completed).length;
    return {
      name: category,
      total: categoryTasks.length,
      completed: categoryCompleted,
      percentage: categoryTasks.length > 0
        ? Math.round((categoryCompleted / categoryTasks.length) * 100)
        : 0,
    };
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's your task overview.</p>
      </div>

      <div className="stats-grid">
        {/* Completion Rate */}
        <div className="stat-card">
          <div className="stat-icon completion">
            <CheckCircle size={28} />
          </div>
          <div className="stat-info">
            <h3>Completion Rate</h3>
            <div className="stat-value">
              <div className="stat-circle-progress">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#e0e0e0" strokeWidth="6" />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="6"
                    strokeDasharray={`${completionRate * 1.5} 150`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                  />
                  <text
                    x="30"
                    y="35"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    {completionRate}%
                  </text>
                </svg>
              </div>
              <p>{completedCount} of {totalCount} tasks completed</p>
            </div>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="stat-card">
          <div className="stat-icon overdue">
            <Calendar size={28} />
          </div>
          <div className="stat-info">
            <h3>Overdue Tasks</h3>
            <div className="stat-value">
              {/* Single cube with count */}
              <div className="cube overdue">{overdueCount}</div>
              <p>{overdueCount > 0 ? 'Needs attention!' : 'All caught up!'}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <Bell size={28} />
          </div>
          <div className="stat-info">
            <h3>Upcoming Deadlines</h3>
            <div className="stat-value">
              {/* Single cube with count */}
              <div className="cube upcoming">{upcomingCount}</div>
              <p>Due in the next 3 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="dashboard-sections">
        <div className="category-progress">
          <h3>Progress by Category</h3>
          <div className="category-bars">
            {categoryStats.map(cat => (
              <div key={cat.name} className="category-progress-item">
                <div className="category-label">
                  <span>{cat.name}</span>
                  <span>{cat.percentage}%</span>
                </div>
                <div className="category-progress-bar">
                  <div
                    className="category-progress-fill"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
