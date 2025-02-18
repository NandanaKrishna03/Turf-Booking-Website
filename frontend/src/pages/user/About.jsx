import  { useState } from 'react';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: isDarkMode ? '#ffffff' : '#333333', // Text color changes based on the theme
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '900px',
    margin: '30px auto',
    backgroundColor: isDarkMode ? '#2c3e50' : '#ffffff', // Background color changes
    boxSizing: 'border-box',
  };

  const headingStyle = {
    fontSize: '2.5em',
    color: '#0000ff',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const subHeadingStyle = {
    fontSize: '1.5em',
    color: '#0000ff',
    margin: '20px 0',
  };

  const paragraphStyle = {
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '20px',
    textAlign: 'justify',
  };

  const listStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
    fontSize: '1.1em',
  };

  const listItemStyle = {
    marginBottom: '10px',
    paddingLeft: '20px',
    position: 'relative',
  };

  const bulletPointStyle = {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#16a085',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <p style={paragraphStyle}>
        Welcome to <strong>TurfNation</strong>, the ultimate platform for booking turf grounds with ease. Whether you are planning a casual game with friends or a competitive match, we provide a seamless experience to help you reserve your favorite turf in just a few clicks.
      </p>
      <p style={paragraphStyle}>
        At TurfNation, we understand the importance of a good venue for your game. Our mission is to make it easier for sports enthusiasts to find and book high-quality turf grounds across your city, ensuring a hassle-free and enjoyable experience. Our platform offers real-time availability, secure payments, and instant booking confirmation, so you can focus on what matters most – the game.
      </p>
      <h2 style={subHeadingStyle}>With TurfNation, you can:</h2>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <span style={bulletPointStyle}></span> Explore a variety of turf grounds – from football to cricket, we cover multiple sports.
        </li>
        <li style={listItemStyle}>
          <span style={bulletPointStyle}></span> Instantly book your spot – find availability and reserve in minutes.
        </li>
        <li style={listItemStyle}>
          <span style={bulletPointStyle}></span> Secure payments – choose from a variety of payment options for a safe transaction.
        </li>
        <li style={listItemStyle}>
          <span style={bulletPointStyle}></span> Get reminders and updates – we’ll keep you informed about your upcoming bookings.
        </li>
      </ul>
      <p style={paragraphStyle}>
        Join us and make your sports experience more enjoyable. Whether you are a beginner or a pro, TurfNation is here to help you stay active and competitive.
      </p>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: isDarkMode ? '#f39c12' : '#2c3e50',
          color: isDarkMode ? '#333' : '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

export default About;
