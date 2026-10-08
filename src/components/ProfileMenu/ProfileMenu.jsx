import React from "react";
import { useAuth } from "../../Context/AuthContext";
import "./ProfileMenu.css";

export default function ProfileMenu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-wrap">
      {user.photoURL ? (
        <img
          className="profile-avatar"
          src={user.photoURL}
          alt="profile"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="profile-avatar profile-default">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
          </svg>
        </div>
      )}
      <span className="profile-label">{user.displayName || user.email}</span>
    </div>
  );
}