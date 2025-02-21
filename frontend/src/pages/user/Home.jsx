const Home = () => {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white text-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dk1kmtpwe/video/upload/v1740061791/52177-467701518_bgjiid.mp4"
            type="video/mp4"
          />
        </video>
  
        {/* Dark Overlay */}
        
  
        {/* Content Over the Video */}
        <div className="relative z-10 flex flex-col items-center px-10">
          {/* Logo */}
          <h1 className="text-4xl font-bold text-green-500">TURFNATION</h1>
  
          {/* Hero Section */}
          <section className="mt-16">
            <h2 className="text-4xl font-bold">FIND PLAYERS & VENUES NEARBY</h2>
            <p className="text-lg mt-4 max-w-2xl text-gray-200">
              Seamlessly explore sports venues and play with sports enthusiasts just like you!
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default Home;
  