import React, { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";
import { Modal } from "react-bootstrap";

// TODO --> Add colors to array

const CATEGORIES = [
  { name: "Photographer", color: "" },
  { name: "Video", color: "" },
  { name: "Stylist", color: "" },
  { name: "Makeup", color: "" },
  { name: "Hair", color: "" },
  { name: "Photo Assistant", color: "" },
];

function App() {
  //1. DEFINE STATE VARIABLE
  const [showForm, setShowForm] = useState(false);
  const [talent, setTalent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [filteredTalent, setFilteredTalent] = useState([]);
  // prevent accidental double clicking on submit.

  function handleFilterChange(newFilter, filterType) {
    if (filterType === "state") {
      setCountryFilter("all");
      setStateFilter(newFilter);
    } else if (filterType === "country") {
      setStateFilter("all");
      setCountryFilter(newFilter);
    }
  }

  useEffect(
    function () {
      // ASYNC function to display cards
      async function getTalent() {
        try {
          setIsLoading(true);
          // Placed a limit of 25 entries on the page
          let query = supabase.from("Contributor").select("*").limit(25);

          if (stateFilter !== "all" && countryFilter !== "all") {
            query.and((qb) => {
              qb.eq("state", stateFilter);
              qb.or((qb) => {
                qb.eq("country", countryFilter);
              });
            });
          }

          // execute the query
          const { data } = await query;
          setTalent(data);
          setFilteredTalent(
            data.filter((fact) => {
              if (stateFilter !== "all" && fact.state !== stateFilter) {
                return false;
              }
              if (countryFilter !== "all" && fact.country !== countryFilter) {
                return false;
              }
              return true;
            })
          );
        } catch (error) {
          console.error(error);
          alert("There was a problem loading data");
        }
        setIsLoading(false);
      }

      getTalent();
    },
    [stateFilter, countryFilter]
  );

  useEffect(function () {
    async function getCountry() {
      try {
        setIsLoading(true);
        const { data: Contributor } = await supabase
          .from("Contributor")
          .select("country")
          .order("country", { ascending: true });
        setCountry(Contributor.map((item) => item.country));
      } catch (error) {
        console.error(error);
        alert("There was a problem loading the countries");
      }
      setIsLoading(false);
    }
    getCountry();
  }, []);

  useEffect(function () {
    async function getState() {
      try {
        setIsLoading(true);
        const { data: Contributor } = await supabase
          .from("Contributor")
          .select("state")
          .order("state", { ascending: true });
        setState(Contributor.map((item) => item.state));
      } catch (error) {
        console.error(error);
        alert("There was a problem loading the states");
      }
      setIsLoading(false);
    }
    getState();
  }, []);

  return (
    <>
      <Header />
      <main className="main container-fluid px-4 text-center">
        <div className="row mt-5">
          <aside className="sidenav col-lg-3 mt-5">
            <LocationNav
              setCountry={setCountry}
              country={country}
              setState={setState}
              state={state}
              setStateFilter={handleFilterChange}
              setCountryFilter={handleFilterChange}
              handleFilterChange={handleFilterChange}
            />
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
            {/* LOOK take another look at this */}
            {isLoading ? (
              <Loader />
            ) : (
              <CardContainer talent={filteredTalent} setTalent={setTalent} />
            )}
            {/* <CardContainer talent={filteredTalent} /> */}
          </section>
        </div>
      </main>
    </>
  );
}

function Loader() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <span className="sr-only mt-5 loading">Loading contributors...</span>
    </div>
  );
}

function Header() {
  const appTitle = "KATALOG";
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <nav className="navbar navbar-expand justify-content-between w-100">
      <div className="container-fluid">
        <h2 className="logoName ps-2">{appTitle}</h2>
        {/* LOOK --> NAV ICONS */}
        <div className="d-flex flex-row">
          <button
            className="button d-flex align-items-center fs-6 px-2"
            id="about"
            onClick={openModal}
          >
            ABOUT
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Katalog is a talent directory app.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Katalog is an innovative talent directory app designed to empower
            creative teams in discovering and managing top talent. With its
            intuitive upvoting and downvoting system and location-based search
            functionality, Katalog offers a seamless way to find and organize
            skilled professionals.
          </p>
          <p>
            By prioritizing user experience, Katalog eliminates the reliance on
            cumbersome excel sheets and streamlines the information-sharing
            process, resulting in improved efficiency and enhanced potential.
          </p>
          <p>
            Built with: React | JavaScript | HTML 5 | CSS 3 | Bootstrap 5 |
            Supabase | Figma
          </p>
          <h6>To report bugs or provide suggestions: JesacaLin@gmail.com</h6>
          <br></br>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </nav>
  );
}

