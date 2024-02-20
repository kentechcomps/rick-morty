import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/location`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setLocations(data.results);
      })
      .catch(error => {
        console.error('There was an error fetching the data', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleOnClick(locationId) {
    history(`/Location/${locationId}`);
  }

  return (
    <div>
      <div style={{ color: 'white', background: '#353935' }}>
        <h1>Rick&morty</h1>
      </div>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            locations.map((data, index) => (
              <div className="col-md-4 mb-3" onClick={() => handleOnClick(data.id)} key={index}>
                <div className="card" style={{ maxWidth: '540px' }}>
                  <div className="row g-0">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">
                          <small className="text-muted">{data.type}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
