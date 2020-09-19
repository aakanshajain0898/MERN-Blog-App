import { userReducer } from './userContext';
import { USER, CLEAR, UPDATE, UPDATEPIC, UPDATEPROFILE } from '../types';

describe('User Reducer', () => {
  test('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(undefined);
  });

  test('should store the user upon signin', () => {
    expect(
      userReducer(undefined, { type: USER, payload: { user: 'some-user' } })
    ).toEqual({ user: 'some-user' });
  });

  test('should clear the state', () => {
    expect(userReducer(undefined, { type: CLEAR })).toBeNull();
  });

  test('should store the updated followers & following', () => {
    expect(
      userReducer(undefined, {
        type: UPDATE,
        payload: { followers: 'some-followers', following: 'some-following' },
      })
    ).toEqual({ followers: 'some-followers', following: 'some-following' });
  });

  test('should store the updated  pic', () => {
    expect(
      userReducer(undefined, { type: UPDATEPIC, payload: 'some-pic' })
    ).toEqual({ pic: 'some-pic' });
  });

  test('should store the updated profile', () => {
    expect(
      userReducer(undefined, { type: UPDATEPROFILE, payload: 'some-name' })
    ).toEqual({ name: 'some-name' });
  });
});
