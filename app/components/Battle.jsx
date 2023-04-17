import React from "react";
import PropTypes from "prop-types";
import { close } from "./icons";
import Results from "./Results";

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

function PlayerPreview({ username, onReset, label }) {
  return (
    <article className="card">
      <h3 className="player-label">{label}</h3>
      <div className="split">
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className="avatar"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button onClick={onReset} className="btn secondary icon">
          {close}
        </button>
        \
      </div>
    </article>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false,
    };

    this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
    this.onPlayerReset = this.onPlayerReset.bind(this);
  }

  onPlayerSubmit(key, player) {
    this.setState({ [key]: player });
  }

  onPlayerReset(player) {
    this.setState({ [player]: null });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;
    const disabled = !playerOne || !playerTwo;
    if (battle === true) {
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
    }
    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Players</h1>
          {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          <button
            className={`btn primary ${disabled ? "disabled" : ""}`}
            onClick={() => this.setState({ battle: true })}
          >
            Battle
          </button>
        </div>
        <section className="grid">
          {playerOne === null ? (
            <PlayerInput
              onSubmit={(player) => this.onPlayerSubmit("playerOne", player)}
              label="Player One"
            ></PlayerInput>
          ) : (
            <PlayerPreview
              username={playerOne}
              onReset={() => this.onPlayerReset("playerOne")}
              label="Player One"
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              onSubmit={(player) => this.onPlayerSubmit("playerTwo", player)}
              label="Player Two"
            ></PlayerInput>
          ) : (
            <PlayerPreview
              username={playerTwo}
              onReset={() => this.onPlayerReset("playerTwo")}
              label="Player Two"
            />
          )}
        </section>
        <Instructions />
      </main>
    );
  }
}
