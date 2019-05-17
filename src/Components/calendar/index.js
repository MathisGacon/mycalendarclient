import React from "react";
import moment from "moment";
import "./calendar.css";
import LongEvent from "../long-event/longEvent";

export default class Calendar extends React.Component {
  state = {
    dateContext: moment(),
    today: moment(),
    currentMonth: null,
    currentYear: null,
    showMonthPopup: false,
    showYearPopup: false,
    showLongEventPopup: false
  };
  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
  }

  // moment.updateLocale('en', {
  // weekdays = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday"
  // ];

  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  //intro set current : month year day date dayinmonth and firstdayofmonth
  year = () => {
    return this.state.dateContext.format("Y");
  };
  month = () => {
    return this.state.dateContext.format("MMMM");
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    return this.state.dateContext.get("date");
  };
  currentDay = () => {
    return this.state.dateContext.format("D");
  };
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  //month setup
  setMonth = month => {
    let monthNo = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNo);
    this.setState({
      dateContext: dateContext
    });
  };

  monthNav = () => {
    return (
      <span
        className="label-month"
        onClick={e => {
          this.onChangeMonth(e, this.month());
        }}
      >
        {this.month()}
        {this.state.showMonthPopup && <this.SelectList data={this.months} />}
      </span>
    );
  };

  onSelectChange = (e, data) => {
    this.setMonth(data);
    this.props.onChangeMonth && this.props.onChangeMonth();
  };

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    });
  };

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  };

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext
    });
    this.props.onNextMonth && this.props.onNextMonth();
  };

  //select list setup
  SelectList = props => {
    let popup = props.data.map((data, index) => {
      return (
        <div key={index}>
          <button
            onClick={e => {
              this.onSelectChange(e, data);
            }}
          >
            {data}
          </button>
        </div>
      );
    });

    return <div className="month-popup">{popup}</div>;
  };

  //send info to app

  monthSetUp = () => {
    console.log("YOOOOO", this.month(), this.year());
    this.props.gettingInfosFromIndex(this.month(), this.year());
  };

  //setup year

  setYear = year => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    this.setState({
      dateContext: dateContext,
      year: this.state.year
    });
  };

  showYearEditor = () => {
    this.setState({
      showYearNav: true
    });
  };

  yearNav = () => {
    return this.state.showYearNav ? (
      <input
        defaultValue={this.year()}
        className="editor-year"
        ref={yearInput => {
          this.yearInput = yearInput;
        }}
        onKeyUp={e => {
          this.onKeyUpYear(e);
        }}
        onChange={e => {
          this.onYearChange(e);
        }}
        type="number"
        placeholder="year"
      />
    ) : (
      <span
        className="label-year"
        onDoubleClick={e => {
          this.showYearEditor();
        }}
      >
        {this.year()}
      </span>
    );
  };

  onYearChange = e => {
    this.setYear(e.target.value);
    this.props.onYearChange && this.props.onYearChange(e, e.target.value);
  };

  onKeyUpYear = e => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value);
      this.setState({
        showYearNav: false
      });
    }
  };

  //day on click
  onDayClick = (e, day) => {
    this.props.onDayClick && this.props.onDayClick(e, day);
    return <div>{this.monthSetUp()}</div>;
  };

  //longeventclick setup
  onLongEventClick = () => {
    console.log("Hello");
    this.setState({ showLongEventPopup: !this.state.showLongEventPopup });
  };

  //get info from long event
  getInfosFromLongEvent = (
    startDateFromLongEvent,
    endDateFromLongEvent,
    nameFromLongEvent,
    colorFromLongEvent
  ) => {
    console.log(
      "OOOOOOO",
      startDateFromLongEvent,
      endDateFromLongEvent,
      colorFromLongEvent,
      nameFromLongEvent
    );
    this.setState({
      startDate: startDateFromLongEvent,
      endDate: endDateFromLongEvent,
      name: nameFromLongEvent,
      color: colorFromLongEvent,
      showLongEventPopup: false
    });
  };
  //create longevent info on calendar
  createLongEventInfo = (startDate, endDate) => {
    if (this.state.cu) this.state.dateContext.from(this.state.startDate);
    this.state.dateContext.to(this.state.endDate);
  };

  //render/return
  render() {
    //weekdays render
    let weekdays = this.weekdaysShort.map((day, index) => {
      return (
        <td key={index} className="week-day">
          {day}
        </td>
      );
    });

    //number of a day in month render with blank for start and en of a month
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === this.currentDay() ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d * 99} className={className}>
          <span
            onClick={e => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={i * 80} className="emptySlot">
          {""}
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let days = [];
    let weeks = [];

    totalSlots.forEach((week, i) => {
      if (i % 7 !== 0) {
        weeks.push(week);
      } else {
        let eachDays = weeks.slice();
        days.push(eachDays);
        if (i !== totalSlots.length - 1) {
          weeks = [];
          weeks.push(week);
        }
      }
    });

    let weeksElements = days.map((d, i) => {
      return (
        <tr className="day-display" key={d * 100}>
          {d}
        </tr>
      );
    });

    console.log("MONTH", this.month());
    console.log(weekdays);

    //return html
    return (
      <div className="calendar-container">
        <i className="long-event-creator" onClick={this.onLongEventClick}>
          +
        </i>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="5">
                <this.monthNav />
                <this.yearNav />
              </td>

              <td colSpan="2" className="nav-month">
                <i
                  className="prev fas fa-chevron-right"
                  onClick={e => {
                    this.prevMonth();
                  }}
                />
                <i
                  className="next fas fa-chevron-right"
                  onClick={e => {
                    this.nextMonth();
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            {weekdays}
            {weeksElements}
          </tbody>
        </table>
        <LongEvent
          css={
            this.state.showLongEventPopup ? "long-form-block" : "long-form-none"
          }
          getInfosFromLongEvent={this.getInfosFromLongEvent}
        />
      </div>
    );
  }
}
