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
            <a className="navbar-item logo" href="https://bulma.io">
              <img src="https://nuts.com/nutshell/img/nuts-logo-420b6a54.svg" />
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="nuts-nav"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="nuts-nav" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>View Cart</strong>
                  </a>
                  <a className="button is-light">Log in</a>
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
