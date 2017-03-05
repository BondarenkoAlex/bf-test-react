import React, {
    Component,
    PropTypes,
} from 'react';
import { connect } from 'react-redux';

import Elevator from '../components/Elevator';

class ElevatorContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {
                floor,
                isOpen,
            } = this.props;
        return (
            <Elevator
                floor={floor}
                isOpen={isOpen}
            />
        );
    }
}

ElevatorContainer.propTypes    = {
    floor : PropTypes.number,
    isOpen: PropTypes.bool,
};
ElevatorContainer.defaultProps = {};

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        floor : state.currentFloor,
        isOpen: state.isOpen,
    }
};

export default connect(mapStateToProps)(ElevatorContainer);

