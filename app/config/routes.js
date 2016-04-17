import React from 'react';
import Main from '../components/Main';
import HomeView from '../components/HomeView';
import { Router, Route, DefaultRoute } from 'react-router';
import AboutView from '../components/AboutView';
import GroupsView from '../components/GroupsView';
import EditView from '../components/EditView';

export default (
  <Route name="app" path="/" handler={Main}>
      <Route name="about" path="about" handler={AboutView} />
      <Route name="groups" path="groups" handler={GroupsView} />
    <Route name="edit" path="edit/:groupId" handler={EditView} />
      <DefaultRoute handler={HomeView} />
  </Route>
);