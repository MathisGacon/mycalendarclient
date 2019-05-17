import React, { Component } from "react";
import "./dayEvent.css";
import moment from "moment";
import { postEvent } from "../../API/api";

export default class DayEvent extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
    this.state = {
      dataContext: moment(),
      date: 0,
      startTime: 0,
      endTime: 0,
      name: "",
      color: ""
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();

    postEvent({
      date: this.props.date + this.props.month + this.props.year,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      name: this.state.name,
      color: this.state.color
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err.response));
    return <di>{this.sendInfoToDay()}</di>;
  };
  handleInput = evt => {
    console.log(evt);
    // let's take out the actual name out of the current typed input
    const { name, value } = evt.target; // extract name and value from
    this.setState({ [name]: value }); // generic way to access any state key/value pair
    // example: this.state.price value will be equal to the value of the form field wich name attribute is price
  };
  //send info to day

  sendInfoToDay = () => {
    console.log(
      "YOOOOO",
      this.state.dayInfos,
      this.state.startTime,
      this.state.endTime,
      this.state.name,
      this.state.color
    );
    this.props.getInfosFromDayEvent(
      this.state.startTime,
      this.state.endTime,
      this.state.name,
      this.state.color
    );
  };

  render() {
    return (
      <div className={this.props.css + " event-container"}>
        <form>
          <label for="event-start-time">
            Choose a Start time for the meeting
          </label>
          <input
            name="startTime"
            id="event-start-time"
            type="number"
            onChange={this.handleInput}
          />
          H.
          <br />
          <label for="event-end-time">Choose a end time for the meeting</label>
          <input
            name="endTime"
            id="event-end-time"
            type="number"
            onChange={this.handleInput}
          />
          H.
          <br />
          <label for="event-name">Choose a name for the event :</label>
          <input
            name="name"
            id="event-name"
            type="text"
            onChange={this.handleInput}
          />
          .<br />
          <label for="event-color">Choose a color for the event :</label>
          <input
            name="color"
            id="event-color"
            type="color"
            onChange={this.handleInput}
          />
          <br />
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
