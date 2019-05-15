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
class App extends Component {
  state = {
    currentDay: null
  };
  onDayClick = (e, day, month, year) => {
    console.log("ici", day, month, year);
    this.setState({ currentDay: day, currentMonth: month, currentYear: year });
  };
  handleCloseDay = () => {
    this.setState({ currentDay: null });
  };

  render() {
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
            dayinfos={this.day}
            monthinfos={this.month}
            yearinfos={this.year}
          />
        )}
        <Calendar
          style={style}
          width="302px"
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
