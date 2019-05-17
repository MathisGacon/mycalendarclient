import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavMain from "./Components/partials/NavMain";
import BotNav from "./Components/partials/BotNav";
import axios from "axios";
import Signup from "./Components/auth/signup";
import Login from "./Components/auth/login";
import Day from "./Components/day/Day";

import Calendar from "./Components/calendar/index";
// import { months } from "moment";

// test axios

(function testAxios() {
  console.log(process.env.REACT_APP_SERVER_URL);
  axios
    .get(process.env.REACT_APP_SERVER_URL + "/foo")
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
})();
const style = {
  position: "relative",
  margin: "5Opx auto"
};

//create class app

class App extends Component {
  state = {
    currentDay: null,
    currentMonth: null,
    currentYear: null,
    startDate: 0,
    endDate: 0,
    name: "",
    color: ""
  };

  //set up on day click with the close button and get info from index

  onDayClick = (e, day) => {
    console.log("ici", day);
    this.setState({ currentDay: day });
  };
  handleCloseDay = () => {
    this.setState({ currentDay: null });
  };

  gettingInfosFromIndex = (monthFromIndex, yearFromIndex) => {
    console.log("OOOOOOO", monthFromIndex, yearFromIndex);
    this.setState({ currentMonth: monthFromIndex, currentYear: yearFromIndex });
  };

  //render return

  render() {
    console.log("looooool", this.state.currentMonth);
    return (
      <div className="nav">
        <NavMain />
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
        {/* <Route path="/calendar" component={calendar} /> */}
        {this.state.currentDay && (
          <Day
            closeDay={this.handleCloseDay}
            dayInfos={this.state.currentDay}
            monthInfos={this.state.currentMonth}
            yearInfos={this.state.currentYear}
          />
        )}
        <Calendar
          style={style}
          width="302px"
          gettingInfosFromIndex={this.gettingInfosFromIndex}
          onDayClick={(e, day) => {
            this.onDayClick(e, day);
          }}
        />

        {/* <Route exact path="/projects" component={ProjectList}/>
  <Route exact path="/projects/:id" component={ProjectDetails} /> */}

        <BotNav />
      </div>
    );
  }
}
export function checkloginStatus(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  next();
}
export default App;
//test deploy 1
