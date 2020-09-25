import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { pricingInfo, products } from "../../React-products";

function Products({ dispatch, data }) {
  useEffect(() => {
    if (!data.products.length) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: { products, pricingInfo },
      });
    }
    // eslint-disable-next-line
  }, []);

  function handleEditProduct(id) {
    dispatch({
      type: "SET_EDIT_PRODUCT",
      payload: id,
    });
  }

  return (
    <div className="col-6 mx-auto my-5">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Availability</th>
            <th scope="col">Weight</th>
            <th scope="col">isEditable</th>
          </tr>
        </thead>
        <tbody>
          {data.products.length &&
            data.products.map((product, id) => {
              const { name, availability, weight, isEditable } = product;
              return (
                <tr>
                  <td>{id + 1}</td>
                  <td>{name}</td>
                  <td>{availability}</td>
                  <td>{weight}</td>
                  <td>
                    <Link to="/product-page">
                      <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={() => handleEditProduct(id)}
                        disabled={!isEditable}
                      >
                        Edit
                        </button>{" "}
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = ({ products }) => {
  return {
    data: products,
  };
};

export default connect(mapStateToProps)(Products);
