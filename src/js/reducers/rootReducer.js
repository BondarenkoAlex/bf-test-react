import  {
    DIRECTION,
    ADD_FLOOR,
    REMOVE_FLOOR,
    ADD_DIRECTION_UP,
    REMOVE_DIRECTION_UP,
    ADD_DIRECTION_DOWN,
    REMOVE_DIRECTION_DOWN,
    SET_DIRECTION,
    SET_CURRENT_FLOOR,
    STATUS_DOOR,
} from '../constants';

const initialState = {
    direction          : DIRECTION.WAIT,
    currentFloor       : 1,
    buttonsUpById      : {},
    buttonsDownById    : {},
    buttonsElevatorById: {},
    isOpen             : false,
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FLOOR:
            return {
                ...state,
                buttonsElevatorById: {
                    ...state.buttonsElevatorById,
                    [action.floor]: undefined,
                },
            };
        case REMOVE_FLOOR: {
            let buttonsElevatorById = {...state.buttonsElevatorById};
            delete buttonsElevatorById[action.floor];
            return {
                ...state,
                buttonsElevatorById,
            };
        }
        case ADD_DIRECTION_UP:
            return {
                ...state,
                buttonsUpById: {
                    ...state.buttonsUpById,
                    [action.floor]: undefined,
                },
            };
        case REMOVE_DIRECTION_UP: {
            let buttonsUpById = {...state.buttonsUpById};
            delete buttonsUpById[action.floor];
            return {
                ...state,
                buttonsUpById,
            };
        }
        case ADD_DIRECTION_DOWN:
            return {
                ...state,
                buttonsDownById: {
                    ...state.buttonsDownById,
                    [action.floor]: undefined,
                },
            };
        case REMOVE_DIRECTION_DOWN: {
            let buttonsDownById = {...state.buttonsDownById};
            delete buttonsDownById[action.floor];
            return {
                ...state,
                buttonsDownById,
            };
        }
        case SET_DIRECTION:
            return {
                ...state,
                direction: action.direction,
            };
        case SET_CURRENT_FLOOR:
            return {
                ...state,
                currentFloor: action.floor,
            };
        case STATUS_DOOR:
            return {
                ...state,
                isOpen: action.isOpen,
            };
        default:
            return state;
    }
}

