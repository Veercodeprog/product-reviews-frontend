'use client';

import { useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult,signOut } from 'firebase/auth';
import { auth } from './firebase';

 
import { createContext, useContext, useState } from 'react';
 
interface SessionManagerContextProps {
  user: any | undefined;
  isLoading: boolean;
}

const SessionManagerContext = createContext<SessionManagerContextProps>({ user: undefined, isLoading: true });




// export  function SessionManagerProvider({children}) {
//   const [isLoading, setLoading] = useState(true);
// const [user, setUser] = useState(null);
//   return (
//     <SessionManagerContext.Provider value={{ user, setUser, isLoading, setLoading}}>
//       {/* <SessionManager /> */}
// {children}
      
//     </SessionManagerContext.Provider>
//   );
// }



// const SessionManager = () => {
//   const [user, setUser] = useState<any | undefined>();
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(true);
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         getIdTokenResult(user)
//           .then((tokenResult) => {
//             const { claims } = tokenResult;
//             setUser(claims);
//             setLoading(false); // Set loading to false after user data is retrieved
//           })
//           .catch((error) => {
//             console.error('Error getting token result', error);
//             setLoading(false); // Set loading to false even if an error occurs
//           });
//       } else {
//         setUser(null);
//         setLoading(false); // Set loading to false if no user is authenticated
//       }
//     });

//     return () => unsubscribe();
//   }, [setUser, setLoading]);

//   return null; // Return null as a placeholder since we don't need to render anything
// };


const SessionManager = ({ updateUser, setLoading }: { updateUser: any, setLoading:any }) => {
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
        uid
      };
 updateUser(response);
      setLoading(false);// Set loading to false after user data is retrieved
          })
          .catch((error) => {
            console.error('Error getting token result', error);
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


 export default SessionManager;

// const SessionManager =  ({ updateUser }) => {
//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         getIdTokenResult(user)
//           .then((tokenResult) => {
//             // handleAuthentication(tokenResult.claims); 
// const { claims } = tokenResult;
//             updateUser(claims);
//           })
//           .catch((error) => {
//             console.error('Error getting token result', error);
//           });
//       } else {
//         // handleAuthentication(null);
// // signOut(auth);
// updateUser(null);
//       }
//     });

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, [updateUser]);

//   return null;
// };
