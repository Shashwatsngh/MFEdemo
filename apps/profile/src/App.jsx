import React, { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, selectProfile, setProfileData, updateProfile } from "./store";
import { db } from "./data/db";
import "./index.css";

const getActivityIcon = (type) => {
  switch (type) {
    case "completed":
      return (
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    case "started":
      return (
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    case "certificate":
      return (
        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

const EditProfileModal = ({ isOpen, onClose, profile, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    location: profile.location,
    bio: profile.bio,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    db.updateProfile(user, formData); // Persist
    dispatch(updateProfile(formData)); // Update store
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 dark:bg-gray-700 dark:text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 dark:bg-gray-700 dark:text-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 dark:bg-gray-700 dark:text-white"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 dark:bg-gray-700 dark:text-white"
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SettingsView = ({ user, onDeleteAccount }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-8 animate-fade-in">
       <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Settings</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl p-6">
              <h3 className="text-red-700 dark:text-red-400 font-bold mb-2">Danger Zone</h3>
              <p className="text-red-600 dark:text-red-300/80 mb-6 text-sm">
                Deleting your account is permanent. All your data, learning progress, and certificates will be wiped out immediately.
              </p>
              
              {!showConfirm ? (
                  <button 
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Delete My Account
                  </button>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-red-700 dark:text-red-400">Are you sure?</span>
                  <button 
                    onClick={onDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Yes, Delete It
                  </button>
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
          </div>
       </div>
    </div>
  );
};

const ProfileDashboard = ({ user, onLogout }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      const data = db.getProfile(user);
      dispatch(setProfileData(data));
    }
  }, [user, dispatch]);

  const handleDeleteAccount = () => {
    if (!user) return;
    try {
        // Remove profile
        const profileKey = `mfe_profile_${user.email}`;
        localStorage.removeItem(profileKey);
        
        // Remove user from users list
        const users = JSON.parse(localStorage.getItem('mfe_users') || '[]');
        const updatedUsers = users.filter(u => u.email !== user.email);
        localStorage.setItem('mfe_users', JSON.stringify(updatedUsers));
        
        // Trigger Logout via parent
        if (onLogout) onLogout();
    } catch (e) {
        console.error("Failed to delete account", e);
    }
  };

  if (!profile)
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400 animate-pulse">Loading Profile...</div>
    );

  return (
    <div className="space-y-6">
      <EditProfileModal isOpen={isEditing} onClose={() => setIsEditing(false)} profile={profile} user={user} />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row items-end -mt-16 mb-6 gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-white dark:bg-gray-700">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{profile.role}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {profile.joinedDate}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex gap-8 border-t border-gray-100 dark:border-gray-700 pt-8 mt-8">
             <button 
                onClick={() => setActiveTab("overview")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "overview" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
             >
                Overview
             </button>
             <button 
                onClick={() => setActiveTab("settings")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "settings" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
             >
                Settings
             </button>
          </div>
        </div>
      </div>

      {activeTab === "settings" ? (
         <SettingsView user={user} onDeleteAccount={handleDeleteAccount} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Me</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-6">
                {profile.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                    {getActivityIcon(activity.type)}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{activity.course}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {activity.type === "completed" ? "Completed" : activity.type === "started" ? "Started learning" : "Earned certificate"} • {activity.date}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>

            <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.coursesCompleted}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Courses Completed</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.coursesInProgress}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">In Progress</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.certificatesEarned}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Certificates</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.totalHoursLearned}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Hours Learned</div>
                </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skills</h3>
                <div className="space-y-4">
                {profile.skills.map((skill) => (
                    <div key={skill.name}>
                    <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

const App = ({ user, onLogout }) => {
  return (
    <Provider store={store}>
      <ProfileDashboard user={user} onLogout={onLogout} />
    </Provider>
  );
};

export default App;
