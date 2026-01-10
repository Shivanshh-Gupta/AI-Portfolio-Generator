"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./Navbar.css";

const HIDDEN_ROUTES = ["/login", "/signup"]; // 👈 image removed

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Hide navbar only on login & signup
  if (HIDDEN_ROUTES.includes(pathname)) return null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          setUserId(userData.id);
          setUserName(userData.name);
        } catch (err) {
          console.log("Invalid user data");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    if (userId) {
      router.push(`/profile/${userId}`);
      setShowDropdown(false);
    }
  };

  return (
    <nav className="ngf-navbar">
      <div className="ngf-container">
        <Link href="/" className="ngf-logo">
          🚀 NextgenFolio AI
        </Link>

        <div className="ngf-links">
          <Link href="/" className="ngf-link">
            Home
          </Link>

          {isLoggedIn ? (
            <div className="ngf-user">
              <button
                className="ngf-user-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="ngf-avatar">
                  {userName?.charAt(0)?.toUpperCase()}
                </span>
                <span>{userName}</span>
              </button>

              {showDropdown && (
                <div className="ngf-dropdown">
                  <button onClick={handleProfileClick}>
                    📊 Profile Dashboard
                  </button>
                  <button onClick={handleLogout} className="logout">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="ngf-auth">
              <Link href="/login" className="btn-outline">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
