import { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    setInterval(() => this.setState({
      date: new Date()
    }), 1000);
  }

  render() {
    let dateString = this.state.date.toLocaleDateString("de-DE", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "p-d-flex p-jc-between p-p-3"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 500
      }
    }, "Date:"), /*#__PURE__*/React.createElement("div", null, dateString));
  }

}

export default Clock;