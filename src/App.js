import "./style.css";
function App() {
  return (
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
  );
}

export default App;
