import { useState, useEffect } from "react";

import axios from "axios";
import { auth } from "./firebase";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// SessionManager.js

class sessionManagerWithoutFirebase {
  // Other code...

  static setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  static getUser() {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }
}

export default sessionManagerWithoutFirebase;
