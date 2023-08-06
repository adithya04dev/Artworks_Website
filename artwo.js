   // DOM elements
   console.log("hi")
  
   const searchType = document.getElementById("searchTerm");
   const searchTerm = document.getElementById("searchValue");
   const searchBtn = document.getElementById("searchBtn");
   const resultsContainer = document.getElementById("results-container");
   
   // Event listener for search button
   searchBtn.addEventListener("submit", function(event) {
     event.preventDefault();
     const searchTypeValue = searchType.value;
     const searchTermValue = searchTerm.value;
       console.log("hi")
     // XHR request
     const xhr = new XMLHttpRequest();
     xhr.open(
       "GET",
       `https://www.rijksmuseum.nl/api/en/collection?key=${d8rnr3uL}&format=json&${searchTypeValue}=${searchTermValue}`,
       true
     );
     xhr.onreadystatechange = function() {
       if (xhr.readyState === 4 && xhr.status === 200) {
         const response = JSON.parse(xhr.responseText);
         const artObjects = response.artObjects;
         displayResults(artObjects);
       }
     };
   
     xhr.send();
   });
   
   // Function to display search results
   function displayResults(artObjects) {
     let output = "";
     if (artObjects.length === 0) {
       output = "<p>No results found.</p>";
     } else {
       artObjects.forEach(function(artObject) {
         const imageUrl = artObject.webImage ? artObject.webImage.url : "";
         const title = artObject.title ? artObject.title : "Title not available";
         const artist = artObject.principalOrFirstMaker ? artObject.principalOrFirstMaker : "Artist not available";
         const description = artObject.plaqueDescriptionEnglish ? artObject.plaqueDescriptionEnglish : "Description not available";
         const objectNumber = artObject.objectNumber ? artObject.objectNumber : "Object number not available";
   
         output += `
           <div class="card mb-3">
             <div class="row no-gutters">
               <div class="col-md-4">
                 <img src="${imageUrl}" class="card-img" alt="${title}">
               </div>
               <div class="col-md-8">
                 <div class="card-body">
                   <h5 class="card-title">${title}</h5>
                   <p class="card-text"><strong>Artist:</strong> ${artist}</p>
                   <p class="card-text"><strong>Description:</strong> ${description}</p>
                   <p class="card-text"><strong>Object Number:</strong> ${objectNumber}</p>
                 </div>
               </div>
             </div>
           </div>
         `;
       });
     }
     resultsContainer.innerHTML = output;
    }   