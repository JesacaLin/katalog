import React, { useState } from "react";
// import styled from "styled-components";
import "./style.css";

// const LinkButton = styled.button`
//   padding: 0 1rem;
//   outline: none;

// `;

const initialPerson = [
  {
    id: 1,
    category: "Photographer",
    name: "Emmy Park",
    email: "Emmy@emmypark.com",
    phone: "111-222-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "United States",
    state: "New York",
    city: "New York",
    upVote: 1,
    downVote: 0,
  },
  {
    id: 2,
    category: "Video",
    name: "Person Two",
    email: "Person@emmypark.com",
    phone: "111-444-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "England",
    state: "",
    city: "London",
    upVote: 10,
    downVote: 0,
  },
];

function App() {
  return (
    <>
      {/* HEADER */}
      <nav className="navbar navbar-expand justify-content-between w-100">
        <div className="container-fluid">
          <h2 className="logoName ps-2">KATALOG</h2>
          <div className="d-flex flex-row">
            <button
              className="button d-flex align-items-center fs-6 px-2"
              id="login"
            >
              LOGIN
            </button>
            <button className="button d-flex align-items-center px-2">|</button>

            <button
              className="button d-flex align-items-center fs-6 px-2"
              id="sign-up"
            >
              SIGN UP
            </button>
            <button className="button d-flex align-items-center px-2">
              <img
                src="./assets/toggle.svg"
                className="add"
                height="35"
                alt="add"
                id="toggle"
              />
            </button>
            <a
              href="https://github.com/JesacaLin/katalog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-reset text-decoration-none d-flex align-items-center px-2 me-2"
            >
              <img
                src="https://raw.githubusercontent.com/JesacaLin/dev-kitty/9b9c8e0d370ed7f93549104a1d86771704043b87/public/img/Github.svg"
                className="add"
                height="30"
                alt="github link"
              />
            </a>
          </div>
        </div>
      </nav>

      <main className="main container-fluid px-4 text-center">
        <div className="row mt-5">
          <aside className="sidenav col-lg-3 mt-5">
            <LocationNav />
          </aside>
          <div className="col-lg-1 gap"></div>
          <section className="addSearchModalCards col-lg-8 mt-3">
            <aside className="row mt-5">
              <SearchBar />
            </aside>
            <CardContainer />
          </section>
        </div>
      </main>
    </>
  );
}

const LocationButton = ({ location }) => (
  <button className="button mt-4" id="states">
    {location}
  </button>
);

//TODO-->filters out duplicates, empty values, undefined
function LocationNav() {
  const uniqueStates = [
    ...new Set(
      initialPerson
        .filter((person) => person.state && person.state.length > 0)
        .map((person) => person.state)
    ),
  ];
  const uniqueCountries = [
    ...new Set(
      initialPerson
        .filter(
          (person) =>
            person.country &&
            person.country.length > 0 &&
            person.country.toLowerCase() !== "united states"
        )
        .map((person) => person.country)
    ),
  ];
  return (
    <ul className="container-for-buttons mt-5">
      <h6 className="location">UNITED STATES</h6>
      {uniqueStates.map((state, index) => (
        <LocationButton key={index} location={state} />
      ))}
      <h6 className="location mt-5">INTERNATIONAL</h6>
      {uniqueCountries.map((country, index) => (
        <LocationButton key={index} location={country} />
      ))}
    </ul>
  );
}

function SearchBar() {
  return (
    <div className="addAndSearch d-flex flex-row justify-content-end">
      <button
        className="btn button btn-open"
        data-bs-toggle="modal"
        data-bs-target="#reg-modal"
      >
        <img
          src="./assets/add-dark.svg"
          className="add d-inline-block align-items-center"
          height="25"
          alt="add"
          id="add"
        />
        <span className="align-items-center fs-6 m-2 add-contributor">
          ADD A CONTRIBUTOR
        </span>
      </button>
      <form className="d-flex pe-2" role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          id="searchBar"
        />
        <button className="btn btn-no-outline" type="submit">
          <img
            src="./assets/search.svg"
            className="d-inline-block align-text-top px-2"
            height="25"
            alt="search"
            id="searchIcon"
          />
        </button>
      </form>
    </div>
  );
}

function CardContainer() {
  const talent = initialPerson;

  return (
    <section className="cardContainer mt-5 px-4">
      <table className="table table-borderless table-responsive-xxl talentList">
        {talent.map((fact) => (
          <tbody className="mb-5" key={fact.id}>
            <Card fact={fact} />
          </tbody>
        ))}
      </table>
    </section>
  );
}

function Card({ fact }) {
  return (
    <>
      <tr className="cardTop">
        <th scope="row" className="tableName pt-4 ps-4">
          <h5 className="name">{fact.name}</h5>
        </th>
        <td className="pt-4">{fact.category}</td>
        <td></td>
        <td></td>
        <td></td>
        <td className="pt-4">{fact.country}</td>
        <td className="pt-4">{fact.state}</td>
        <td className="pt-4">{fact.city}</td>
      </tr>
      <tr className="cardBottom">
        <td className="pb-4 ps-4 pt-3">{fact.phone}</td>
        <td className="pt-3">{fact.email}</td>
        <td></td>
        <td></td>
        {/* this pb-4 expands the bottom of the cards */}
        <td className="pb-4">
          <button className="btn linkButtons" id="portfolio">
            <a href={fact.portfolio} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </button>
        </td>
        <td>
          <button className="btn linkButtons" id="pastWork">
            <a href={fact.pastWork} target="_blank" rel="noopener noreferrer">
              Past Work
            </a>
          </button>
        </td>
        <td>
          <button className="btn voteButton" id="upVote">
            <span role="img" aria-label="thumbs up">
              {" "}
              👍 {fact.upVote}{" "}
            </span>
          </button>
        </td>
        <td>
          <button className="btn voteButton" id="downVote">
            <span role="img" aria-label="thumbs down">
              {" "}
              👎 {fact.downVote}{" "}
            </span>
          </button>
        </td>
      </tr>
    </>
  );
}

export default App;