function LocationNav({ country, state, handleFilterChange }) {
  const uniqueStates = [...new Set(state)].filter((s) => s && s !== null);
  const uniqueCountries = [...new Set(country)].filter(
    (c) => c && c !== null && c.toLowerCase() !== "united states"
  );

  return (
    <ul className="container-for-buttons mt-5">
      <h6 className="location">
        LOCATIONS<i className="bi bi-caret-down-fill ps-2"></i>
      </h6>
      <button
        className="btn button mt-4"
        id="all"
        onClick={() => handleFilterChange("all", "state")}
      >
        All
      </button>
      <h6 className="location mt-5">
        UNITED STATES<i className="bi bi-caret-down-fill ps-2"></i>
      </h6>
      {uniqueStates.map((s, index) => (
        <LocationButton
          key={index}
          location={s}
          type="state"
          handleFilterChange={handleFilterChange}
        />
      ))}
      <h6 className="location mt-5">
        INTERNATIONAL<i className="bi bi-caret-down-fill ps-2"></i>
      </h6>
      {uniqueCountries.map((c, index) => (
        <LocationButton
          key={index}
          location={c}
          type="country"
          handleFilterChange={handleFilterChange}
        />
      ))}
    </ul>
  );
}

const LocationButton = ({ location, type, handleFilterChange }) => (
  <button
    className="button mt-3"
    id="states"
    onClick={() => {
      handleFilterChange(location, type);
    }}
  >
    {location}
  </button>
);

function SearchBar({ setShowForm, showForm, setTalent, setCountry, setState }) {
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

        {/* LOOK --> SEARCH BAR */}

        {/* <form className="d-flex pe-2" role="search">
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
        </form> */}
      </div>
      {/* LOOK 2. USE STATE VARIABLE - TURN THE FORM ON AND OFF */}
      {showForm ? (
        <AddTalentForm
          setTalent={setTalent}
          setShowForm={setShowForm}
          setCountry={setCountry}
          setState={setState}
        />
      ) : null}
    </aside>
  );
}

