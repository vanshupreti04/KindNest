'use client';
import Link from 'next/link';
import { useAuth } from '../auth/AuthProvider';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Left - Brand Name */}
          <Link href="/" className="brand">
            Kindnest
          </Link>

          {/* Center - Navigation Links */}
          <nav className="nav-links">
            <Link href="/" className="nav-item">Home</Link>
            <Link href="/team" className="nav-item">Team</Link>
            <Link href="/careers" className="nav-item">Careers</Link>
            {currentUser && (
              <Link href="/dashboard" className="nav-item">Dashboard</Link>
            )}
          </nav>

          {/* Right - Auth Buttons */}
          <div className="auth-buttons">
            {currentUser ? (
              <span className="user-email">{currentUser.email}</span>
            ) : (
              <>
                <Link href="/login" className="login">Login</Link>
                <Link href="/signup" className="signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;