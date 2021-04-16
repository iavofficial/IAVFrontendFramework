import { Component } from "react";

interface State {
    date: Date;
}

class Clock extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        setInterval(() => this.setState({ date: new Date() }), 1000);
    }

    render() {
        let dateString = this.state.date.toLocaleDateString("de-DE", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        return (
            <div className="p-d-flex p-jc-between p-p-3">
                <div style={{ fontWeight: 500 }}>Date:</div>
                <div>{dateString}</div>
            </div>
        );
    }
}

export default Clock;