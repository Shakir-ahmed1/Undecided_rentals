import { combineReducers } from 'redux';

import users from './users';
import rentals from './rentals'

export const rootReducer  = combineReducers({ users, rentals });