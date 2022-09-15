import React from 'react';
import Databox from './Components/Databox'
import Maps from './Components/Map'

export default function App() {

  const [loaded, setLoaded] = React.useState(false)
  const [ipAdress, setIPAdress] = React.useState(
      {value: ''})
  const [publicData, setPublicData] = React.useState(
          {
            position: {lat: "",
              lng: ""},
            IP: "",
            Timezone: "",
            ISP: "",
            City: "",
            Country: ""
          }
        );

// Get IP from user
  React.useEffect(() => {
    fetch('https://api.ipify.org/')
      .then(r => r.text())
      .then(data => setIPAdress({value: data}))
      .then(newData())
  }, [])

  // Get data from Input box and set it to state "ipAdress"
  function handleChange(event) {
      setIPAdress({value: event.target.value})
  }

    // Submit button to go fetch new Data from input IP
    function handleSubmit(event) {
      // Prevent page reload
      event.preventDefault()
      // Set regex for IP
      var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      // Check if input has valid IP format
      if(ipAdress.value.match(ipformat)) {
        newData()
      } else {alert("You entered an invalid IP")}
      
      }

  // Get data from API, set it to state "publicData"
  function newData() {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SbsUckVvYo361zqnE2TdUGhwgoPtS&ipAddress=${ipAdress.value}`)
        .then(res => res.json())
        .then(data => setPublicData({
          position: {lat: data.location.lat,
            lng: data.location.lng},
          IP: data.ip,
          Timezone: data.location.timezone,
          ISP: data.isp,
          City: data.location.city,
          Country: data.location.country
        }))
        // Prevent to show invalid map
    setLoaded(true)
    };
  
  return (
    <main className="App">
      <section className='headerPage position-relative'>
      <div className='formInput'>
                <h1>IP Adress Tracker:</h1>
                {/* Form with input and submit */}
                <form
                    className='inputandgo'
                    >
                        <input
                            type="text"
                            id='inputID'
                            placeholder='Search for any IP address or domain'
                            name= "IP Adress"
                            onChange={handleChange}
                            required pattern='/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'
                            />
                        <input
                            type="button"
                            className='btnSubmit'
                            onClick={handleSubmit}/>
                </form>
            </div>
            {/* Render box with info about the current IP */}
            <Databox
              Data={publicData.position}
              IP={publicData.IP}
              ISP={publicData.ISP}
              Timezone={publicData.Timezone}
              City={publicData.City}
              Country={publicData.Country}
              handleClick={() => handleSubmit}
              handleChange={() => handleChange}
            />
      </section>
      {/* Render map */}
      <Maps
        Data={publicData.position}
        IP={publicData.IP}
        loaded={loaded}
      />
    </main>
  );
}
