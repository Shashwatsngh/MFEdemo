const initialCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React including components, state, and props.",
    instructor: "Sarah Johnson",
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    students: 15420,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    category: "Frontend",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    description:
      "Master advanced TypeScript concepts for enterprise applications.",
    instructor: "Michael Chen",
    duration: "12 hours",
    level: "Advanced",
    rating: 4.9,
    students: 8930,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
    category: "Programming",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    description: "Build scalable backend services with Node.js and Express.",
    instructor: "Emily Davis",
    duration: "15 hours",
    level: "Intermediate",
    rating: 4.7,
    students: 12150,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    category: "Backend",
  },
  {
    id: 4,
    title: "AWS Cloud Fundamentals",
    description: "Get started with cloud computing using Amazon Web Services.",
    instructor: "David Wilson",
    duration: "10 hours",
    level: "Beginner",
    rating: 4.6,
    students: 9870,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    category: "Cloud",
  },
  {
    id: 5,
    title: "Python for Data Science",
    description:
      "Learn Python programming for data analysis and machine learning.",
    instructor: "Lisa Martinez",
    duration: "20 hours",
    level: "Intermediate",
    rating: 4.9,
    students: 21340,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
    category: "Data Science",
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    description:
      "Master the art of creating beautiful and user-friendly interfaces.",
    instructor: "Alex Thompson",
    duration: "14 hours",
    level: "Beginner",
    rating: 4.8,
    students: 7650,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
  },
];

const DB_KEY = "mfe_courses";

// Seed data if empty
try {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialCourses));
  }
} catch (e) {
  console.warn("localStorage not available");
}

export const db = {
  getCourses: () => {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY) || "[]");
    } catch {
      return [];
    }
  },
  addCourse: (course) => {
    const courses = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
    const newCourse = { ...course, id: Date.now() };
    courses.push(newCourse);
    localStorage.setItem(DB_KEY, JSON.stringify(courses));
    return newCourse;
  },
  deleteCourse: (id) => {
    const courses = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
    const filtered = courses.filter((c) => c.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(filtered));
    return id;
  },
};
