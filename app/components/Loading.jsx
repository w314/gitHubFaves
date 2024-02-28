import React from "react";
import PropTypes from "prop-types";

class Delayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    const { delay } = this.props;
    this.timer = window.setTimeout(() => {
      this.setState({ show: true });
    }, delay);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  render() {
    return this.state.show ? <div>{this.props.children}</div> : null;
  }
}

Delayed.defaultProps = {
  delay: 300,
};

Delayed.propTypes = {
  delay: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.text,
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState({ content: this.state.content + "." });
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <Delayed>
        <p>{this.state.content}</p>
      </Delayed>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
