import React, { Component } from "react";
import moment from "moment";
import "./Day.css";

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
    this.state = {
      dateContext: moment(),
      today: moment(),
      showHour: false,
      hour: moment.duration().hours()
    };
  }

  date = () => {
    return this.state.dateContext.format("D"); // Monday, June 9 2014 9:32 PM
  };
  month = () => {
    return this.state.dateContext.format("MMMM");
  };
  currentHours = () => {
    return this.state.dateContext.format("kk");
  };
  year = () => {
    return this.state.dateContext.format("Y");
  };

  //   setHours = hours => {
  //     let dateContext = Object.assign({}, this.state.dateContext);
  //     dateContext = moment(dateContext).set("hours", hours);
  //   };
  hourContainer = () => {
    return <div className="hours-container" />;
  };
  render() {
    let totalHours = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
    ];
    console.log(this.state.month);
    let hours = totalHours.map((hour, index) => {
      return (
        <td key={index} className="week-day">
          {hour}
        </td>
      );
    });
    return (
      <div className="day-container">
        <i className="close-day-event" onClick={this.props.closeDay}>
          X
        </i>
        <div className="day-event">
          <p className="date">
            {this.date()} {this.year()} {this.month()}
            {this.state.showMonthPopup && (
              <this.SelectList data={this.months} />
            )}
          </p>
          {this.state.hours || "pouet"}
          {hours}
        </div>
      </div>
    );
  }
}
