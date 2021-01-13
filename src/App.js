import './App.css';
import 'bulma/css/bulma.css';
import Products from './Components/Products';

function App() {
  const TOKEN = process.env.REACT_APP_TOKEN;
  //https://nuts.com/nutshell/img/nuts-logo-420b6a54.svg
  return (
    <div className="App has-background-light">
      <nav
        className="navbar p-5"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item logo" href="https://nuts.com">
              <img
                alt="nuts logo"
                src="https://nuts.com/nutshell/img/nuts-logo-420b6a54.svg"
              />
            </a>

            <button
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="nuts-nav"
              href="#"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div id="nuts-nav" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-primary">
                    <strong>View Cart</strong>
                  </button>
                  <button className="button is-light">Log in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Products token={TOKEN} />
    </div>
  );
}

export default App;
