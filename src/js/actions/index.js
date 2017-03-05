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

import {
    SPEED_ELEVATOR,
    TIMEOUT_OPEN_DOOR,
    TIMEOUT_BEFORE_OPEN_DOOR,
} from '../config';

//Было бы неплохо иметь возможность возвращать не простой объект, а функцию, внутри которой иметь доступ к методу dispatch,
// и вызывать его с необходимым типом действия. Псевдокод, мог бы выглядеть

export function sendElevatorToFloor(floor) {
    return (dispatch, getState) => {
        //сохраняем этаж
        dispatch(addFloor(floor));

        direct(floor, dispatch, getState);
    }
}

export function callElevator(buttonUpOrDown, floor) {
    return (dispatch, getState) => {
        if ((floor === 1 && buttonUpOrDown === DIRECTION.DOWN) || (floor === 5 && buttonUpOrDown === DIRECTION.UP)) return;
        //сохраняем нажатую кнопку на этаже
        if (buttonUpOrDown === DIRECTION.UP) {
            dispatch(addDirectionUp(floor));
        } else if (buttonUpOrDown === DIRECTION.DOWN) {
            dispatch(addDirectionDown(floor));
        }
        direct(floor, dispatch, getState);
    }
}

let direct = (floor, dispatch, getState) => {
    let {direction, currentFloor} = getState();

    if (direction === DIRECTION.WAIT) {
        //лифт находится в режиме ожидания
        if (isCurrentFloor(floor, currentFloor)) {
            //лифт вызвали на текущем этаже
            openDoor(dispatch)
                .then(()=> {
                    dispatch(removeFloor(floor));
                    dispatch(removeDirectionUp(floor));
                    dispatch(removeDirectionDown(floor));
                });
        } else {
            //лифт вызвали на другом этаже и его надо отправить "в движение"
            let direct = getDirection(floor, currentFloor);
            dispatch(setDirection(direct));
            elevatorMove(dispatch, getState);
        }
    } else {
        //уже должен быть в движении
    }
};

let isCurrentFloor = (floor, currentFloor) => {
    return (floor === currentFloor);
};

let getDirection = (floor, currentFloor) => {
    return (floor < currentFloor)
        ? DIRECTION.DOWN
        : DIRECTION.UP;
};

function addFloor(floor) {
    return {
        type: ADD_FLOOR,
        floor,
    };
}

function removeFloor(floor) {
    return {
        type: REMOVE_FLOOR,
        floor,
    };
}

function addDirectionUp(floor) {
    return {
        type: ADD_DIRECTION_UP,
        floor,
    };
}

function removeDirectionUp(floor) {
    return {
        type: REMOVE_DIRECTION_UP,
        floor,
    };
}

function addDirectionDown(floor) {
    return {
        type: ADD_DIRECTION_DOWN,
        floor,
    };
}

function removeDirectionDown(floor) {
    return {
        type: REMOVE_DIRECTION_DOWN,
        floor,
    };
}

function setDirection(direction) {
    return {
        type: SET_DIRECTION,
        direction,
    };
}

function setCurrentFloor(floor) {
    return {
        type: SET_CURRENT_FLOOR,
        floor,
    };
}

function statusDoor(isOpen) {
    return {
        type: STATUS_DOOR,
        isOpen,
    };
}

const elevatorMove = (dispatch, getState) => {
    setTimeout(elevatorStep, SPEED_ELEVATOR, dispatch, getState);
};

const elevatorStep = (dispatch, getState) => {
    let {
            direction,
            currentFloor,
            buttonsUpById,
            buttonsDownById,
            buttonsElevatorById,
        } = getState();
    if (direction === DIRECTION.UP) {
        let floor = currentFloor + 1;
        dispatch(setCurrentFloor(floor));

        if (isGoOutIn(buttonsElevatorById, floor) || isGoOutIn(buttonsUpById, floor)) {
            //на текущем этаже надо выйти или кому-то в сонаправлении
            elevatorLogic(floor, dispatch, getState);
        } else {
            if (isEmpty(buttonsElevatorById) && isGoOutIn(buttonsDownById, floor)) {
                let direct = isGoOutIn(buttonsDownById, floor)
                    ? DIRECTION.DOWN
                    : DIRECTION.UP;
                dispatch(setDirection(direct));
                elevatorLogic(floor, dispatch, getState);
            } else {
                //движение далее
                elevatorMove(dispatch, getState);
            }
        }
    } else if (direction === DIRECTION.DOWN) {
        let floor = currentFloor - 1;
        dispatch(setCurrentFloor(floor));

        if (isGoOutIn(buttonsElevatorById, floor) || isGoOutIn(buttonsDownById, floor)) {
            //на текущем этаже надо выйти или кому-то в сонаправлении
            elevatorLogic(floor, dispatch, getState);
        } else {
            if (isEmpty(buttonsElevatorById) && isGoOutIn(buttonsUpById, floor)) {
                let direct = isGoOutIn(buttonsUpById, floor)
                    ? DIRECTION.UP
                    : DIRECTION.DOWN;
                dispatch(setDirection(direct));
                elevatorLogic(floor, dispatch, getState);
            } else {
                //движение далее
                elevatorMove(dispatch, getState);
            }
        }
    }
};

