import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import {
  Pie,
  Bar,
  HorizontalBar
} from 'react-chartjs-2';
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
        let Tempo10Array = [];
        let TempoArray = [];
        let GenreArray = [];

        collection.forEach(element => {

          KeyArray.push(element.Key);
          TempoArray.push(element.Tempo);
          GenreArray.push(element.Genre);
          
        });

        // Gather unique data
        var unique = function(value, index, self) {
          return self.indexOf(value) === index;
        }

        const keys = KeyArray.filter(unique).sort(function(a, b){return a - b});
        
        for (var i = 0; i < TempoArray.length; i++) {
          Tempo10Array[i] = Math.round(TempoArray[i] / 10) * 10;
        }
        var tempos10 = Tempo10Array.filter(unique).sort(function (a, b) {return a - b});

        for (i = 0; i < TempoArray.length; i++) {
          TempoArray[i] = Math.round(TempoArray[i]);
        }
        var tempos = TempoArray.filter(unique).sort(function(a, b){return a - b});

        const genres = GenreArray.filter(unique).sort();

        // Get data counts
        let keysCount = [];
        for (i = 0; i < keys.length; i++) {
          var count = 0;
          for (var j = 0; j < KeyArray.length; j++) {
            if (keys[i] === KeyArray[j]) {
              count++;
            }
          }
          keysCount.push(count);
        }

        let tempos10Count = [];
        for (i = 0; i < tempos10.length; i++) {
          count = 0;
          for (j = 0; j < Tempo10Array.length; j++) {
            if (tempos10[i] === Tempo10Array[j]) {
              count++;
            }
          }
          tempos10Count.push(count);
        }

        let temposCount = [];
        for (i = 0; i < tempos.length; i++) {
          count = 0;
          for (j = 0; j < TempoArray.length; j++) {
            if (tempos[i] === TempoArray[j]) {
              count++;
            }
          }
          temposCount.push(count);
        }

        let genresCount = [];
        for (i = 0; i < genres.length; i++) {
          count = 0;
          for (j = 0; j < GenreArray.length; j++) {
            if (genres[i] === GenreArray[j]) {
              count++;
            }
          }
          genresCount.push(count);
        }
        
        // Get random colors for chart
        var keysColors = [];
        var tempos10Colors = [];
        var genresColors = [];

        var dynamicColors = function () {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
        };
        
        for (i = 0; i < keys.length; i++) {
          keysColors.push(dynamicColors());
        }
        for (i = 0; i < tempos.length; i++) {
          tempos10Colors.push(dynamicColors());
        }
        for (i = 0; i < genres.length; i++) {
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

          TempoBar: {
            labels: tempos10,
            datasets: [{
              label: 'Tempo Bar Chart',
              data: tempos10Count,
              backgroundColor: tempos10Colors
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
            height="750"
            options={{
              maintainAspectRatio: false
            }}/>
        </div>
        
        <br/>

        <div>
          <h2>Tempos</h2>
          <Bar
            data={this.state.TempoBar}
            height="500"
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