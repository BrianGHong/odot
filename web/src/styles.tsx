import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh"
    },
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      }
    },
    fab: {
      position: "fixed",
      bottom: 15,
      left: "45vw"
    },
    emptyTodo: {
      color: "gray",
      margin: "25vh 0",
      textAlign: "center"
    },
    formControl: {
      width: "100%"
    },
    themeButton: {
      color: "white"
    },
  })
);