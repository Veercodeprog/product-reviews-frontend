"use client";

import { onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";
import { auth } from "./firebase";

import { createContext, useEffect, useContext, useState } from "react";
export const checkAuthState = async () => {
  try {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user);
        unsubscribe();
      });
    });

    if (user) {
      const tokenResult = await getIdTokenResult(user);
      const { claims } = tokenResult;
      const { uid } = user;
      const response = {
        claims,
        uid,
      };
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking auth state:", error);
    return null;
  }
};

interface SessionManagerContextProps {
  user: any | undefined;
  isLoading: boolean;
}

export const SessionManagerContext = createContext<SessionManagerContextProps>({
  user: undefined,
  isLoading: true,
});

export function SessionManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdTokenResult(user)
          .then((tokenResult) => {
            const { claims } = tokenResult;
            const { uid } = user;
            const response = {
              claims,
              uid,
            };
            setUser(response);
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
  updateUser: any;
  setLoading: any;
}) => {
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdTokenResult(user)
          .then((tokenResult) => {
            const { claims } = tokenResult;
            const { uid } = user;
            const response = {
              claims,
              uid,
            };
            updateUser(response);
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
