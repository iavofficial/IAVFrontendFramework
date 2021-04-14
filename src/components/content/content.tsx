import React, { Component } from "react";
import PropTypes from "prop-types";

import Contentbar from "./contentbar";
import Contentborder from "./contentBorder";

interface Props {
    contentElements: React.Component[]
}

class Content extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="p-d-flex p-flex-column" style={{ width: "100%" }}>
                <Contentbar contentElements={this.props.contentElements} />
                <div style={{ height: "100%" }}>
                    <Contentborder>
                        {this.props.children}
                    </Contentborder>
                </div>
            </div>
        );
    }
}

export default Content;