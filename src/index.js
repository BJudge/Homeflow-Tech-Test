import "./styles.scss";
const PropertyList = document.getElementById("propertyList");
const favouriteProperties = [12739280, 12594566, 12086860, 12696851, 12769085];
let AllProperties = [];
let matchedFavourites = [];

//this looks like a big init function
fetch("/api/properties?location=brighton")
  .then((response) => response.json())
  .then((json) => {
    AllProperties = json.result.properties.elements;
    // console.log(AllProperties);
    let text = "";
    AllProperties.forEach((element) => {
      text = text.concat(_renderProperty(element));
    });
    PropertyList.innerHTML = text;
    _matchedFavourites();
    _renderFavourites();
  })
  .catch((err) => {
    console.error(err);
  });

function AddToFavourites() {
  PropertyList.addEventListener("click", (e) => {
    if (favouriteProperties.includes(Number(e.target.id))) {
      return console.log("All ready in your list");
    } else {
      favouriteProperties.push(Number(e.target.id));
      console.log("Favourites Array", favouriteProperties);
      _addToMatchedFavourites(Number(e.target.id));
    }
  });
}

function _addToMatchedFavourites(propertyId) {
  const matchedResult = AllProperties.find(({ property_id }) => {
    return property_id === propertyId;
  });
  matchedFavourites.push(matchedResult);
  console.log(matchedResult);
  console.log(propertyId);
  console.log("New Matched Properties", matchedFavourites);
}

function _matchedFavourites() {
  // console.log("All Properties Array", AllProperties);
  console.log("Favourites Array", favouriteProperties);
  favouriteProperties.forEach((savedProperty) => {
    AllProperties.forEach((property) => {
      if (property.property_id === savedProperty) {
        matchedFavourites.push(property);
      }
    });
  });
}

function _renderFavourites() {
  //render matched properties here
  console.log("matched properties", matchedFavourites);
}

function _renderProperty(property) {
  const html = `
                  <div class="property-item" data-id"${property.property_id}">
                     <div class="property-image">
                       <img class="property-image" alt="${
                         property.display_address
                       }" src="http://mr0.homeflow.co.uk/${
    property.photos[0]
  }"/>
                     </div>
                    <div class="property-details">
                      <div class="property-bedrooms">
                        Bedrooms ${property.bedrooms} 
                      </div>
                      <div class="property-bathrooms">
                        Bathrooms ${property.bathrooms}
                      </div>
                      <div class="property-price">
                        ${
                          property.primary_channel === "sales"
                            ? "Asking Price"
                            : "Monthly Rental"
                        } £${property.price_value.toLocaleString()}
                      </div>
                      <div class="property-description">
                      ${property.short_description.slice(0, 100)}...
                      </div>
                    </div>
                    <div>
                    <button id=${
                      property.property_id
                    } class="favourites-button button">Add to favourites</button>
                    </div>
                    <button class="viewMap-button button">View on map</button>
                    </div>
                  </div>
                `;
  return html;
}

AddToFavourites();