const elevatorLogic = (floor, dispatch, getState) => {
    //кто-то хочет выйти на этаже
    openDoor(dispatch)
        .then(()=> {
            dispatch(removeFloor(floor));
            let direct = getState().direction;
            if (direct === DIRECTION.UP) {
                dispatch(removeDirectionUp(floor));
            } else if (direct === DIRECTION.DOWN) {
                dispatch(removeDirectionDown(floor));
            }
            let {
                    direction,
                    buttonsUpById,
                    buttonsDownById,
                    buttonsElevatorById,
                } = getState();
            if (isMoveNext(buttonsElevatorById, floor, direction)) {
                //есть нажатые кнопки в лифте в сонаправлении
                elevatorMove(dispatch, getState);
            } else if (isMoveNext(buttonsElevatorById, floor, (direction === DIRECTION.UP)
                    ? DIRECTION.DOWN
                    : DIRECTION.UP)) {
                dispatch(setDirection((direction === DIRECTION.UP)
                    ? DIRECTION.DOWN
                    : DIRECTION.UP));
                elevatorMove(dispatch, getState);
            }
            else {
                //выбор в каком направлении двигаться дальше
                if (isEmpty(buttonsElevatorById) && isEmpty(buttonsUpById) && isEmpty(buttonsDownById)) {
                    //перевод лифта в режим ожидания
                    dispatch(setDirection(DIRECTION.WAIT));
                } else {
                    if (direction === DIRECTION.UP) {
                        if (isMoveNext(buttonsUpById, floor, DIRECTION.UP) || isMoveNext(buttonsDownById, floor, DIRECTION.UP)) {
                            elevatorMove(dispatch, getState);
                        } else if (isMoveNext(buttonsUpById, floor, DIRECTION.DOWN) || isMoveNext(buttonsDownById, floor, DIRECTION.DOWN)) {
                            dispatch(setDirection(DIRECTION.DOWN));
                            elevatorMove(dispatch, getState);
                        } else {
                            dispatch(setDirection(DIRECTION.WAIT));
                        }
                    } else if (direction === DIRECTION.DOWN) {
                        if (isMoveNext(buttonsUpById, floor, DIRECTION.DOWN) || isMoveNext(buttonsDownById, floor, DIRECTION.DOWN)) {
                            elevatorMove(dispatch, getState);
                        } else if (isMoveNext(buttonsUpById, floor, DIRECTION.UP) || isMoveNext(buttonsDownById, floor, DIRECTION.UP)) {
                            dispatch(setDirection(DIRECTION.UP));
                            elevatorMove(dispatch, getState);
                        } else {
                            dispatch(setDirection(DIRECTION.WAIT));
                        }
                    }

                    //if (isMoveNext(buttonsElevatorById, floor, direction)) {
                }
            }
        });
};

const openDoor = (dispatch) => {
    return new Promise((resolve)=> {
        let pBefore = new Promise((resolve)=> {
            setTimeout(()=> {
                dispatch(statusDoor(true));
                resolve();
            }, TIMEOUT_BEFORE_OPEN_DOOR)
        });
        let pOpen   = new Promise((resolve)=> {
            setTimeout(()=> {
                dispatch(statusDoor(false));
                resolve();
            }, TIMEOUT_OPEN_DOOR)
        });
        pBefore
            .then(()=>pOpen)
            .then(()=>resolve());
    });
};

const isEmpty = (obj) => {
    return (Object.getOwnPropertyNames(obj).length === 0);
};

const isMoveNext = (obj, floor, direction) => {
    return Object.keys(obj)
        .some((item)=> {
            if (direction === DIRECTION.UP) {
                return (parseInt(item, 10) > floor);
            } else if (direction === DIRECTION.DOWN) {
                return (parseInt(item, 10) < floor);
            }

        });
};

const isGoOutIn = (obj, floor) => {
    return obj.hasOwnProperty(floor);
};




