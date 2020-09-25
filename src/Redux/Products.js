const INITIAL_STATE = {
  products: [],
  productsPricing: {},
  editProductIndex: -1,
  editProductData: {},
}

const productsReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  let { type, payload } = action;
  switch (type) {
    case "SET_PRODUCTS":
      stateCopy.products = payload.products;
      stateCopy.productsPricing = payload.pricingInfo;
      return stateCopy;
    case "SET_EDIT_PRODUCT":
      stateCopy.editProductIndex = payload;
      stateCopy.editProductData = stateCopy.products[payload];
      return stateCopy;
    case "CHANGE_EDIT_PRODUCT":
      const { key, value } = payload;
      if (key === "pricingTier") {
        stateCopy.editProductData["priceRange"] = stateCopy.productsPricing[value][0]
      }
      stateCopy.editProductData[key] = value;
      return stateCopy;
    case "SUBMIT_EDIT":
      console.log(stateCopy.products[stateCopy.editProductIndex]);
      stateCopy.products[stateCopy.editProductIndex] = stateCopy.editProductData;
      stateCopy.editProductIndex = -1;
      stateCopy.editProductData = {};
      return stateCopy;
    default:
      return stateCopy;
  }
}

export default productsReducer;