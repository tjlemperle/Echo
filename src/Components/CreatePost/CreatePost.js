import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import "./CreatePost.css";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChooseSubforumDropdown from "./ChooseSubforumDropdown/ChooseSubforumDropdown";
import TextField from "@material-ui/core/TextField";
import ProfileBox from "../ProfileBox/ProfileBox";

function CreatePost(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [inputVal, setInputVal] = useState({
    post_title: "",
    post_content: ""
  });

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const { subforum } = props;
  return (
    <div className="create-post-container">
      <div className="post-form-container">
        <div className="subforum-dropdown-container">
          <ChooseSubforumDropdown />
        </div>
        <div className="post-form-body">
          <div className={classes.root}>
            <AppBar
              position="static"
              color="default"
              className={classes.tabBar}
            >
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab name="post_type"  label="Text" {...a11yProps(0)} />
                <Tab name="post_type"  label="Image & Video" {...a11yProps(1)} />
                <Tab name="post_type"  label="Link" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel
              className={classes.tabPanel}
              value={value}
              index={0}
              dir={theme.direction}
            >
              <div className="title-container">
                <TextField
                  className={classes.textArea}
                  onChange={handleInput}
                  id="standard-basic"
                  label="Title"
                  name="post_title"
                />
              </div>
              <div className="content-container">
                <TextField
                  className={classes.textArea}
                  onChange={handleInput}
                  name="post_content"
                  id="outlined-multiline-static"
                  label="Content"
                  variant="outlined"
                  multiline
                  rows={8}
                />
              </div>
              <div
                className="submit-button-container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button style={{ width: 95 }} className="signup-btn btn-style">
                  Submit
                </button>
              </div>
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={value}
              index={1}
              dir={theme.direction}
            >
              Image & Video
              <div
                className="submit-button-container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button style={{ width: 95 }} className="signup-btn btn-style">
                  Submit
                </button>
              </div>
            </TabPanel>
            <TabPanel
              className={classes.tabPanel}
              value={value}
              index={2}
              dir={theme.direction}
            >
              Link
              <span
                className="submit-button-container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button style={{ width: 95 }} className="signup-btn btn-style">
                  Submit
                </button>
              </span>
            </TabPanel>
          </div>
          <div></div>
        </div>
      </div>
      <div className="post-info-container">
        <ProfileBox
          subforum_banner={subforum.subforum_banner}
          subforum_name={subforum.subforum_name}
          cake_day={subforum.cake_day}
        />
        subforum rules
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser })(CreatePost);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
    height: 500,
    borderRadius: 8,
    boxShadow: "6px 6px 6px lightgrey",
    indicatorColor: "#0079d3",
    textColor: "#0079d3",
  },
  tabBar: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: "none",
    fontFamily: "IBM Plex Sans",
  },
  tabPanel: {
    display: "flex",
    flexDirection: "center",
    alignItems: "center",
  },
  textArea: {
    width: "100%",
  },
  tabs: {
    indicatorColor: "#0079d3",
    textColor: "#0079d3",
  },
}));
