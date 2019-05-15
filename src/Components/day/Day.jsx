import React, { Component } from "react";
import moment from "moment";
import "./Day.css";

export default class Day extends Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false
  };
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
  }
  currentDay = () => {
    return this.state.dateContext.format("D");
  };
  currentDate = () => {
    return this.state.dateContext.get("date");
  };
  render() {
    return (
      <div className="day-container">
        <i className="close-day-event" onClick={this.props.closeDay}>
          X
        </i>
        <div className="day-event">
          <p className="date">
            {this.currentDay()} {this.daysInMonth()}
          </p>
        </div>
      </div>
    );
  }
}
