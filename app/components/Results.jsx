import React from "react";

export default class Results extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.playerOne = this.playerOne

  // }

  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}
