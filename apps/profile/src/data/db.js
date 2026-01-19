const initialProfile = {
  id: 1,
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  role: "Full Stack Developer",
  location: "San Francisco, CA",
  bio: "Passionate developer with 5+ years of experience in building scalable web applications. Currently focused on React, Node.js, and cloud technologies.",
  joinedDate: "January 2023",
  stats: {
    coursesCompleted: 12,
    coursesInProgress: 3,
    certificatesEarned: 8,
    totalHoursLearned: 156,
  },
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 70 },
    { name: "AWS", level: 65 },
  ],
  recentActivity: [
    {
      id: 1,
      type: "completed",
      course: "Advanced TypeScript Patterns",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "started",
      course: "AWS Cloud Fundamentals",
      date: "1 week ago",
    },
    {
      id: 3,
      type: "certificate",
      course: "Introduction to React",
      date: "2 weeks ago",
    },
  ],
};

const DB_KEY = "mfe_profile";

// Seed data if empty
try {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialProfile));
  }
} catch (e) {
  console.warn("localStorage not available");
}

export const db = {
  getProfile: () => {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY) || "null");
    } catch {
      return null;
    }
  },
  updateProfile: (updates) => {
    const current = db.getProfile() || initialProfile;
    const updated = { ...current, ...updates };
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
    return updated;
  },
};
