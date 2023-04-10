import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../util/api";
import Table from "./Table";

// use object destructuring {} when receiving props
function LanguagesNav({ selectedLanguage, updateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <select
      // update state if user selects new language
      onChange={(e) => updateLanguage(e.target.value)}
      // set value of select to value of state
      // to display correct current state when first shown
      value={selectedLanguage}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    // will keep selectedLanguge in the state of the parent component
    // as other child components will need the information
    this.state = {
      selectedLanguage: "All",
      repos: null,
      error: null,
    };

    // bind update function to this to avoid error when referring to this.State
    // when calling function from onChange it is not strictly necessary in this case
    // as we are using arrow function in onChange that does not change the context
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    console.log("going to updatelang");
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    });

    console.log(`in updateLang, just set selectedLang`);

    fetchPopularRepos(selectedLanguage)
      .then((repos) => {
        this.setState({
          repos,
          error: null,
        });
      })
      .catch((error) => {
        console.warn(`Error fetching repos: ${error}`);
        this.setState({
          error: "There was a problem fetching the repositories",
        });
      });
  }

  render() {
    console.log(this.state);
    return (
      <main>
        <LanguagesNav
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        ></LanguagesNav>
        {this.state.repos && <Table repos={this.state.repos} />}
        {this.state.error && (
          <p className="text-center error">{this.state.error}</p>
        )}
      </main>
    );
  }
}
