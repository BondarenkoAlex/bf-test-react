import React, {
    PropTypes,
} from 'react';

function PanelButton({isActive, floorNumber, onClick}) {
    let activeClass = isActive ? "active" : null;
    return (
        <div
            className={`elevator__button ${activeClass}`}
            onClick={()=>onClick(floorNumber)}
        >
            {floorNumber}
        </div>
    );
}

PanelButton.propTypes    = {
    floorNumber: PropTypes.number.isRequired,
    onClick    : PropTypes.func.isRequired,
    isActive   : PropTypes.bool,
};
PanelButton.defaultProps = {
    isActive: false,
};

export default PanelButton;

