import React, { ChangeEvent, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import debounce from 'lodash/debounce';

import { getQuery, setQuery, User, setSelectedUser } from '../../store';
import { AppContext } from '../AppContext';

import { FormControl, MenuItem, InputLabel, Select, TextField, makeStyles } from '@material-ui/core';

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
  const selectedUser = searchParams.get('user') || 0;
  const { users } = useContext(AppContext);

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
        className="filters__field"
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
          className="filters__field"
          labelId="demo-simple-select-outlined"
          id="demo-simple-select-outlined"
          label="Users"
          value={selectedUser}
          onChange={selectUser}
        >
          <MenuItem value="">
            Cancel
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
