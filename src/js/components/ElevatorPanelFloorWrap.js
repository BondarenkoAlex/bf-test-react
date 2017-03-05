import React, {
    PropTypes,
} from 'react';

import ElevatorPanelFloor from './ElevatorPanelFloor';

function ElevatorPanelFloorWrap({onCallElevator, buttonsUpById, buttonsDownById,}) {
    return (
        <div className="elevator__floors">
            <ElevatorPanelFloor
                onClick={direction => onCallElevator(direction, 5)}
                isActiveUp={buttonsUpById.hasOwnProperty(5)}
                isActiveDown={buttonsDownById.hasOwnProperty(5)}
            />
            <ElevatorPanelFloor
                onClick={direction => onCallElevator(direction, 4)}
                isActiveUp={buttonsUpById.hasOwnProperty(4)}
                isActiveDown={buttonsDownById.hasOwnProperty(4)}
            />
            <ElevatorPanelFloor
                onClick={direction => onCallElevator(direction, 3)}
                isActiveUp={buttonsUpById.hasOwnProperty(3)}
                isActiveDown={buttonsDownById.hasOwnProperty(3)}
            />
            <ElevatorPanelFloor
                onClick={direction => onCallElevator(direction, 2)}
                isActiveUp={buttonsUpById.hasOwnProperty(2)}
                isActiveDown={buttonsDownById.hasOwnProperty(2)}
            />
            <ElevatorPanelFloor
                onClick={direction => onCallElevator(direction, 1)}
                isActiveUp={buttonsUpById.hasOwnProperty(1)}
                isActiveDown={buttonsDownById.hasOwnProperty(1)}
            />
        </div>
    );
}

ElevatorPanelFloorWrap.propTypes    = {
    onCallElevator : PropTypes.func.isRequired,
    buttonsUpById  : PropTypes.object.isRequired,
    buttonsDownById: PropTypes.object.isRequired,
};
ElevatorPanelFloorWrap.defaultProps = {};

export default ElevatorPanelFloorWrap;

