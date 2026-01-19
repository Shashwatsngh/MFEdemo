// Using localStorage to mock a database
const DB_KEYS = {
  USERS: "mfe_users",
  CURRENT_USER: "mfe_current_user",
};

export const auth = {
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
      window.dispatchEvent(new Event("auth-change"));
      return user;
    }
    throw new Error("Invalid credentials");
  },

  signup: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    // Auto login after signup
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(newUser));
    window.dispatchEvent(new Event("auth-change"));
    return newUser;
  },

  logout: () => {
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
    window.dispatchEvent(new Event("auth-change"));
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(DB_KEYS.CURRENT_USER));
  },
};
