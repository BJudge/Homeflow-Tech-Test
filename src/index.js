import "./styles.scss";

fetch("/api/properties?location=brighton")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.result.properties.elements);
    document.querySelector("#app").innerHTML =
      "<p>Check the JS console for some data...</p>";
  })
  .catch((err) => {
    console.error(err);
    document.querySelector("#app").innerHTML =
      "<p>Something went wrong. Check the console for details.</p>";
  });

const PropertyList = document.getElementById("propertyList");

function _renderProperty(property) {
  return `
                  <div class="row" data-id"${property.property_id}">
                     <div class="col">
                       <img class="property-image" alt="${property.display_address}" src="http://mr0.homeflow.co.uk/${property.photos[0]}"/>
                     </div>
                    <div class="col">
                      <div class="row">
                        Bedrooms ${property.bedrooms} 
                      </div>
                      <div class="row">
                        Bathrooms ${property.bathrooms}
                      </div>
                      <div class="row">
                        Asking Price £${property.price_value}
                      </div>
                    </div>
                  </div>
                `;
}

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

    PropertyList.innerHTML = text.concat("</div>");
    console.log(json.result.properties.elements);
  });
