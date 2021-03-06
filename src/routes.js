import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Subforum from "./Components/Subforum/Subforum";
import Profile from "./Components/Profile/Profile";
import CreatePost from "./Components/CreatePost/CreatePost";
import PostDetailed from "./Components/Post/PostDetailed/PostDetailed";
//protected route imports
import ProtectedProfile from "./ProtectedRoutes/ProtectedProfile";
import ProtectedCreatePost from './ProtectedRoutes/ProtectedCreatePost';
import Search from "./Components/Search/Search";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/subforums/:subforumId/posts/:postId" component={PostDetailed} />
    <Route path="/subforums/:subforumId" component={Subforum} />
    <ProtectedProfile path="/users/:userId" component={Profile} />
    <ProtectedCreatePost path="/create-post/:subforumId?" component={CreatePost} />
    <Route path="/search" component={Search} />
  </Switch>
);
