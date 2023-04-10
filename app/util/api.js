export function fetchPopularRepos(language) {
  
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  console.log(`in api, endpoint is: ${endpoint}`)
  
  // fetch has to be on same line as return or return needs () otherwise type error is thrown
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if(!data.items) {
        throw new Error(data.message)
      }
      return data.items
    } )
}