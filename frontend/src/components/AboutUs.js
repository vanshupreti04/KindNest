import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Welcome Section */}
      <header className="welcome-header-1">
        <h1 className="welcome-title-1">About KindNest</h1>
        <div className="tagline-container-1">
          <h2 className="tagline-1">
            Empowering <span className="highlight-green-1">Connections</span> and Fostering <span className="highlight-green-1">Kindness</span>, <br />
            Building a Compassionate <span className="highlight-green-1">Community</span> Together.
          </h2>
        </div>
      </header>

      {/* Goals and Ethics Section */}
      <section className="goals-ethics">
        <div className="goals-ethics-left">
          <h2 className="goals-heading">Our Goals and Ethics</h2>
          <p className="goals-description">
            At KindNest, we aim to build trust and transparency between <br/>
            donors and organisations. Our ethics revolve around compassion, <br />
            accountability, and inclusivityto ensure a meaningful impact. <br/> 
          </p>
        </div>
        <div className="goals-ethics-right">
          <button className="learn-more-button">Learn More</button>
        </div>
      </section>

      {/* Community Section */}
      <section className="about-us-section">
        <div className="about-us-left">
          <h2 className="section-heading">Our Community</h2>
          <p className="section-description">
            KindNest thrives on the collective efforts of individuals, <br/>
            organisations and donors working together to make a difference. <br />
            Our community is united by shared values of compassion and generosity.
          </p>
        </div>
        <div className="about-us-right">
          <button className="learn-more-button">Join Our Community</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-us-section">
        <div className="about-us-left">
          <h2 className="section-heading">Our Services</h2>
          <p className="section-description">
            We provide a platform for seamless donations, organisational <br/>
            transparency, and impactful collaborations. From financial aid<br />
            to volunteering opportunities, KindNest is here to serve the greater good.
          </p>
        </div>
        <div className="about-us-right">
          <button className="learn-more-button">Explore Services</button>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;
