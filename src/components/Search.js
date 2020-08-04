import React, { useState } from "react";
import Router from "next/router";
import {
  fade,
  makeStyles,
  IconButton,
  InputBase,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.transparent,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.02),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: fade(theme.palette.common.black, 0.75),
    paddingLeft: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = () => {
  const classes = useStyles();

  const [search, saveSearch] = useState("");

  const searchRestaurant = (e) => {
    e.preventDefault();

    if (search.trim() === "") return;

    // redirect to /search
    Router.push({
      pathname: "/search",
      query: { q: search },
    });
  };

  return (
    <form onSubmit={searchRestaurant}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => saveSearch(e.target.value)}
        />
        {search ? (
          <Button variant="text" color="primary" type="submit"> Search </Button>
        ) : null}
      </div>
    </form>
  );
};

export default Search;
