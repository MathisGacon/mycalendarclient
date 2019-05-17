import React, { Component } from "react";
import moment from "moment";
import "./Day.css";
import "../calendar/index";
import DayEvent from "../event-day/dayEvent";
import { getEvents } from "../../API/api";
//create class Day

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
    this.state = {
      dateContext: moment(),
      today: moment(),
      date: "",
      showHour: false,
      hour: moment.duration().hours(),
      showEventPopup: false,
      startTime: 0,
      endTime: 0,
      name: "",
      color: "",
      events: []
    };
  }

  //setup for date month currenthours et year

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

  //open event creator

  onEventClick = () => {
    console.log("Hello");
    this.setState({ showEventPopup: !this.state.showEventPopup });
  };

  //get info from dayevent

  getInfosFromDayEvent = (
    startTimeFromDayEvent,
    endTimeFromDayEvent,
    nameFromDayEvent,
    colorFromDayEvent
  ) => {
    this.setState({
      date: this.props.dayInfos + this.props.monthInfos + this.props.yearInfos,
      startTime: startTimeFromDayEvent,
      endTime: endTimeFromDayEvent,
      name: nameFromDayEvent,
      color: colorFromDayEvent,
      showEventPopup: false
    });
  };

  componentDidMount() {
    console.log("aaaa");
    console.log(
      "qjsfdsbqlvdsb",
      this.props.dayInfos + this.props.monthInfos + this.props.yearInfos
    );
    getEvents(
      `?date=${this.props.dayInfos +
        this.props.monthInfos +
        this.props.yearInfos}`
    )
      .then(dbRes => {
        console.log(dbRes, "ghghghgghgh");
        this.setState({
          events: dbRes.data
        });
      })
      .catch(dbErr => {
        console.log(dbErr, "eeee");
      });
  }

  // getEvent = () => {
  //   console.log("ssssss");

  //   return getEvents();
  // };

  //create event for day event

  render() {
    console.log(
      this.props.dayInfos + this.props.monthInfos + this.props.yearInfos
    );
    console.log(this.state.showEventPopup);

    //set style for event container

    var formEvent = "";
    console.log(formEvent);

    //set hour in a day

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

    var start = totalHours[this.state.startTime];
    var end = totalHours[this.state.endTime];
    //then map totalhours

    let hours = totalHours.map((hour, index) => {
      return start <= hour && hour <= end ? (
        <p key={index}>
          {hour}
          {"h"}
          <hr className="line-hour eventLine" />
          <div
            className="event-info"
            style={{ backgroundColor: this.state.color }}
          >
            {this.state.name}
          </div>
        </p>
      ) : (
        <p key={index}>
          {hour}
          {"h"} <hr className="line-hour" />
        </p>
      );
    });

    //then select from that time to that time

    //return
    console.log(this.state.dateContext);
    return (
      <div className="day-container">
        <i className="close-day-event" onClick={this.props.closeDay}>
          X
        </i>

        <div className="day-event">
          <i className="event-creater" onClick={this.onEventClick}>
            +
          </i>
          <p className="date">
            {this.props.dayInfos} {this.props.monthInfos} {this.props.yearInfos}
            {this.state.showMonthPopup && (
              <this.SelectList data={this.months} />
            )}
          </p>
          <div className="hour-day">{hours}</div>
        </div>
        {
          <DayEvent
            css={this.state.showEventPopup ? "form-block" : "form-none"}
            date={this.props.dayInfos}
            month={this.props.monthInfos}
            year={this.props.yearInfos}
            getInfosFromDayEvent={this.getInfosFromDayEvent}
          />
        }
      </div>
    );
  }
}
