import React, { useState, useEffect, useMemo} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';
import DonationHistory from './DonationHistory';
import DonateNow from './DonateNow';
import EditProfile from './EditProfile';
import './DonatorDashboard.css';
import AddProfilePicture from './AddProfilePicture';

const DonatorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [donator, setDonator] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const sectionMap = {
    '/donator-dashboard/profile': 'profile',
    '/donator-dashboard/history': 'history',
    '/donator-dashboard/donate': 'donate',
    '/donator-dashboard/edit-profile': 'editProfile',
  };

  const activeSection = sectionMap[location.pathname] || 'profile';

  const taglines = useMemo(
    () => [
      'Empowering Change Through Giving',
      'Your Small Help Can Make Big Changes',
      'Together, We Build a Better Tomorrow',
      'Be the Change You Wish to See',
      'Generosity is the Heart of Humanity',
      'Your Donations, Their Smiles',
      'Give Hope, Spread Happiness',
      'Act of Giving Brings Endless Joy',
      'Donate for a Better Future',
      'Helping Hands are Better than Praying Lips',
      'Compassion is the True Currency of Life',
      'Kindness Knows No Bounds',
      'Giving is the Greatest Act of Grace',
      'Brighten Lives, One Step at a Time',
      'Support Today, Shape Tomorrow',
      'Be Someone’s Hero Today',
      'Together, We Can Make a Difference',
      'Sharing is Caring, Start Now',
      'Your Generosity Sparks Hope',
      'Make the World a Better Place',
      'Plant the Seeds of Kindness',
      'Be the Light in Someone’s Darkness',
      'Every Donation Counts, Big or Small',
      'Lend a Hand, Build a Future',
      'Spread Love, Inspire Change',
      'A Better World Begins with You',
      'Change Starts with a Single Step',
      'Your Help Can Change Lives',
      'Lift Others to Lift Yourself',
    ],
    []
  );

  // Cycle through taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 10000); // Change tagline every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [taglines.length]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Handle the profile picture click to open the modal
  const handleProfileClick = () => {
    setShowModal(true); // Open modal when profile picture is clicked
  };

  useEffect(() => {
    const fetchDonatorData = async () => {
      const donatorId = localStorage.getItem('donatorId'); // Retrieve donatorId from localStorage

      if (!donatorId) {
        console.error('Donator ID not found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/donator/profile/${donatorId}`);

        if (response.ok) {
          const data = await response.json();
          setDonator(data.donator);
          setDonationHistory(data.donationHistory || []);
        } else {
          console.error('Failed to fetch donator data');
        }
      } catch (error) {
        console.error('Error fetching donator data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonatorData();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const refreshProfile = async () => {
    // Refetch donator data to update the profile picture
    const donatorId = localStorage.getItem('donatorId');
    const response = await fetch(`http://localhost:5000/api/donator/profile/${donatorId}`);
    const data = await response.json();
    setDonator(data.donator);
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="donator-dashboard">
      {/* Top Menu Bar */}
      <div className="top-menu">
        <button-1 className="menu-button" onClick={toggleSidebar}>
          ☰
        </button-1>
        <div className="tagline fade-animation">
          {taglines[currentTaglineIndex]}
        </div>
        <div className="profile-picture" onClick={handleProfileClick}>
        <img
        src={`http://localhost:5000/api/donator/profile-picture/${localStorage.getItem('donatorId')}`}
        alt="Profile"
        onError={(e) => { e.target.src = '/default-avatar.png'; }} // Fallback if image doesn't load
         />
        </div>
        {showModal && (
        <AddProfilePicture 
          onClose={toggleModal} 
          refreshProfile={refreshProfile} 
        />
      )}
      </div>

      {/* Sidebar */}
      {showSidebar && <Sidebar navigate={navigate} />}

      {/* Content Section */}
      <div className="content-container">
        {activeSection === 'profile' && <ProfileSection donator={donator} />}
        {activeSection === 'history' && <DonationHistory history={donationHistory} />}
        {activeSection === 'donate' && <DonateNow />}
        {activeSection === 'editProfile' && donator && <EditProfile donator={donator} />}
      </div>

    </div>
  );
};

export default DonatorDashboard;
