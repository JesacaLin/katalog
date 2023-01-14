"use strict";

//Tool Tip - Bootstrap
const tooltips = document.querySelectorAll(".tt");
tooltips.forEach((t) => {
  new bootstrap.Tooltip(t);
});
