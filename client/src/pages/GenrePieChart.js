import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import {Pie} from 'react-chartjs-2';
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

        const collection = res.data;

        let GenreArray = [];

        collection.forEach(element => {

          GenreArray.push(element.Genre);
          
        });

        var unique = function(value, index, self) {
          return self.indexOf(value) === index;
        }
        
        console.log(GenreArray);
        const genres = GenreArray.filter(unique);
        console.log(genres);

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

        console.log(genresCount);
        
        var coloR = [];
        var dynamicColors = function () {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
        };
        
        for (var i = 0; i < genres.length; i++) {
          coloR.push(dynamicColors());
        }

        this.setState({
          Data: {
            labels: genres,
            datasets: [{
              height: 1000,
              label: 'Track Time',
              data: genresCount,
              backgroundColor: coloR
            }]
          }
        });
      })
  }

  render() {
    return (
      
      <Container>

        <div>
          <Pie
            data={this.state.Data}
            options={{
              maintainAspectRatio: true
            }}/>
        </div>

      </Container>
    );
  }
}

export default GenrePieChart;