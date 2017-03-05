import React, {
    Component,
    PropTypes
} from 'react';

import '../../style/scss/main.scss';

import ElevatorPanelContainer from './ElevatorPanelContainer';
import ElevatorPanelFloorWrapContainer from './ElevatorPanelFloorWrapContainer';
import ElevatorContainer from './ElevatorContainer';

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="flex-row align-center justify-center" style={{height: '100%'}}>
                <ElevatorContainer/>
                <ElevatorPanelContainer/>
                <ElevatorPanelFloorWrapContainer/>
            </div>
        );
    }
}

App.propTypes    = {};
App.defaultProps = {};

export default App;