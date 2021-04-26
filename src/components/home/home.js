import React, { useState, useEffect } from "react";
import "./home.css";
import image1 from "../../public/images/image_1.png";
import { getBootcamp } from "../../services/user.service";

const Home = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [currentpage, setCuurentpage] = useState(1);

  useEffect(() => {
    getBootcamp().then(
      (response) => {
        setData(response.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setData(_content);
      }
    );
  }, []);

  const paginatedArraydata = function (array, index, size) {
    index = Math.abs(parseInt(index));
    index = index > 0 ? index - 1 : index;
    size = parseInt(size);
    size = size < 1 ? 1 : size;
    // filter
    return [
      ...array.filter((value, n) => {
        return n >= index * size && n < (index + 1) * size;
      }),
    ];
  };
  const paginate = function (array, index, size) {
    index = Math.abs(parseInt(index));
    index = index > 0 ? index - 1 : index;
    size = parseInt(size);
    size = size < 1 ? 1 : size;
    // filter
    return [
      ...array.filter((value, n) => {
        return n >= index && n < index + size && n <= 4;
      }),
    ];
  };

  function GetPageinValue(e) {
    let index = e.target.innerHTML;
    if (index === "Previous") {
      if (parseInt(currentpage) > 1) {
        index = parseInt(currentpage) - 1;
      } else {
        index = 1;
      }
    }
    if (index === "Next") {
      if ((parseInt(currentpage) + 1) * 4 <= data.length + 3) {
        index = parseInt(currentpage) + 1;
      } else {
        index = parseInt(currentpage);
      }
    }
    setCuurentpage(index);
    setPage(index);
  }

  return (
    <>
      <div className="grid">
        <div className="sideGrid">
          <form className="byLocation">
            <h1>By Location </h1>
            <div className="inputs">
              <input
                className="homeInp"
                type="text"
                name="mile"
                placeholder="Miles From"
              />
              <input
                className="homeInp"
                type="text"
                name="mile"
                placeholder="Enter Zipcode"
              />
            </div>
            <input
              className="byLocButton"
              type="button"
              value="Find Bootcamps"
            />
          </form>
          <form className="filterForm">
            <h1>Filter</h1>
            <div>
              <label>Rating</label>
              <br />
              <input
                className="filterInput"
                type="number"
                name="rate"
                placeholder="Any"
              />
            </div>
            <div>
              <label>Budget</label>
              <br />
              <input
                className="filterInput"
                type="number"
                name="budget"
                placeholder="Any"
              />
            </div>
            <input
              className="byLocButton"
              type="button"
              value="Find Bootcamps"
            />
          </form>
        </div>

        <div className="mainGrid">
          {data &&
            paginatedArraydata(
              data.map((i, k) => (
                <div key={k} className="items">
                  <div>
                    <img src={image1} alt="pic" />
                  </div>
                  <div className="description">
                    <div className="itemHeader">
                      <h1>{i.name}</h1>
                      <p className="count">0</p>
                    </div>
                    <p className="city">{i.address}</p>
                    <h2 className="skil">{i.careers}&nbsp</h2>
                  </div>
                </div>
              )),
              page,
              4
            )}

          <div className="items">
            <div className="pagin">
              <a className="next" href="#" onClick={GetPageinValue}>
                Previous
              </a>
              {data &&
                paginate(
                  data.map((i, k) => (
                    <a
                      key={k}
                      className="numbers"
                      href="#"
                      onClick={GetPageinValue}
                    >
                      {k + 1}
                    </a>
                  )),
                  page,
                  4
                )}
              <a className="next" href="#" onClick={GetPageinValue}>
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
