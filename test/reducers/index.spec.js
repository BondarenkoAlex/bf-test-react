import rootReducer from '../../src/js/reducers/rootReducer';
import * as constants from '../../src/js/constants';
import {expect} from 'chai';

describe('root reducer', () => {
    it('default', () => {
        expect(
            rootReducer(undefined, {})
        )
            .to
            .eql({
                direction          : constants.DIRECTION.WAIT,
                currentFloor       : 1,
                buttonsUpById      : {},
                buttonsDownById    : {},
                buttonsElevatorById: {},
                isOpen             : false,
            });
    });

    it('should handle ADD_FLOOR', () => {
        expect(
            rootReducer(undefined, {
                type : constants.ADD_FLOOR,
                floor: 1,
            })
        )
            .to
            .have
            .deep
            .property('buttonsElevatorById.1', undefined);
    });

    it('should handle REMOVE_FLOOR', () => {
        expect(
            rootReducer({buttonsElevatorById: {1: undefined}}, {
                type : constants.REMOVE_FLOOR,
                floor: 1,
            })
        )
            .to
            .have
            .property('buttonsElevatorById')
            .and
            .eql({});
    });

    it('should handle REMOVE_FLOOR', () => {
        expect(
            rootReducer({buttonsElevatorById: {1: undefined}}, {
                type : constants.REMOVE_FLOOR,
                floor: 1,
            })
        )
            .to
            .have
            .property('buttonsElevatorById')
            .and
            .eql({});
    });

    it('should handle SET_DIRECTION', () => {
        expect(
            rootReducer(undefined, {
                type : constants.SET_DIRECTION,
                direction: constants.DIRECTION.UP,
            })
        )
            .to
            .have
            .property('direction')
            .and
            .eql(constants.DIRECTION.UP);
    });


});
