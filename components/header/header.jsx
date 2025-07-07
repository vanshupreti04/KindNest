import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Left - Brand Name */}
          <div className="brand">
            Kindnest
          </div>

          {/* Center - Navigation Links */}
          <nav className="nav-links">
            <span className="nav-item">Home</span>
            <span className="nav-item">Team</span>
            <span className="nav-item">Careers</span>
          </nav>

          {/* Right - Auth Buttons */}
          <div className="auth-buttons">
            <span className="login">Login</span>
            <span className="signup">Sign Up</span>
          </div>
        </div>
      </div>
    </header>
  );
}