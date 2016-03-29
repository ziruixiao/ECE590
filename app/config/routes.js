import React from 'react';
import Main from '../components/Main';
import HomeView from '../components/HomeView';
import { Router, Route, DefaultRoute } from 'react-router';
import AboutView from '../components/AboutView';
import ContactView from '../components/ContactView';
import TermsView from '../components/TermsView';
import PrivacyView from '../components/PrivacyView';

export default (
  <Route name="app" path="/" handler={Main}>
      <Route name="about" path="about" handler={AboutView} />
      <Route name="contact" path="contact" handler={ContactView} />
    <Route name="privacy" path="privacy" handler={PrivacyView} />
    <Route name="terms" path="terms" handler={TermsView} />
      <DefaultRoute handler={HomeView} />
  </Route>
);