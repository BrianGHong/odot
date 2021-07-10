import React, { useState} from "react";
import { AppBar, Button, Checkbox, Container, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { useStyles } from './styles';

interface Props { };
interface ListItem {
  id: string,
  content: string,
  done: boolean
}

const MainList: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  // Sample items
  const starter: ListItem[] = [
    {id: "qlnwsb3twci", content: "This is an example task!", done: true },
    {id: "nn544fsun3j", content: "This is task that has yet to be done!", done: false },
    {id: "sd89gn4uid3", content: "Why don't you try adding tasks of your own?", done: false },
    {id: "d8vhj30dik3", content: "Feel free to delete me, I won't get offended... 🥲", done: false },
    {id: "fdsi4nu2nfs", content: "Sign-in and persistence coming soon!", done: false },
  ];

  // State
  let [state, setState] = useState({
    usingDarkMode: false,
    list: starter,
    addTaskOpen: false,
    addTaskErrors: false,
    content: "",
  });

  // Themes
  const theme = createTheme({
    palette: state.usingDarkMode ? {
      // Dark Mode
      type: 'dark',
      primary: {
        main: '#039be5'
      },
      background: {
        paper: '#212121'
      }
    } : {
      // Light Mode
      type: 'light',
      primary: {
        main: '#039be5'
      },
      background: {
        paper: '#fff'
      }
    }
  });

  /**
   * Add list item to the list
   * @param content content to go in new item
   */
  const addItem = (content: string) => {
    if (state.content !== "" && state.content !== "\n") {
      let newList = state.list;
      let newId = Math.random().toString(36).slice(2);
      if (state.list.filter((e:ListItem) => e.id === newId).length > 0) {
        addItem(content);
      }
      newList.push({ id: newId, content: content, done: false });

      setState({
        ...state,
        addTaskOpen: false,
        addTaskErrors: false,
        content: ""
      });
    } else {
      setState({...state, addTaskErrors: true});
    }
  }

  /**
   * Check/uncheck a given task
   * @param id id of task
   */
  const checkItem = (id: string) => {
    const newList = state.list.map((item:ListItem) => (item.id === id ? Object.assign({}, item, { done: !item.done }) : item));
    setState({...state, list: newList});
  }

  /**
   * Remove a list item from the list
   * @param id id of list item to delete
   */
  const deleteItem = (id: string) => {
    const newList = state.list.filter(ele => ele.id != id);
    setState({...state, list: newList});
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Container>
            <Toolbar>
              <Typography variant="h4">
                <b>odot</b>
              </Typography>
              <div className={classes.grow} />
              <IconButton edge="end" className={classes.themeButton} onClick={() => setState({...state, usingDarkMode: !state.usingDarkMode})}>
                { state.usingDarkMode ? <Brightness3Icon /> : <Brightness4Icon /> }
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          {/* Todo list items */}
          { state.list.length < 1 && (
            <Typography variant="h6" className={classes.emptyTodo}>Your odot list is empty!</Typography>
          )}
          <List>
            {state.list.map((listItem: ListItem) => {
              return (
                <ListItem key={listItem.id} dense button onClick={() => checkItem(listItem.id)}>
                  <ListItemIcon>
                    <Checkbox
                      color="default"
                      edge="start"
                      checked={listItem.done}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": `label-${listItem.id }`}}
                    />
                  </ListItemIcon>
                  <ListItemText id={`id-${listItem.id}`} primary={`${listItem.content}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(listItem.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Container>
        <Container>
          {/* Add Button */}
          <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setState({...state, addTaskOpen: true})}>
            <AddIcon />
          </Fab>
        </Container>
        {/* Add Task Dialog */}
        <Dialog open={state.addTaskOpen} onClose={() => setState({...state, addTaskOpen: false})} aria-labelledby="form-dialog-title">
          <form onSubmit={() => addItem(state.content)}>
            <DialogTitle id="form-dialog-title">What needs to be done? 🤔</DialogTitle>
            <DialogContent>
              <FormControl className={classes.formControl}>
                <TextField
                  error={(state.content === "" && state.addTaskErrors) ? true : false}
                  helperText={(state.content === "" && state.addTaskErrors) ? "Must not be empty." : ""}
                  onKeyUp={(e) => e.keyCode === 13 && addItem(state.content)} // Getting around textfield's newline, use enter to submit
                  variant="outlined"
                  id="content"
                  label=""
                  type="textarea"
                  placeholder="Add task..."
                  multiline
                  maxRows={5}
                  value={state.content}
                  onChange={(e) => setState({...state, content: e.target.value})}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setState({
                  ...state,
                  content: "",
                  addTaskOpen: false,
                  addTaskErrors: false
                });
              }} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={() => addItem(state.content)}
                variant="contained"
                color="primary">
                  Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
}

export default MainList;