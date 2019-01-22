import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../client/src/actions/itemActions';
import PropTypes from 'prop-types';

class AppList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick =  (id) => {
        this.props.deleteItem(id);
    }

    render() {
        
        const { items } = this.props.item;
        return (
            <Container>

                <ListGroup>
                    <TransitionGroup className="list">
                        {items.map(({ _id, Track }) => (
                            <CSSTransition key= {_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                    </Button>
                                    {Track}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        );
    }

}

AppList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(AppList);