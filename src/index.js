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
  const html = `
                  <div class="property-item" data-id"${property.property_id}">
                     <div class="property-image">
                       <img class="property-image" alt="${property.display_address}" src="http://mr0.homeflow.co.uk/${property.photos[0]}"/>
                     </div>
                    <div class="property-details">
                      <div class="property-bedrooms">
                        Bedrooms ${property.bedrooms} 
                      </div>
                      <div class="property-bathrooms">
                        Bathrooms ${property.bathrooms}
                      </div>
                      <div class="prooperty-price">
                        Asking Price £${property.price_value}
                      </div>
                    </div>
                  </div>
                `;
  return html;
}

fetch("/api/properties?location=brighton")
  .then((response) => response.json())
  .then((json) => {
    const results = json.result.properties.elements;
    let text = "";
    results.forEach((element) => {
      text = text.concat(_renderProperty(element));
    });

    PropertyList.innerHTML = text;
    console.log(json.result.properties.elements);
  });
