import React, {
    PropTypes,
} from 'react';

function FloorButton({isActive, label, onClick}) {
    let activeClass = isActive ? "active" : null;
    return (
        <div className={`elevator__button elevator__button--lg ${activeClass}`}
             onClick={onClick}
        >
            {label}
        </div>
    );
}

FloorButton.propTypes    = {
    onClick : PropTypes.func.isRequired,
    label   : PropTypes.string.isRequired,
    isActive: PropTypes.bool,
};
FloorButton.defaultProps = {
    isActive: false,
};

export default FloorButton;

