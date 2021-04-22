import React from 'react';
import { usePagination } from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: '20px',
    display: 'flex',
  },
});

export default function Pagination() {
  const classes = useStyles();
  const { items } = usePagination({
    count: 10,
  });

  return (
    <nav>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <Button variant="contained">
                <Link to={`${page}`} style={{ fontWeight: selected ? 'bold' : undefined }} {...item} className="link">
                  {page}
                </Link>
              </Button>
            );
          } else {
            children = (
              <Button
                variant="contained"
                color="primary"
              >
                <Link to={`${page}`} {...item} className="link">
                  {type}
                </Link>
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
