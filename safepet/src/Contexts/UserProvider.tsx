import { createContext, useState, useContext, useCallback, useMemo, ReactNode } from 'react';

type UserContextType = {
  usernameGlobal: string;
  role: string;
  updateUser: (username: string, role: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  usernameGlobal: '',
  role: '',
  updateUser: () => {},
  logout: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [usernameGlobal, setUsernameGlobal] = useState<string>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('authUsername') || '' : ''
  );
  const [role, setRole] = useState<string>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('authRole') || '' : ''
  );

  const updateUser = useCallback((username: string, newRole: string) => {
    setUsernameGlobal(username);
    setRole(newRole);
    localStorage.setItem('authUsername', username);
    localStorage.setItem('authRole', newRole);
  }, []);

  const logout = useCallback(() => {
    setUsernameGlobal('');
    setRole('');
    localStorage.removeItem('authUsername');
    localStorage.removeItem('authRole');
  }, []);

  const value = useMemo(
    () => ({ usernameGlobal, role, updateUser, logout }),
    [usernameGlobal, role, updateUser, logout]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
