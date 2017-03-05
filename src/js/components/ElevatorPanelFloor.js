import React, {
    PropTypes,
} from 'react';

import FloorButton from './FloorButton';
import {DIRECTION} from '../constants'

function ElevatorPanelFloor({onClick, isActiveUp, isActiveDown}) {
    return (
        <div className="elevator__panel">
            <FloorButton
                onClick={()=>onClick(DIRECTION.UP)}
                label="up"
                isActive={isActiveUp}
            />
            <br />
            <FloorButton
                onClick={()=>onClick(DIRECTION.DOWN)}
                label="down"
                isActive={isActiveDown}
            />
        </div>
    );
}

ElevatorPanelFloor.propTypes    = {
    onClick     : PropTypes.func.isRequired,
    isActiveUp  : PropTypes.bool,
    isActiveDown: PropTypes.bool,
};
ElevatorPanelFloor.defaultProps = {
    isActiveUp  : false,
    isActiveDown: false,
};

export default ElevatorPanelFloor;

