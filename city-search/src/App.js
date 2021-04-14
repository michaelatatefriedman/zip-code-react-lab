import React, { Component } from 'react';
import './App.css';

function City(props) {
  if(!props.cityStuff)
  {
    return (
      <div id ='no-results'>
        <p>Nope, never heard of it. Doesn't exist...</p>
      </div>
    )
  }
  else{
    return (
      <div className='city-info'>
      <p>{props.cityStuff}</p>
      </div>
    );
  }
}

function CitySearchField({ onCityChange }) {
  return (
    <div id='search-box'>
      <label>City Name:</label>
      <input placeholder='Choccolocco' type="text" onChange={onCityChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      zipcodes: [],
    }
  }

  cityChanged(e) {
    fetch(`http://ctp-zip-api.herokuapp.com/city/${e.target.value.toUpperCase()}`, {method: 'GET'})
      .then(response => { 
        return response.json()
      })
      .then(responseJson => Object.keys(responseJson).map(key => (
        console.log(responseJson),
        this.setState({
          zipcodes: [...this.state.zipcodes,responseJson[key]]
        })
      ))).catch(err => {
          this.setState({zipcodes:['None']})
        }
      );

    this.setState({
      city: e.target.value.toUpperCase()
    })
    
  }

  render() {
    let codesListed;
    if(this.state.zipcodes.length === 1)
    {
      codesListed = <City />
    } else
    {
      codesListed = this.state.zipcodes.filter(item => {return item != 'None'})
      codesListed = codesListed.map(city => <City cityStuff={city} />)
    }
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField onCityChange={(e) => this.cityChanged(e)} />
        {console.log(this.state.zipcodes)}
        <div>
          {codesListed}
        </div>
      </div>
    );
  }
}

export default App;