import "./style.css";

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
                src="/assets/toggle.svg"
                className="add"
                height="35"
                alt="add"
                id="toggle"
              />
            </button>
            <a
              href="https://github.com/JesacaLin/katalog"
              target="_blank"
              rel="noreferrer"
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
              <Modal />
            </aside>
            <CardContainer />
          </section>
        </div>
      </main>
    </>
  );
}

function LocationNav() {
  return <ul className="container-for-buttons mt-5">Location bar</ul>;
}

function SearchBar() {
  return (
    <div className="addAndSearch d-flex flex-row justify-content-end">
      Add and search bar
    </div>
  );
}

function Modal() {
  return <section className="modal fade">modal</section>;
}

function CardContainer() {
  const talent = initialPerson;

  return (
    <section className="cardContainer mt-5 px-4">
      <table className="table table-borderless table-responsive-xxl talentList">
        {talent.map((fact) => (
          <Card fact={fact} />
        ))}
      </table>
    </section>
  );
}

function Card({ fact }) {
  return (
    <tbody key={fact.id} className="card-margin ">
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
      <tr>
        <td className="pb-4 ps-4 pt-3">{fact.phone}</td>
        <td className="pt-3">{fact.email}</td>
        <td></td>
        <td></td>
        <td className="pt-3">
          <button className="btn linkButtons">
            <a href={fact.portfolio}>Portfolio</a>
          </button>
        </td>
        <td className="pt-3">
          <button className="btn linkButtons">
            <a href={fact.pastWork}>Past Work</a>
          </button>
        </td>
        <td className="">
          <button className="btn voteButton" id="upVote">
            👍 {fact.upVote}
          </button>
        </td>
        <td className="">
          <button className="btn voteButton" id="downVote">
            👎 {fact.downVote}
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default App;
