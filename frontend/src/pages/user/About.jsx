import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


function About() {
  const { isDarkMode } = useContext(ThemeContext);

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: isDarkMode ? '#ffffff' : '#333333',
    padding: '50px',
    borderRadius: '8px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#1FAA59', // Green background like PlaySpots
    boxSizing: 'border-box',
    minHeight: '80vh', // Increased height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '3em',
    fontWeight: 'bold',
    color: '#ffffff',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    lineHeight: '1.6',
    marginTop: '20px',
    color: '#ffffff',
    maxWidth: '800px',
  };

  return (
    <>
    <div style={containerStyle}>
      <h1 style={headingStyle}>TurfNation</h1>
      <p style={paragraphStyle}>
        India's leading platform for sports facility booking and management. Book your favorite turf, manage your game schedules, and experience hassle-free sports engagement with TurfNation.
      </p>
    </div>
    
    
  
  </>
  );
}

export default About;