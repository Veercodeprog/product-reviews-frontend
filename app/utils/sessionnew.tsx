"use client";

import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth } from "./firebase";
import { createContext, useEffect, useContext, useState } from "react";

interface User {
  uid: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  providerData: any;
  // Add other properties as needed
}

//new build

interface AuthResponse {
  claims: any;
  uid: string;
}

interface SessionManagerContextProps {
  user: User | null;
  isLoading: boolean;
}

export const SessionManagerContext = createContext<SessionManagerContextProps>({
  user: null,
  isLoading: true,
});

export function SessionManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdTokenResult(user)
          .then((tokenResult) => {
            const { claims } = tokenResult;
            const { uid } = user;
            const response: AuthResponse = {
              claims,
              uid,
            };
            setUser(user);
            setLoading(false); // Set loading to false after user data is retrieved
          })
          .catch((error) => {
            console.error("Error getting token result", error);
            setLoading(false); // Set loading to false even if an error occurs
          });
      } else {
        setUser(null);
        setLoading(false); // Set loading to false if no user is authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SessionManagerContext.Provider value={{ user, isLoading }}>
      {children}
    </SessionManagerContext.Provider>
  );
}

const SessionManagerNew = ({
  updateUser,
  setLoading,
}: {
  updateUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}) => {
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdTokenResult(user)
          .then((tokenResult) => {
            const { claims } = tokenResult;
            const { uid } = user;
            const response: AuthResponse = {
              claims,
              uid,
            };
            updateUser(user);
            setLoading(false); // Set loading to false after user data is retrieved
          })
          .catch((error) => {
            console.error("Error getting token result", error);
            setLoading(false); // Set loading to false even if an error occurs
          });
      } else {
        updateUser(null);
        setLoading(false); // Set loading to false if no user is authenticated
      }
    });

    return () => unsubscribe();
  }, [updateUser, setLoading]);

  return null;
};

export default SessionManagerNew;

// Rest of your code...
