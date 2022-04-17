import "./styles.scss";

// fetch("/api/properties?location=brighton")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json.result.properties.elements);
//     document.querySelector("#app").innerHTML =
//       "<p>Check the JS console for some data...</p>";
//   })
//   .catch((err) => {
//     console.error(err);
//     document.querySelector("#app").innerHTML =
//       "<p>Something went wrong. Check the console for details.</p>";
//   });

function _renderProperty(property) {
  return `
                  <div class="row" data-id"${property.property_id}">
                  <img class="col property-image" alt="${property.display_address}" src="http://mr0.homeflow.co.uk/${property.photos[0]}">
                  
                    </img>
                    <div class="col">
                      <div class="row">
                      ${property.bedrooms}
                      </div>
                      <div class="row">
                      ${property.bathrooms}
                      </div>
                      <div class="row">
                      £${property.price_value}
                      </div>
                  </div>
                `;
}

// I want two columns with multiple rows in the second column for the data and one row in the first column for the image

fetch("/api/properties?location=brighton")
  .then((response) => response.json())
  .then((json) => {
    const results = json.result.properties.elements;
    let text = ` <div class="container">
    <div class="row">
    <div class="col">
        PROPERTY IMAGE
      </div>
      <div class="col">
        Details
      </div>
    </div>`;
    results.forEach((element) => {
      text = text.concat(_renderProperty(element));
    });

    document.querySelector("#propertyResults").innerHTML =
      text.concat("</div>");
    console.log(json.result.properties.elements);
  });
