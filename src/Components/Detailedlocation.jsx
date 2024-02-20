import React, { useEffect, useState , useCallback} from 'react';
import { useParams } from 'react-router-dom';

function Detailedlocation() {
  const [locationdetail , setlocationdetail] = useState({})
  const { locationid } = useParams();
  const [residents, setResidents] = useState([])

  console.log(locationid);
  
  useEffect(() => {
    // Fetch data for the specific location
    fetch(`https://rickandmortyapi.com/api/location/${locationid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setlocationdetail(data); 
        fetchResidents(data.residents)
        // Assuming your API returns details objectd
      })
      .catch(error => {
        setError('Error fetching data');
        console.error('There was an error fetching the data', error);
      });
  }, [locationid]);

  const fetchResidents = useCallback(residentsUrls => {
    const residentRequests = residentsUrls.map(residentUrl =>
      fetch(residentUrl).then(response => response.json())
    );
  
    Promise.all(residentRequests)
      .then(residentData => {
        setResidents(residentData);
      })
      .catch(error => {
        console.error('Error fetching residents', error);
      });
  }, []);


  return (
    <div>
      <div>
        <h2>{locationdetail.name}</h2>
      </div>
      <div>
        <a>{locationdetail.type}</a>
        <a>{locationdetail.dimension}</a>
      </div>
      {residents.map(resident =>(
            <div>
            <div class="card mb-3" style={{ maxWidth: '540px' }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src={resident.image} class="img-fluid rounded-start" alt="..."></img>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{resident.name}</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ))}
     
    </div>
  );
}

export default Detailedlocation;
