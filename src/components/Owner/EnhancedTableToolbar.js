import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  lighten,
  Toolbar,
  TextField,
  Button,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Modal,
  Fade,
} from "@material-ui/core";
import clsx from "clsx";
import AddCircleIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import AddDishForm from "./AddDishForm";
import DeleteDishForm from "./DeleteDish";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.main,
        },
  title: {
    flex: "1 1 100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selected, handler, id, menu} = props;
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);

  const numSelected = selected.length;

  const handleClick = (action) => {
    setOpen(true);
    setAction(action);
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Menu
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete"
             onClick={() => handleClick("delete")}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Add a dish">
            <IconButton
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => handleClick("add")}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Modal
        aria-labelledby="form"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        ref={React.useRef()} 
      >
        { action === "add" ? 
          <AddDishForm id={id} menu={menu} handler={handler}/>
          :
       <DeleteDishForm selected={selected}  id={id} menu={menu} handler={handler} /> 
      }
      </Modal>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
};

export default EnhancedTableToolbar;
