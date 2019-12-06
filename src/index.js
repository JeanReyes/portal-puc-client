import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// Apollo Server components
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

// styles
import "assets/css/bootstrap.min.css";
import "assets/css/paper-kit.css";
import "assets/demo/demo.css";
import 'assets/css/react-bootstrap-table2.min.css';
// pages
import Index from "views/Index.js";
import Case from "views/sections/Case";
import { Animated } from "react-animated-css";
import IndexFooter from "components/Footers/IndexFooter";
import SectionPageHeader from "components/Headers/SectionPageHeader";
import IndexHeader from "components/Headers/IndexHeader";
import Login from "views/beaware/Login";
import IndexBeaware from "views/beaware/IndexBeaware";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // Send token to the server
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: { authorization: token }
    })
  },
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});
// others
const URLactual = window.location;
const Header = () => (
  (URLactual.pathname === '/') ?  <IndexHeader /> : <SectionPageHeader />
)

const token = localStorage.getItem('token') || '';

const SitePage = () => (
  <BrowserRouter>
    <Fragment>
      <Animated animationIn="fadeIn" animationInDuration={1000} animationOut="fadeOutDown" animationOutDuration={1000}>
        <IndexNavbar />
        <Header />
        <Switch>
          <Route exact path='/' component= {Index}  />
          <Route exact path='/case' component= {Case} />
          <Redirect to="/" />
        </Switch>
        <IndexFooter />
      </Animated>
    </Fragment>
  </BrowserRouter>
)
const AdminPage = () => (
  <BrowserRouter>
    <Fragment>
      <Animated animationIn="fadeIn" animationInDuration={1000} animationOut="fadeOutDown" animationOutDuration={1000}>
        <Switch>
          <Route exact path='/beaware' render= { (props) => <IndexBeaware token={token} {...props} /> } />
          <Route exact path='/beaware/login'  render= { (props) => <Login token={token} {...props} /> } />
          {/* <Route exact path='/beaware/login' component= {Login} /> */}
          <Redirect to="/beaware" />
        </Switch>
        <IndexFooter />
      </Animated>
    </Fragment>
  </BrowserRouter>
)
let Content = (URLactual.pathname.indexOf('beaware') > 0) ? AdminPage : SitePage
console.log(URLactual);
ReactDOM.render(
  <ApolloProvider client = {client}>
    <Content />
  </ApolloProvider>,
  document.getElementById("root")
);
