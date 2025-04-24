const logoName = document.getElementById("logo-name");
const body = document.querySelector("body");
const navbar = document.querySelector("nav");

window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");

  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "There was a problem. Please try again.";
  }

  // Handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// Back to top arrow button

const backToTopBtn = $("#backToTopBtn");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    backToTopBtn.addClass("show");
  } else {
    backToTopBtn.removeClass("show");
  }
});

backToTopBtn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
