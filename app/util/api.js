export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  console.log(`in api, endpoint is: ${endpoint}`);

  // fetch has to be on same line as return or return needs () otherwise type error is thrown
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `${username} does not exist`;
  }

  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        //error
        throw new Error(getErrorMsg(profile.message, username));
      }
      console.log(profile);
      return profile;
    });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        //error
        throw new Error(getErrorMsg(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce((total, { stargazers_count }) => {
    return total + stargazers_count;
  }, 0);
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    sortPlayers
  );
}
