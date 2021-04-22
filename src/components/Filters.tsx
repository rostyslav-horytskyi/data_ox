import { FormControl, InputLabel, MenuItem, Select, TextField, makeStyles } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getQuery, setQuery, getListOfUsers, User, setSelectedUser } from '../store';
import debounce from 'lodash/debounce';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Filters = () => {
  const classes = useStyles();
  const query = useSelector(getQuery);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const users = useSelector(getListOfUsers);
  // const selectedUser = useSelector(getSelectedUser);
  const selectedUser = searchParams.get('user') || 0;

  const applyQuery = useCallback(debounce((newQuery: string | null) => {
    if (newQuery) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }

    history.push({ search: searchParams.toString() });
  }, 1000), []);

  const selectUser = (event: ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target as HTMLSelectElement;

    if (value) {
      searchParams.set('user', value);
    } else {
      searchParams.delete('user');
    }

    history.push({ search: searchParams.toString() });
    dispatch(setSelectedUser(+selectedUser));
  };

  return (
    <div className="filters">
      <TextField
        size="small"
        id="outlined-search"
        label="Search post"
        type="search"
        variant="outlined"
        value={query}
        onChange={({ target }) => {
          dispatch(setQuery(target.value));
          applyQuery(target.value);
        }}
      />
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
      >
        <InputLabel
          id="demo-simple-select-outlined-label"
        >
          Users
        </InputLabel>

        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Users"
          value={selectedUser}
          onChange={selectUser}
        >
          <MenuItem id="">
            <em>Cancel</em>
          </MenuItem>
          {users.map((user: User) => (
            <MenuItem key={`${user.id}`}
              value={`${user.id}`}
            >
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
