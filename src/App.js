import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Flat from './components/flat';
//API form (https://github.com/istarkov/google-map-react)
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';


class App extends Component {
  //constructor to define STATE containing array of flats
  //when render first time selectedFlat is null
 constructor (props){
    super(props);
    this.state ={
     flats: [],
     selectFlat: null
   };
 }
  //method that using AJAX fetch json and then you can change state and assigned
  //at the moment "fake"json... will need an api connection 
componentDidMount(){
  const url= "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
  fetch(url)
   .then(response => response.json())
   .then((data) => {
     this.setState({
        flats: data
     });
   })
}

//method to change the map state into the flat selected. 
//assign the chil pass to the method
selectFlat=(flat)=>{
  console.log(flat);
  this.setState({
    
    selectedFlat: flat
  })
}


  render() {
    // London coordinates for the API GoogleMapReact 
    // this variable will change from the method selectFlat
    let center={
      lat: 48.8566,
      lng: 2.3522
    }
    //
    if(this.state.selectedFlat){
      center= {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }
      
    return (
      <div className="app">
        <div className="main">
          <div className="search">
          </div>
          <div className="flats">
          
            {this.state.flats.map((flat) => {
              return <Flat key={flat.name} 
              flat={flat}
              selectFlat= {this.selectFlat}/>
            })}
             
          </div>
        </div>
        <div className="map">
              <GoogleMapReact
                  center={center}
                  zoom={12}
              >
              {this.state.flats.map((flat) =>{
                return <Marker key={flat.name} 
                lat={flat.lat} 
                currency={flat.priceCurrency} 
                lng={flat.lng} 
                text={flat.price}/>
              })}
              </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
