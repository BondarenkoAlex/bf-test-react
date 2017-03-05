import React, {
    PropTypes,
} from 'react';

import PanelButton from './PanelButton';

function ElevatorPanel({buttonsElevatorById, onSendElevatorToFloor}) {
    return (
        <div className="elevator__panel">
            <PanelButton
                onClick={onSendElevatorToFloor}
                floorNumber={5}
                isActive={buttonsElevatorById.hasOwnProperty(5)}
            /><br />
            <PanelButton
                onClick={onSendElevatorToFloor}
                floorNumber={3}
                isActive={buttonsElevatorById.hasOwnProperty(3)}
            />
            <PanelButton
                onClick={onSendElevatorToFloor}
                floorNumber={4}
                isActive={buttonsElevatorById.hasOwnProperty(4)}
            /><br />
            <PanelButton
                onClick={onSendElevatorToFloor}
                floorNumber={1}
                isActive={buttonsElevatorById.hasOwnProperty(1)}
            />
            <PanelButton
                onClick={onSendElevatorToFloor}
                floorNumber={2}
                isActive={buttonsElevatorById.hasOwnProperty(2)}
            />
        </div>
    );
}

ElevatorPanel.propTypes    = {
    buttonsElevatorById  : PropTypes.object.isRequired,
    onSendElevatorToFloor: PropTypes.func.isRequired,
};
ElevatorPanel.defaultProps = {};

export default ElevatorPanel;

