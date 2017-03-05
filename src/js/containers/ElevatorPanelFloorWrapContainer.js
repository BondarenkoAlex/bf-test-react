import React, {
    Component,
    PropTypes,
} from 'react';
import {connect} from 'react-redux';

import ElevatorPanelFloorWrap from '../components/ElevatorPanelFloorWrap';
import {callElevator} from '../actions';

class ElevatorPanelFloorWrapContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {
                onCallElevator,
                buttonsUpById,
                buttonsDownById,
            } = this.props;
        return (
            <ElevatorPanelFloorWrap
                onCallElevator={onCallElevator}
                buttonsUpById={buttonsUpById}
                buttonsDownById={buttonsDownById}
            />
        );
    }
}

ElevatorPanelFloorWrapContainer.propTypes    = {
    onCallElevator : PropTypes.func,
    buttonsUpById  : PropTypes.object,
    buttonsDownById: PropTypes.object,
};
ElevatorPanelFloorWrapContainer.defaultProps = {};

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        buttonsUpById  : state.buttonsUpById,
        buttonsDownById: state.buttonsDownById,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCallElevator: (direction, floor) => {
            dispatch(callElevator(direction, floor))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ElevatorPanelFloorWrapContainer);

