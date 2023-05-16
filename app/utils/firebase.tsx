import { initializeApp } from 'firebase/app';

import {  getAuth,  } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyA6pve1dZbUNglR_pwOq-n0XdyXm8JOg2Y",
    authDomain: "product-reviews-1e46d.firebaseapp.com",
    projectId: "product-reviews-1e46d",
    storageBucket: "product-reviews-1e46d.appspot.com",
    messagingSenderId: "306437454373",
    appId: "1:306437454373:web:9da8e7fdf7b964d4325dcc"
        // Add other Firebase configuration options
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


