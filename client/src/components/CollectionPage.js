import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getItems } from '../actions/itemActions';
// import PropTypes from 'prop-types';

class GraphPage extends Component {
    
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

          let TrackArray = [];
          let ArtistArray = [];
          let ReleaseArray = [];
          let GenreArray = [];
          let KeyArray = [];
          let TempoArray = [];
          let TimeArray = [];
          let AddedArray = [];
          let AUDIO_IDArray = [];

          collection.forEach(element => {

            TrackArray.push(element.Track);
            ArtistArray.push(element.Artist);
            ReleaseArray.push(element.Release);
            GenreArray.push(element.Genre);
            KeyArray.push(element.Key);
            TempoArray.push(element.Tempo);
            TimeArray.push(element.Time);
            AddedArray.push(element.Added);
            AUDIO_IDArray.push(element.AUDIO_ID);
          });
          
          var coloR = [];
          var dynamicColors = function () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
          };

          for (var i = 0; i < TrackArray.length; i++) {
            coloR.push(dynamicColors());
          }

          this.setState({
            Data: {
              labels: TrackArray,
              datasets: [{
                height: 1000,
                label: 'Track Time',
                data: TimeArray,
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

export default GraphPage;