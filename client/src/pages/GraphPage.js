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
        let NumberKeyArray = [];
        let TempoArray = [];
        let GenreArray = [];

        collection.forEach(element => {

          KeyArray.push(element.Key);
          NumberKeyArray.push(element.Key);
          TempoArray.push(element.Tempo);
          GenreArray.push(element.Genre);
          
        });

        // Gather unique data
        //====================================
        var unique = function(value, index, self) {
          return self.indexOf(value) === index;
        }

        //------------------------------------
        // Replace null key with 24
        for (var l = 0; l < KeyArray.length; l++) {
          if (KeyArray[l] === null) {
            KeyArray[l] = 24;
          }
        }
        for (l = 0; l < NumberKeyArray.length; l++) {
          if (NumberKeyArray[l] === null) {
            NumberKeyArray[l] = 24;
          }
        }

        let camelotArray = KeyArray;
        for (l = 0; l < camelotArray.length; l++) {
          if (camelotArray[l] === 0) {
            camelotArray[l] = "8B / C Major";
          }
          if (camelotArray[l] === 1) {
            camelotArray[l] = "3B / Db Major";
          }
          if (camelotArray[l] === 2) {
            camelotArray[l] = "10B / D Major";
          }
          if (camelotArray[l] === 3) {
            camelotArray[l] = "5B / Eb Major";
          }
          if (camelotArray[l] === 4) {
            camelotArray[l] = "12B / E Major";
          }
          if (camelotArray[l] === 5) {
            camelotArray[l] = "7B / F Major";
          }
          if (camelotArray[l] === 6) {
            camelotArray[l] = "2B / Gb Major";
          }
          if (camelotArray[l] === 7) {
            camelotArray[l] = "9B / G Major";
          }
          if (camelotArray[l] === 8) {
            camelotArray[l] = "4B / Ab Major";
          }
          if (camelotArray[l] === 9) {
            camelotArray[l] = "11B / A Major";
          }
          if (camelotArray[l] === 10) {
            camelotArray[l] = "6B / Bb Major";
          }
          if (camelotArray[l] === 11) {
            camelotArray[l] = "1B / B Major";
          }
          if (camelotArray[l] === 12) {
            camelotArray[l] = "5A / C Minor";
          }
          if (camelotArray[l] === 13) {
            camelotArray[l] = "12A / Db Minor";
          }
          if (camelotArray[l] === 14) {
            camelotArray[l] = "7A / D Minor";
          }
          if (camelotArray[l] === 15) {
            camelotArray[l] = "2A / Eb Minor";
          }
          if (camelotArray[l] === 16) {
            camelotArray[l] = "9A / E Minor";
          }
          if (camelotArray[l] === 17) {
            camelotArray[l] = "4A / F Minor";
          }
          if (camelotArray[l] === 18) {
            camelotArray[l] = "11A / Gb Minor";
          }
          if (camelotArray[l] === 19) {
            camelotArray[l] = "6A / G Minor";
          }
          if (camelotArray[l] === 20) {
            camelotArray[l] = "1A / Ab Minor";
          }
          if (camelotArray[l] === 21) {
            camelotArray[l] = "8A / A Minor";
          }
          if (camelotArray[l] === 22) {
            camelotArray[l] = "3A / Bb Minor";
          }
          if (camelotArray[l] === 23) {
            camelotArray[l] = "10A / B Minor";
          }
          if (camelotArray[l] === 24) {
            camelotArray[l] = "None";
          }
        }
        const keys = camelotArray.filter(unique).sort();
        const numberkeys = NumberKeyArray.filter(unique).sort(function (a, b) {return a - b});

        // const letterKeys = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm", "None"];

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
        NumberKeyArray.forEach(function (v, i) {
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
        keystempos.sort((a, b) => (a.Key > b.Key) ? 1 : ((b.Key > a.Key) ? -1 : 0));
        //------------------------------------

        const genres = GenreArray.filter(unique).sort();

        // Get data counts
        //====================================
        let keysCount = [];
        for (i = 0; i < keys.length; i++) {
          var count = 0;
          for (var j = 0; j < camelotArray.length; j++) {
            if (keys[i] === camelotArray[j]) {
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
        console.log(keyTempoCount);

        let keytempoData = [];
        for (i = 0; i < keyTempoCount.length; i++) {
          keytempoData.push({
            x: keystempos[i].Key,
            y: keystempos[i].Tempo,
            r: keyTempoCount[i]
          });
        }

        console.log(keytempoData)

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
            labels: numberkeys,
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