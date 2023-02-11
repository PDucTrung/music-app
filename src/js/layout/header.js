import $ from "jquery";
import _ from "lodash";
import { routes } from "../routes";

const renderHeader = () => {
  const $header = $(".header");

  $header.html(` 
        <nav class="navbar navbar-expand-lg bg-light fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav> `);

  const $navbarNav = $(".navbar-nav");

  $navbarNav.html(
    _.map(routes, (item) => {
      return `
    <li class="nav-item">
        <a class="nav-link" href="${item.path}">${item.children}</a>
    </li>`;
    })
  );
};

$(() => {
  renderHeader();
});
