import React from "react";
import propTypes from "prop-types";

function Instructions() {
  return (
    <section className="instruction-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 GitHub users</li>
        <li>Battle</li>
        <li>See the winners</li>
      </ol>
    </section>
  );
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <form className="card big-light" onSubmit={this.handleSubmit}>
        <label htmlFor="username">{this.props.label}</label>
        <input
          type="text"
          id="username"
          className="input-light"
          placeholder="github username"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn link btn-dark"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
    };

    this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
  }

  onPlayerSubmit(key, player) {
    this.setState({ [key]: player });
  }

  render() {
    const { playerOne, playerTwo } = this.state;
    const disabled = !playerOne || !playerTwo;
    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Players</h1>
          <a className={`btn primary ${disabled ? "disabled" : ""}`}>Battle</a>
        </div>
        <section className="grid">
          {playerOne === null ? (
            <PlayerInput
              onSubmit={(player) => this.onPlayerSubmit("playerOne", player)}
              label="Player One"
            ></PlayerInput>
          ) : null}
          {playerTwo === null ? (
            <PlayerInput
              onSubmit={(player) => this.onPlayerSubmit("playerTwo", player)}
              label="Player Two"
            ></PlayerInput>
          ) : null}
        </section>
        <Instructions />
      </main>
    );
  }
}
