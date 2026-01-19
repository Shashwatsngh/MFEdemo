import React, { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, selectProfile, setProfileData, updateProfile } from "./store";
import { db } from "./data/db";
import "./index.css";

const getActivityIcon = (type) => {
  switch (type) {
    case "completed":
      return (
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    case "started":
      return (
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    case "certificate":
      return (
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
            />
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
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 h-32"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileDashboard = ({ user }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const data = db.getProfile(user);
      dispatch(setProfileData(data));
    }
  }, [user, dispatch]);

  if (!profile)
    return (
      <div className="p-8 text-center text-gray-500">Loading Profile...</div>
    );

  return (
    <div className="space-y-6">
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        profile={profile}
        user={user}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row items-end -mt-16 mb-6 gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-gray-600 font-medium">{profile.role}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Joined {profile.joinedDate}
                </span>
              </div>
            </div>
            <div className="mb-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-4xl">
            {profile.bio}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Learning Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">
                  {profile.stats.coursesCompleted}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                  Completed
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-indigo-600">
                  {profile.stats.coursesInProgress}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                  In Progress
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600">
                  {profile.stats.certificatesEarned}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                  Certificates
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {profile.stats.totalHoursLearned}h
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
                  Hours
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
            <div className="space-y-4">
              {profile.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-6">
              {profile.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-900 font-medium">
                          {activity.type === "completed" && "Completed course"}
                          {activity.type === "started" && "Started learning"}
                          {activity.type === "certificate" &&
                            "Earned certificate in"}
                          <span className="font-bold ml-1">
                            {activity.course}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.date}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = ({ user }) => {
  return (
    <Provider store={store}>
      <ProfileDashboard user={user} />
    </Provider>
  );
};

export default App;
