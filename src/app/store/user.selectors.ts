import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  state => state.user
);
// Select the user's name 
export const selectUserName = createSelector(
  selectUser,
  user => user?.name
);

//select the users email
export const selectUserEmail = createSelector(
  selectUser,
  user => user?.email
);

//select the users password
export const selectUserPassword = createSelector(
  selectUser,
  user => user?.password
);

//select the users organization name
export const selectUserOrgName = createSelector(
  selectUser,
  user => user?.orgName
);

//select the users designation
export const selectUserDesignation = createSelector(
  selectUser,
  user => user?.designation
);

//select the users birth date
export const selectUserBirthDate = createSelector(
  selectUser,
  user => user?.birthdate
);

//select the users city
export const selectUserCity = createSelector(
  selectUser,
  user => user?.city
);

//select the users pincode
export const selectUserPinCode = createSelector(
  selectUser,
  user => user?.pincode
);


