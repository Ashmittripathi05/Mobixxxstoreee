import { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

const ADMIN_ID   = 'owner';
const ADMIN_PASS = 'mobix@2025';

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem('mobix_admin') === 'true'
  );

  const login = (id, password) => {
    if (id.trim() === ADMIN_ID && password === ADMIN_PASS) {
      setIsAdmin(true);
      localStorage.setItem('mobix_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('mobix_admin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
