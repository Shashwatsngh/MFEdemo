import React, { lazy, Suspense, useState, useEffect } from "react";
import "./index.css";
import { auth } from "./utils/auth";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";

const CoursesApp = lazy(() => import("courses/CoursesApp"));
const ProfileApp = lazy(() => import("profile/ProfileApp"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
      <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
    </div>
  </div>
);

const ErrorFallback = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-red-100">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-8 h-8 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {name} Failed to Load
    </h3>
    <p className="text-gray-500 max-w-sm mx-auto">
      There was an issue loading this micro-frontend. Please ensure the service is running.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
    >
      Retry Connection
    </button>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MicroFrontend Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback name={this.props.name} />;
    }

    return this.props.children;
  }
}

const Header = ({ activeTab, setActiveTab }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("courses")}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              MicroLearning
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "courses"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              My Profile
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div 
              onClick={() => setActiveTab("profile")}
              className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 ring-2 ring-gray-100 cursor-pointer hover:ring-blue-300 transition-all shadow-sm"
              title="View Profile"
            >
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => auth.logout()}
              className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors border border-red-100"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const App = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [user, setUser] = useState(auth.getCurrentUser());
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(auth.getCurrentUser());
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  if (!user) {
    return authMode === "login" ? (
      <LoginPage onSwitchToSignup={() => setAuthMode("signup")} />
    ) : (
      <SignupPage onSwitchToLogin={() => setAuthMode("login")} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="transition-all duration-300 ease-in-out">
            {activeTab === "courses" && (
              <ErrorBoundary name="Courses App">
                <CoursesApp />
              </ErrorBoundary>
            )}
            {activeTab === "profile" && (
              <ErrorBoundary name="Profile App">
                {/* Properly passing the user prop to the Profile MFE */}
                <ProfileApp user={user} />
              </ErrorBoundary>
            )}
          </div>
        </Suspense>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 MicroLearning Platform. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
