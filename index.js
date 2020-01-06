'use strict';

/*You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:

https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=6eF2xuvqcgZ9wOQZRyKBJJ8yjyh4Haot9QXKTdCU

OR

HTTP Header
curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 'https://developer.nps.gov/api/v1/parks?parkCode=acad'

*/

// put your own value below!
const apiKey = '6eF2xuvqcgZ9wOQZRyKBJJ8yjyh4Haot9QXKTdCU'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
  console.log(queryItems.join('&'));
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson.data);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < maxResults; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  console.log(maxResults);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);