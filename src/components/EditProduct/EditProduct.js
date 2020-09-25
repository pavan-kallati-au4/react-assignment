import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

const EditProduct = ({ dispatch, editProductData, productsPricing }) => {
  const history = useHistory();
  const {
    name,
    weight,
    availability,
    productUrl,
    priceRange,
    pricingTier,
    isEditable,
  } = editProductData;

  useEffect(() => {
    console.log(!name);
    if (!name) {
      history.push("/")
    }
  }, []);

  function handleEditData(key, event) {
    dispatch({
      type: "CHANGE_EDIT_PRODUCT",
      payload: {
        key,
        value: key === "isEditable" ? !isEditable : event.target.value,
      },
    });
  }

  function submitEditData(e) {
    e.preventDefault();
    dispatch({
      type: "SUBMIT_EDIT"
    });
    history.push("/");
  }

  function checkSubmit() {
    if (
      name &&
      name.trim() &&
      (weight + "").trim() &&
      availability >= 0 &&
      availability !== "" &&
      productUrl.trim() &&
      pricingTier &&
      priceRange
    ) {
      return true;
    }
  }

  return (
    <form className="col-6 mx-auto my-3">
      <h1>Enter the details to edit product:</h1>
      <div className="form-group">
        <label for="name">Enter name:</label>
        <input
          type="string"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => handleEditData("name", e)}
        ></input>
      </div>
      <div className="form-group">
        <label for="weight">Weight:</label>
        <input
          type="string"
          className="form-control"
          id="weight"
          value={weight}
          onChange={(e) => handleEditData("weight", e)}
        ></input>
      </div>
      <div className="form-group">
        <label for="availability">Availability:</label>
        <input
          type="number"
          min="0"
          className="form-control"
          id="availability"
          value={availability}
          onChange={(e) => handleEditData("availability", e)}
        ></input>
      </div>
      <div className="form-group">
        <label for="url">Product URL:</label>
        <input
          type="string"
          className="form-control"
          id="url"
          value={productUrl}
          onChange={(e) => handleEditData("productUrl", e)}
        ></input>
      </div>
      <div className="form-check form-inline justify-content-between align-items-center">
        <p>Price Tier:</p>
        <div className="d-flex align-items-center">
          <input
            className="form-check-input"
            type="radio"
            name="pricetier"
            id="pricetier"
            value="budget"
            checked={pricingTier === "budget"}
            onChange={(e) => handleEditData("pricingTier", e)}
          />
          <label className="form-check-label" for="inlineRadio1">
            Budget
          </label>
        </div>

        <div className="d-flex align-items-center">
          <input
            className="form-check-input"
            type="radio"
            name="pricetier"
            id="pricetier"
            value="premier"
            checked={pricingTier === "premier"}
            onChange={(e) => handleEditData("pricingTier", e)}
          />
          <label className="form-check-label" for="inlineRadio1">
            Premier
          </label>
        </div>
      </div>
      <div className="d-flex m-2">
        <p className="mb-0">Price Range:</p>
        {pricingTier === "budget" ? (
          <select
            className="mx-5"
            value={priceRange}
            onChange={(e) => handleEditData("priceRange", e)}
          >
            {productsPricing.budget && productsPricing.budget.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        ) : (
            <select
              className="mx-5"
              value={priceRange}
              onChange={(e) => handleEditData("priceRange", e)}
            >
              {productsPricing.premier && productsPricing.premier.map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
          )}
      </div>
      <div className="form-check-inline">
        <p className="mb-0">Is Editable:</p>
        <label className="form-check-label" for="edit">
          <input
            type="checkbox"
            className="form-check-input mx-3"
            id="edit"
            checked={isEditable}
            onChange={(e) => handleEditData("isEditable")}
          />
        </label>
      </div>
      <button type="submit" disabled={!checkSubmit()} className="btn btn-success" onClick={(e) => submitEditData(e)}>
        Edit Product
      </button>
    </form>
  );
};

const mapStateToProps = ({ products }) => {
  const { editProductData, productsPricing } = products;
  return {
    editProductData,
    productsPricing,
  };
};

export default connect(mapStateToProps)(EditProduct);
