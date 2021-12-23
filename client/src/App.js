import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import {
  ApolloProvider, // ApolloProvider is a react component that provides the client to the entire application will be a hook
  ApolloClient, // ApoloClient is the client that connects to the server
  InMemoryCache, // InMemoryCache is the cache that stores the data from the server
  createHttpLink, // createHttpLink is a function that creates the link to the server
} from "@apollo/client"; // Compare this snippet from client\src\components\Header\index.js:
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

const httpLink = createHttpLink({
  //using this function to create the link to the server and pass in the url to the server and the headers to the server
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  //here we are passing in the client to the ApolloProvider component so we can use the client in the entire application
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
