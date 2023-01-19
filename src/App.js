import React, { useState } from "react";
import "./style.css";

// TODO --> Add colors to array
const CATEGORIES = [
  { name: "Photo", color: "" },
  { name: "Video", color: "" },
  { name: "Stylist", color: "" },
  { name: "Makeup", color: "" },
  { name: "Hair", color: "" },
  { name: "Assistant", color: "" },
  { name: "Other", color: "" },
];

const initialPerson = [
  {
    id: 1,
    category: "Photo",
    name: "Emmy Park",
    email: "Emmy@emmypark.com",
    phone: "111-222-3333",
    portfolio: "http://www.google.com",
    pastWork: "http://www.google.com",
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
    pastWork: "http://www.google.com",
    country: "England",
    state: "",
    city: "London",
    upVote: 10,
    downVote: 0,
  },
];

function App() {
  //1. DEFINE STATE VARIABLE
  const [showForm, setShowForm] = useState(false);
  const [talent, setTalent] = useState(initialPerson);
  const [country, setCountry] = useState("");

  return (
    <>
      <Header />
      <main className="main container-fluid px-4 text-center">
        <div className="row mt-5">
          <aside className="sidenav col-lg-3 mt-5">
            <LocationNav setCountry={setCountry} country={country} />
          </aside>
          <div className="col-lg-1 gap"></div>
          <section className="addSearchModalCards col-lg-8 mt-3">
            <aside className="row mt-5">
              <SearchBar
                setShowForm={setShowForm}
                showForm={showForm}
                setTalent={setTalent}
                setCountry={setCountry}
                country={country}
              />
            </aside>
            <CardContainer talent={talent} />
          </section>
        </div>
      </main>
    </>
  );
}

