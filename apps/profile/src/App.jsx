import React from "react";
import { Provider, useSelector } from "react-redux";
import { store, selectProfile } from "./store";
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

const ProfileDashboard = () => {
  const profile = useSelector(selectProfile);

  return (
    <div className="space-y-6">
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
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-4xl">
            {profile.bio}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Courses Completed",
            value: profile.stats.coursesCompleted,
            color: "blue",
          },
          {
            label: "In Progress",
            value: profile.stats.coursesInProgress,
            color: "indigo",
          },
          {
            label: "Certificates",
            value: profile.stats.certificatesEarned,
            color: "yellow",
          },
          {
            label: "Hours Learned",
            value: profile.stats.totalHoursLearned,
            color: "green",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-sm font-medium text-gray-500 mb-1">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-6">
            {profile.recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                {getActivityIcon(activity.type)}
                <div>
                  <p className="text-gray-900 font-medium">
                    {activity.type === "completed" && "Completed course"}
                    {activity.type === "started" && "Started course"}
                    {activity.type === "certificate" && "Earned certificate in"}
                    <span className="font-bold ml-1">{activity.course}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
          <div className="space-y-5">
            {profile.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ProfileDashboard />
    </Provider>
  );
};

export default App;
