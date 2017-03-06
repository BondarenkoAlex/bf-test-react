import React, {
    PropTypes,
} from 'react';
import image from '../../images/hangover.jpg';

function Elevator({floor, isOpen}) {
    let openClass = isOpen
        ? "elevator--open"
        : "";
    let topPos = -(floor-1)*90;
    return (
        <div className={`elevator ${openClass}`} style={{top:topPos}}>
            <div className="elevator__people">
                <img src={image} alt=""/>
            </div>
            <div className="elevator__board">{floor}</div>
        </div>
    );
}

Elevator.propTypes    = {
    floor : PropTypes.number,
    isOpen: PropTypes.bool,
};
Elevator.defaultProps = {
    floor : 1,
    isOpen: false,
};

export default Elevator;