function AddTalentForm({ setShowForm, setTalent }) {
  // FORM STATES
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [pastWork, setPastWork] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formState, setFormState] = useState("");
  const [city, setCity] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    //2. validate data. if yes, create new fact.

    if (category && name && email) {
      //3. upload fact to supabase and receive the new fact object.

      const { data: newTalent, error } = await supabase
        .from("Contributor")
        .insert([
          {
            category,
            name,
            email,
            phone,
            portfolio,
            pastWork,
            country: formCountry,
            state: formState,
            city,
          },
        ])
        // .order("created_at", { ascending: true })
        .select();

      //4. add new fact to the UI: add the fact to state.
      if (!error) {
        setTalent((talent) => [newTalent[0], ...talent]);
      }

      //5. reset the input fields
      setCategory("");
      setName("");
      setPhone("");
      setEmail("");
      setPortfolio("");
      setPastWork("");
      setFormCountry("");
      setFormState("");
      setCity("");
      //6. close the form
      setShowForm(false);
    }
  }

  return (
    <div className="mt-5" id="formBody">
      <div className="container-fluid">
        <h6 className="m-2 modal-title" id="modal-title">
          ADD A CONTRIBUTOR
        </h6>
      </div>
      <div className="row justify-content-center my-4">
        {/* LOOK */}
        <form onSubmit={handleSubmit}>
          <div className="col-lg-12">
            <div className="col-lg-4 mx-auto">
              <div className="input-group">
                {/* <span className="input-group-text">
                  <i className="bi bi-tag-fill"></i>
                </span> */}
                {/* SETTING VALUE OF CATEGORY */}
                <select
                  className="form-select mx-auto"
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row justify-content-center my-4">
              <div className="col-lg-4">
                <label htmlFor="name" className="form-label float-left">
                  Name
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
                    placeholder="e.g. Bob Bobster"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* <div className="form-helper">e.g. Bob Bobster</div> */}
              </div>
              <div className="col-lg-4">
                <label htmlFor="email" className="form-label">
                  Email
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
                    placeholder="e.g. bob@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <div className="form-helper">e.g. bob@gmail.com</div> */}
              </div>
              <div className="col-lg-4">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-telephone-fill"></i>
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="e.g. xxx-xxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {/* <div className="form-helper">e.g. xxx-xxx-xxxx</div> */}
              </div>
            </div>
            <div className="row justify-content-center my-4">
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
                    placeholder="e.g. http://www.portfolio.com"
                    pattern="https?://.+"
                    // required
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </div>
                {/* <div className="form-helper">e.g. http://www.portfolio.com</div> */}
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
                    placeholder="e.g. http://www.past-examples.com"
                    pattern="https?://.+"
                    value={pastWork}
                    //************************************** */
                    // disabled={!pastWork}
                    onChange={(e) => setPastWork(e.target.value)}
                  />
                </div>
                <div className="form-helper">Optional</div>
              </div>
              <div className="row justify-content-center my-4">
                <div className="col-lg-4">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="e.g. United States"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                    />
                  </div>
                  <div className="form-helper">Enter full name of country</div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      pattern=".{3,}"
                      title="Please include full name of the state"
                      placeholder="e.g. Texas"
                      value={formState}
                      onChange={(e) => setFormState(e.target.value)}
                    />
                  </div>
                  <div className="form-helper">
                    If applicable, enter full name of state
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="e.g. Austin"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-helper"></div> */}
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

            <button
              type="submit"
              className="btn modalBTN btn-dark"

              //TODO --> newTalent is undefined, have to figure out how to fix.
              // onClick={() => setTalent(newTalent)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CardContainer({ talent, setTalent }) {
  const sortedTalent = talent.sort((a, b) => b.upVote - a.upVote);

  return (
    <section className="cardContainer mt-5 px-4 mb-5">
      <h6 className="cHeader">
        CONTRIBUTORS<i className="bi bi-caret-down-fill ps-2"></i>
      </h6>
      <table className="table table-borderless table-responsive-xxl talentList">
        {sortedTalent.length > 0 ? (
          sortedTalent.map((fact) => (
            <tbody className="mb-5" key={fact.id}>
              <Card fact={fact} setTalent={setTalent} />
            </tbody>
          ))
        ) : (
          <tr>
            <td>Select a location or search for a contributor</td>
          </tr>
        )}
      </table>
      <p className="cFooter">
        There are <b>{sortedTalent.length}</b> contributors in the database.
      </p>
    </section>
  );
}

function Card({ fact, setTalent }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  // UPDATE data in supabase: The upVote column by one (onclick)(current vote # + 1), do it on the id that matches the fact being updated.

  async function handleVote(columnName) {
    if (isUpdating || isVoted) {
      return;
    }

    setIsUpdating(true);
    try {
      const { data: updatedFact, error } = await supabase
        .from("Contributor")
        .update({ [columnName]: fact[columnName] + 1 })
        .eq("id", fact.id)
        .select();

      if (!error) {
        setTalent((arrOfContributors) =>
          arrOfContributors.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        );
        setIsVoted(true);
      }
    } finally {
      setIsUpdating(false);
    }
  }

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
              <td className="pt-4">{fact.state}</td>
              <td className="pt-4">{fact.city}</td>
              <td className="pt-4">{fact.country}</td>
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
                <button
                  className="btn linkButtons"
                  id="pastWorkBTN"
                  disabled={!fact.pastWork}
                >
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
                <div class="d-flex justify-content-center">
                  <div>
                    {/* TODO --> create autho so only those that signed in can vote */}
                    <button
                      className="btn voteButton me-1"
                      id="upVote"
                      onClick={() => handleVote("upVote")}
                      disabled={isUpdating || isVoted}
                    >
                      <span role="img" aria-label="thumbs up">
                        👍 {fact.upVote}
                      </span>
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn voteButton"
                      id="downVote"
                      onClick={() => handleVote("downVote")}
                      disabled={isUpdating || isVoted}
                    >
                      <span role="img" aria-label="thumbs down">
                        👎 {fact.downVote}
                      </span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
