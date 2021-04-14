// import React, { Component } from 'react';
// import './App.css';


// function City(props) {
//   return (<div>This is the City component</div>);
// }

// function ZipSearchField(props) {
//   return (<div>This is the ZipSearchField component</div>);
// }


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <h2>Zip Code Search</h2>
//         </div>
//         <ZipSearchField />
//         <div>
//           <City />
//           <City />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
import './App.css';

function City(props) {
  if(!props.cityName)
  {
    return (
      <div id ='not-found'>
        <p>No results</p>
      </div>
    )
  }
  else{
    return (
      <div className='city-info'>
        <p className='cityName'>{props.cityName}</p>
        <ul>
          <li>State: {props.cityState}</li>
          <li>Location: ({props.cityLat}, {props.cityLong})</li>
          <li>Population (estimated): {props.cityPopulation}</li>
          <li>Total Wages: ${props.cityWages}</li>
        </ul>
      </div>
    );
  }
}

function ZipSearchField({ onZipChange }) {
  return (
    <div id='search-box'>
      <label>Zip Code:</label>
      <input placeholder='XXXXX' type="text" onChange={onZipChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`, {method: 'GET'})
      .then(response => { 
        return response.json()
      })
      .then(responseJson => Object.keys(responseJson).map(key => (
        // console.log(responseJson),
        this.setState({
          cities: [...this.state.cities,responseJson[key]]
        })
      ))).catch(err => {
        this.setState({cities:['None']})
        }
      );

    this.setState({
      zipCode: e.target.value
    })
    
  }

  render() {
    let citiesListed;
    if(this.state.cities.length === 1)
    {
      citiesListed = <City />
    } else
    {
      citiesListed = this.state.cities.filter(item => {return item != 'None'})
      citiesListed = citiesListed.map(city => <City cityName={city.City} cityWages={city.TotalWages} cityLat={city.Lat} cityLong={city.Long} cityPopulation={city.EstimatedPopulation} cityState={city.State} />)
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
        {console.log(this.state.cities)}
        <div>
          {citiesListed}
        </div>
      </div>
    );
  }
}

export default App;
