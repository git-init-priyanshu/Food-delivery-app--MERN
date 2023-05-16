import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/fooddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //destructuring both the collections
      const [foodItem, foodCategory] = await response.json();
      setFoodItem(foodItem);
      setFoodCategory(foodCategory);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        style={{ objectFit: "contain !important" }}
      >
        <div
          className="carousel-inner"
          id="carousel"
          style={{ maxHeight: "400px" }}
        >
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            className="carousel-item active text-center"
            style={{ objectFit: "contain !important" }}
          >
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100 img-fluid mx-auto my-auto"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div
            className="carousel-item text-center"
            style={{ objectFit: "contain !important" }}
          >
            <img
              src="https://source.unsplash.com/random/900×700/?pastery"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div
            className="carousel-item text-center"
            style={{ objectFit: "contain !important" }}
          >
            <img
              src="https://source.unsplash.com/random/900×700/?pasta"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCategory !== []
          ? foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filteredItems) => {
                        return (
                          <div
                            key={filteredItems._id}
                            className="col-12 col-md-6 col-lg-3 m-3"
                          >
                            <Card
                              foodItems={filteredItems}
                              options={filteredItems.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
