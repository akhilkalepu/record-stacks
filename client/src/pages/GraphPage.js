import React, { Component } from 'react';
import {
  Container,
  Button
} from 'reactstrap';

import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class GraphPage extends Component {
    
    getTracks() {
      this.props.getItems();
      console.log("getting items")
    }

    visualizeTracks() {
      this.props.getItems();
      console.log("visualizing")
    }

    render() {
		  return (
        
        <Container>
          
          <Button
            color="dark"
            style={{margin: "2rem"}}
            onClick={this.getTracks}
          >Get Data</Button>

          <Button
            color="secondary"
            style={{margin: "2rem"}}
            onClick={this.visualizeData}
          >Visualize</Button>

        </Container>
      );
    }
}

GraphPage.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(GraphPage);