function Header() {
  const appTitle = "KATALOG";

  return (
    <nav className="navbar navbar-expand justify-content-between w-100">
      <div className="container-fluid">
        <h2 className="logoName ps-2">{appTitle}</h2>

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
  );
}
// import the location state
//based on the location state, it renders to the locationNav?
function LocationNav({ country, setCountry }) {
  console.log(country, setCountry);
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

const LocationButton = ({ location }) => (
  <button className="button mt-4" id="states">
    {location}
  </button>
);

function SearchBar({ setShowForm, showForm, setTalent, country, setCountry }) {
  return (
    <aside className="row mt-5">
      <div className="addAndSearch d-flex flex-row justify-content-end">
        <button
          className="btn button btn-open"
          //LOOK - 3. UPDATE STATE VARIABLE - ON CLICK
          onClick={function () {
            setShowForm((show) => !show);
          }}
        >
          <img
            src="./assets/add-dark.svg"
            className="add d-inline-block align-items-center"
            height="25"
            alt="add"
            id="add"
          />
          <span className="align-items-center fs-6 m-2 add-contributor">
            {/* TODO --> ADD SMOOTH ANNIMATION FOR THE FORM */}
            {/* TOGGLES THE FORM */}
            {showForm ? "CLOSE FORM" : "ADD A CONTRIBUTOR"}
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
      {/* LOOK 2. USE STATE VARIABLE - TURN THE FORM ON AND OFF */}
      {showForm ? (
        <AddTalentForm
          setTalent={setTalent}
          setShowForm={setShowForm}
          country={country}
          setCountry={setCountry}
        />
      ) : null}
    </aside>
  );
}

function AddTalentForm({ setShowForm, setTalent, country, setCountry }) {
  // FORM STATES
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("http://");
  const [past, setPast] = useState("");
  // const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    //1. prevent the browser reload
    e.preventDefault();
    // console.log(country, setCountry);
    //2. validate data. if yes, create new fact.
    if (category) {
      const newTalent =
        //3. create a new fact object
        {
          id: Math.round(Math.random() * 10000000),
          category,
          name,
          email,
          phone,
          portfolio,
          past,
          country,
          state,
          city,
          upVote: 0,
          downVote: 0,
        };
      //4. add new fact to the UI: add the fact to state.
      setTalent((talent) => [newTalent, ...talent]);
      //5. reset the input fields
      setCategory("");
      setName("");
      setPhone("");
      setEmail("");
      setPortfolio("http://");
      setPast("");
      setCountry("");
      setState("");
      setCity("");
      //6. close the form
      setShowForm(false);
    }
  }
  // TODO --> make certain fields required
  //TODO --> edit the cards or just delete it?

  return (
    <div className="mt-5" id="formBody">
      <div className="container-fluid">
        <h6 className="m-2 modal-title" id="modal-title">
          ADD A CONTRIBUTOR
        </h6>
      </div>
      <div className="row justify-content-center my-5">
        {/* LOOK */}
        <form onSubmit={handleSubmit}>
          <div className="col-lg-12">
            <div className="col-lg-4 mx-auto">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-tag-fill"></i>
                </span>
                {/* SETTING VALUE OF CATEGORY */}
                <select
                  className="form-select mx-auto"
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a Category*</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row justify-content-center my-5">
              <div className="col-lg-4">
                <label htmlFor="name" className="form-label float-left">
                  Name*
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    placeholder="Bob Bobster"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <label htmlFor="email" className="form-label">
                  Email*
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    placeholder="bob@bobster.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <label htmlFor="phone" className="form-label">
                  Phone Number*
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-telephone-fill"></i>
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="xxx-xxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center my-5">
              <div className="col-lg-6">
                <label htmlFor="portfolio" className="form-label">
                  Portfolio
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-star-fill"></i>
                  </span>
                  <input
                    type="url"
                    className="form-control"
                    id="portfolio"
                    // placeholder="http://"
                    // pattern="https?://.+"
                    // required
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="pastWork" className="form-label">
                  Past Work
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-stars"></i>
                  </span>
                  <input
                    type="url"
                    className="form-control"
                    id="pastWork"
                    // placeholder="http://"
                    // pattern="https?://.+"
                    value={past}
                    onChange={(e) => setPast(e.target.value)}
                  />
                </div>
              </div>
              <div className="row justify-content-center my-5">
                <div className="col-lg-4">
                  <label htmlFor="country" className="form-label">
                    Country*
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="state" className="form-label">
                    State*
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="If applicable..."
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="city" className="form-label">
                    City*
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Austin"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {/* LOOK */}
            <button
              type="button"
              className="btn modalBTN btny-outline-dark"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            {/* TODO --> display a message when clicked */}
            <button type="submit" className="btn modalBTN btn-dark">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CardContainer({ talent }) {
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
    //TODO--> Make a table that is two levels only, then us flex to start and to end.
    <>
      <section className="innerCardContainer mt-3 px-4">
        <table className="table table-borderless table-responsive-xxl talentList">
          <tbody>
            <tr className="cardTop">
              <th scope="row" className="tableName pt-4 ps-4">
                <h5 className="name">{fact.name}</h5>
              </th>
              <td className="pt-4">{fact.category}</td>
              <td className="pt-4">{fact.country}</td>
              <td className="pt-4">{fact.state}</td>
              <td className="pt-4">{fact.city}</td>
            </tr>
            <tr className="cardBottom">
              <td className="pb-4 ps-4 pt-3">{fact.phone}</td>
              <td className="pt-3">{fact.email}</td>

              {/* this pb-4 expands the bottom of the cards */}
              <td className="pb-4">
                <button className="btn linkButtons" id="portfolioBTN">
                  <a
                    href={fact.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Portfolio</span>
                  </a>
                </button>
              </td>
              <td>
                <button className="btn linkButtons" id="pastWorkBTN">
                  <a
                    href={fact.pastWork}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Past Work</span>
                  </a>
                </button>
              </td>
              <td>
                <button className="btn voteButton me-1" id="upVote">
                  <span role="img" aria-label="thumbs up">
                    {" "}
                    👍 {fact.upVote}{" "}
                  </span>
                </button>

                <button className="btn voteButton" id="downVote">
                  <span role="img" aria-label="thumbs down">
                    {" "}
                    👎 {fact.downVote}{" "}
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
