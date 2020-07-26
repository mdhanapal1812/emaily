import React from "react";

/**
 * This component represents the landing page.
 */
const Landing = () => {
  return (
    <header class='masthead'>
      <div class='container'>
        <div
          class='masthead-subheading'
          style={{ color: "#ffcc00", background: "white", opacity: "0.8" }}
        >
          Improve the quality of your products
        </div>
        <div
          class='masthead-heading'
          style={{ color: "black", fontSize: "medium" }}
        >
          <a
            class='btn btn-primary btn-xl text-uppercase js-scroll-trigger'
            href='/auth/google'
          >
            Hi , Start Collecting Your feedbacks !
          </a>
        </div>
      </div>
    </header>
  );
};

export default Landing;
