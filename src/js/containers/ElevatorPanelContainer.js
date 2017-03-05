import React, {
    Component,
    PropTypes,
} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';

import ElevatorPanel from '../components/ElevatorPanel';
import {sendElevatorToFloor} from '../actions';

class ElevatorPanelContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {
                buttonsElevatorById,
                onSendElevatorToFloor,
            } = this.props;
        return (
            <ElevatorPanel
                buttonsElevatorById={buttonsElevatorById}
                onSendElevatorToFloor={onSendElevatorToFloor}
            />
        );
    }
}

ElevatorPanelContainer.propTypes    = {
    buttonsElevatorById  : PropTypes.object,
    onSendElevatorToFloor: PropTypes.func,
};
ElevatorPanelContainer.defaultProps = {};

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        buttonsElevatorById: state.buttonsElevatorById,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSendElevatorToFloor: (floor) => {dispatch(sendElevatorToFloor(floor))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ElevatorPanelContainer);

