import React, { useState, useEffect } from "react";
import actions from "../api/index";
import TheContext from "../TheContext";
import "./FormUpdate.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    flexDirection: "row",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
function FormUpdate(props) {
  const { history, user } = React.useContext(TheContext);
  const classes = useStyles();
  const [project, setProject] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [description, setDescription] = useState([]);
  const [website, setWebsite] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [classMate, setClassMate] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [checked, setChecked] = useState(false);

  if (!user.email) {
    history.push("/login");
  }
  if (props.user.class === "Test") {
    history.push("/");
  }

  useEffect(() => {
    async function getData() {
      let result = await actions.getEditProject({
        projectId: props.match.params.id,
      });
      setProjectName(result.data?.valueField.projectName);
      setDescription(result.data?.valueField.description);
      setWebsite(result.data?.valueField.website);
      setTeamMembers(result.data.valueField.studentsID);
      let result2 = await actions.getStudentList({ class: user.class });
      setClassMate(result2?.data?.nameList);
    }
    getData();
  }, []);
  async function editProjects() {
    let res2 = await actions.editProject({
      projectId: props.match.params.id,
      projectName,
      description,
      website,
      teamMembers,
    });
    // console.log(res2, "Fabian & Rabiul are the shit!");
  }

  const handleSubmit = (e) => {
    editProjects();
    history.push("/");
    e.preventDefault();
  };
  const handleChange = (e) => {
    setTeamMembers(
      teamMembers.includes(e.target.value)
        ? teamMembers.filter((m) => m !== e.target.value)
        : [...teamMembers, e.target.value]
    );
    // (e.target.checked)?setTeamMembers([...teamMembers, e.target.value]):(teamMembers.splice(teamMembers.indexOf(e.target.value),1))
  };
  const handleSwitch = () => {
    setTrigger(!trigger);
  };

  return (
    <div className="formUpdate">
      <div>
        <h2 className="editHeader">Edit Projects</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl
          className={classes.formControl}
          variant="outlined"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setProjectName(e.target.value)}
            id="outlined-basic"
            //label="Project Name"
            placeholder={projectName}
            variant="outlined"
          />
          <TextField
            fullWidth
            className="editField"
            onChange={(e) => setWebsite(e.target.value)}
            id="outlined-basic"
            //label="Website"
            placeholder={website}
            variant="outlined"
          />
        </FormControl>
        <TextField
          className="editField"
          onChange={(e) => setDescription(e.target.value)}
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          // label="Description"
          placeholder={description}
        />
        <Button
          className="btnUpdate"
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Update
        </Button>
      </form>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              // color="secondary"
              onChange={handleSwitch}
            />
          }
          label="Have Team Member?"
        />
      </FormGroup>
      {trigger ? (
        <List id="studentName" dense className={classes.root}>
          <h3>Select Student</h3>
          {classMate.map((eachMate) => {
            return eachMate._id === user._id ? (
              <ListItem key={eachMate._id} button>
                <ListItemAvatar>
                  <Avatar alt="classMate" src={eachMate.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${eachMate?.name}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    // onChange={(e)=>{handleChange(e)}}
                    // value={`${eachMate._id}`}
                    disabled
                    checked
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ) : teamMembers.includes(eachMate._id) ? (
              <ListItem key={eachMate._id} button>
                <ListItemAvatar>
                  <Avatar alt="classMate" src={eachMate.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${eachMate?.name}`} />
                <ListItemSecondaryAction>
                  <FormControlLabel
                    control={
                      <Checkbox
                        edge="end"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={`${eachMate._id}`}
                        defaultChecked
                      />
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
              <ListItem key={eachMate._id} button>
                <ListItemAvatar>
                  <Avatar alt="classMate" src={eachMate.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={`${eachMate?.name}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={`${eachMate._id}`}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </div>
  );
}
export default FormUpdate;
