import React from "react";

const Landing = () => {
  return (
    <header class='masthead'>
      <div class='container'>
        <div class='masthead-subheading' style={{ color: "#ffcc00" }}>
          Feedback Collector
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
