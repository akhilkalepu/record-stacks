import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import {Pie, HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getItems } from '../actions/itemActions';
// import PropTypes from 'prop-types';

class GenrePieChart extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }

  componentDidMount() {
    console.log("getting items");
    axios.get(`/api/tracks`)
      .then(res => {

        // Gather data
        const collection = res.data;

        let KeyArray = [];
        let GenreArray = [];

        collection.forEach(element => {

          KeyArray.push(element.Key);
          GenreArray.push(element.Genre);
          
        });

        // Gather unique data
        var unique = function(value, index, self) {
          return self.indexOf(value) === index;
        }

        const keys = KeyArray.filter(unique).sort(function(a, b){return a - b});
        const genres = GenreArray.filter(unique).sort();

        // Get data counts
        let keysCount = [];
        for (var k = 0; k < keys.length; k++) {
          var count = 0;
          for (var j = 0; j < KeyArray.length; j++) {
            if (keys[k] === KeyArray[j]) {
              count++;
            }
          }
          keysCount.push(count);
        }

        let genresCount = [];
        for (var k = 0; k < genres.length; k++) {
          var count = 0;
          for (var j = 0; j < GenreArray.length; j++) {
            if (genres[k] === GenreArray[j]) {
              count++;
            }
          }
          genresCount.push(count);
        }
        
        // Get random colors for chart
        var keysColors = [];
        var genresColors = [];

        var dynamicColors = function () {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
        };
        
        for (var i = 0; i < keys.length; i++) {
          keysColors.push(dynamicColors());
        }
        for (var i = 0; i < genres.length; i++) {
          genresColors.push(dynamicColors());
        }

        this.setState({

          KeyBar: {
            labels: keys,
            datasets: [{
              label: 'Key Bar Chart',
              data: keysCount,
              backgroundColor: keysColors
            }]
          },

          GenrePie: {
            labels: genres,
            datasets: [{
              label: 'Genre Pie Chart',
              data: genresCount,
              backgroundColor: genresColors
            }]
          }
        });
      })
  }

  render() {
    return (
      
      <Container>

        <div>
          <h2>Keys</h2>
          <HorizontalBar
            data={this.state.KeyBar}
            height="1000"
            options={{
              maintainAspectRatio: false
            }}/>
        </div>
        
        <br/>

        <div>
          <h2>Genres</h2>
          <Pie
            data={this.state.GenrePie}
            height="3500"
            options={{
              maintainAspectRatio: false
            }}/>
        </div>

      </Container>
    );
  }
}

export default GenrePieChart;