import React, { Component } from "react";
import "./longEvent.css";
import moment from "moment";
import { postLongEvent } from "../../API/api";

export default class DayEvent extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
    this.state = {
      dataContext: moment(),
      startDate: 0,
      endDate: 0,
      name: "",
      color: ""
    };
  }

  //setup submit and get input

  handleSubmit = evt => {
    evt.preventDefault();
    postLongEvent({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      name: this.state.name,
      color: this.state.color
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err.response));
    return <div>{this.startEndDateSetUp()}</div>;
  };
  handleInput = evt => {
    console.log(evt);
    // let's take out the actual name out of the current typed input
    const { name, value } = evt.target; // extract name and value from
    this.setState({ [name]: value }); // generic way to access any state key/value pair
    // example: this.state.price value will be equal to the value of the form field wich name attribute is price
  };

  //send in to index(calendar)

  startEndDateSetUp = () => {
    console.log(
      "YOOOOO",
      this.state.startDate,
      this.state.endDate,
      this.state.name,
      this.state.color
    );
    this.props.getInfosFromLongEvent(
      this.state.startDate,
      this.state.endDate,
      this.state.name,
      this.state.color
    );
  };

  render() {
    console.log(this.props.css);
    return (
      <div className={" long-event-container " + this.props.css}>
        <form className="form-long-event">
          <label className="long-event-start-date">
            Choose a Start date for the schedul
          </label>
          <input
            name="startDate"
            id="event-start-date"
            type="date"
            onChange={this.handleInput}
          />
          <br />
          <label className="long-event-end-date">
            Choose a end date for the schedul
          </label>
          <input
            name="endDate"
            id="event-end-date"
            type="date"
            onChange={this.handleInput}
          />
          <br />
          <label className="long-event-name">
            Choose a name for the schedul :
          </label>
          <input
            name="name"
            id="long-event-name"
            type="text"
            onChange={this.handleInput}
          />
          .<br />
          <label className="long-event-color">
            Choose a color for the schedul :
          </label>
          <input
            name="color"
            id="long-event-color"
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
