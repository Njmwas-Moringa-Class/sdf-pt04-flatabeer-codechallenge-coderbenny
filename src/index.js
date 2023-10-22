document.addEventListener('DOMContentLoaded', function () {
    const apiBaseUrl = 'http://localhost:3000';
  
    // Function to make a GET request and display the first beer's details
    function getFirstBeerDetails() {
      fetch(`${apiBaseUrl}/beers/1`)
        .then((response) => response.json())
        .then((data) => {
          const beerName = document.getElementById('beer-name');
          const beerImage = document.getElementById('beer-image');
          const beerDescription = document.getElementById('beer-description');
          const reviewList = document.getElementById('review-list');
  
          beerName.textContent = data.name;
          beerImage.src = data.image_url;
          beerDescription.textContent = data.description;
          
          reviewList.innerHTML = '';
  
          data.reviews.forEach((review) => {
            const listItem = document.createElement('li');
            listItem.textContent = review;
            reviewList.appendChild(listItem);
          });
        });
    }
  
    // Function to make a GET request and display the list of all beers in the menu
    function getAllBeers() {
      fetch(`${apiBaseUrl}/beers`)
        .then((response) => response.json())
        .then((data) => {
          const beerList = document.getElementById('beer-list');
  
          data.forEach((beer) => {
            const listItem = document.createElement('li');
            listItem.textContent = beer.name;
            listItem.addEventListener('click', () => displayBeerDetails(beer));
            beerList.appendChild(listItem);
          });
        });
    }
  
    // Function to display the details of a selected beer
    function displayBeerDetails(beer) {
      const beerName = document.getElementById('beer-name');
      const beerImage = document.getElementById('beer-image');
      const beerDescription = document.getElementById('beer-description');
      const reviewList = document.getElementById('review-list');
  
      beerName.textContent = beer.name;
      beerImage.src = beer.image_url;
      beerDescription.textContent = beer.description;
  
      reviewList.innerHTML = '';
  
      beer.reviews.forEach((review) => {
        const listItem = document.createElement('li');
        listItem.textContent = review;
        reviewList.appendChild(listItem);
      });
    }
  
    // Function to add a new review
    document.getElementById('review-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const reviewTextarea = document.getElementById('review');
      const reviewList = document.getElementById('review-list');
  
      const newReview = reviewTextarea.value;
      if (newReview.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = newReview;
        reviewList.appendChild(listItem);
  
        reviewTextarea.value = '';
      }
    });
  
    // When the page loads, call these functions
    getFirstBeerDetails();
    getAllBeers();
  });
  