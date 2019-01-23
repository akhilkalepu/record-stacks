import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import {
  Pie,
  Bar,
  HorizontalBar,
  Bubble
} from 'react-chartjs-2';
import axios from 'axios';

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

        // Gather data
        const collection = res.data;

        let KeyArray = [];
        let TempoArray = [];
        let GenreArray = [];

        collection.forEach(element => {

          KeyArray.push(element.Key);
          TempoArray.push(element.Tempo);
          GenreArray.push(element.Genre);
          
        });

        // Gather unique data
        //====================================
        var unique = function(value, index, self) {
          return self.indexOf(value) === index;
        }

        //------------------------------------
        
        const keys = KeyArray.filter(unique).sort(function(a, b){return a - b});

        //------------------------------------

        // Round tempo to the nearest 10 for tempos10
        let Tempo10Array = [];
        for (var i = 0; i < TempoArray.length; i++) {
          Tempo10Array[i] = Math.round(TempoArray[i] / 10) * 10;
        }
        const tempos10 = Tempo10Array.filter(unique).sort(function (a, b) {return a - b});

        //------------------------------------

        for (i = 0; i < TempoArray.length; i++) {
          TempoArray[i] = Math.round(TempoArray[i]);
        }
        const tempos = TempoArray.filter(unique).sort(function (a, b) {return a - b});

        //------------------------------------
        
        let KeyTempoArray = [];
        KeyArray.forEach(function (v, i) {
          var obj = {};
          obj.Key = v;
          obj.Tempo = Tempo10Array[i];
          KeyTempoArray.push(obj);
        });

        const keystempos = KeyTempoArray.filter((e, i) => {
          return KeyTempoArray.findIndex((x) => {
          return x.Key === e.Key && x.Tempo === e.Tempo;
          }) === i;
        });
        keystempos.sort(function (a, b) {
          return a.Key - b.Key;
        });

        //------------------------------------

        const genres = GenreArray.filter(unique).sort();

        // Get data counts
        //====================================
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

        //------------------------------------

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

        //------------------------------------

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

        //------------------------------------

        let keyTempoCount = [];
        for (i = 0; i < keystempos.length; i++) {
          count = 0;
          for (j = 0; j < KeyTempoArray.length; j++) {
            if (keystempos[i].Key === KeyTempoArray[j].Key && keystempos[i].Tempo === KeyTempoArray[j].Tempo) {
              count++;
            }
          }
          keyTempoCount.push(count);
        }
        let keytempoData = [];
        for (i = 0; i < keyTempoCount.length; i++) {
          keytempoData.push({
            x: keystempos[i].Key,
            y: keystempos[i].Tempo,
            r: keyTempoCount[i]
          });
        }

        //------------------------------------

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
        //====================================
        var keysColors = [];
        var tempos10Colors = [];
        var keytempoColors = [];
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
        for (i = 0; i < tempos10.length; i++) {
          tempos10Colors.push(dynamicColors());
        }
        for (i = 0; i < keystempos.length; i++) {
          keytempoColors.push(dynamicColors());
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

          KeyTempoBubble: {
            labels: keys,
            datasets: [{
              label: 'Key/Tempo Bubble Chart',
              data: keytempoData,
              backgroundColor: keytempoColors
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
          <h2>Key</h2>
          <HorizontalBar
            data={this.state.KeyBar}
            height="400"
            options={{
              legend: {
                display: false
              },
              maintainAspectRatio: false
            }}/>
        </div>
        
        <br/>

        <div>
          <h2>Tempo</h2>
          <Bar
            data={this.state.TempoBar}
            height="400"
            options={{
              legend: {
                display: false
              },
              maintainAspectRatio: false
            }}/>
        </div>

        <br/>

        <div>
          <h2>Key/Tempo</h2>
          <Bubble
            data={this.state.KeyTempoBubble}
            height="800"
            options={{
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                  type: 'logarithmic',
                  ticks: {
                    min: 0,
                    max: 210,
                    callback: function (value, index, values) { //needed to change the scientific notation results from using logarithmic scale
                      return Number(value.toString()); //pass tick values as a string into Number function
                    }
                  }
                }]
              },
              maintainAspectRatio: false
            }}/>
        </div>
        
        <br/>

        <div>
          <h2>Genre</h2>
          <Pie
            data={this.state.GenrePie}
            height="400"
            options={{
              legend: {
                display: false
              },
              maintainAspectRatio: false
            }}/>
        </div>

      </Container>
    );
  }
}

export default GraphPage;