import { useEffect, useState } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';

function AllTurf() {
  const [turfs, setTurfs] = useState([]); // Ensure it's initialized as an array

  useEffect(() => {
    const getAllTurfs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/turf/get-turf');
        console.log("API Response:", res.data); // Debugging

        // Ensure data is an array before setting state
        setTurfs(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };

    getAllTurfs();
  }, []);

  return (
    <div>
      {turfs.length > 0 ? (
        turfs.map((turf) => (
          <Card key={turf._id}>
            <Card.Img variant="top" src={turf.image} alt={turf.title} />
            <Card.Body>
              <Card.Title>{turf.title}</Card.Title>
              <Card.Text>{turf.description}</Card.Text>
              <Card.Text>Price: {turf.price}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No turfs available</p>
      )}
    </div>
  );
}

export default AllTurf;
