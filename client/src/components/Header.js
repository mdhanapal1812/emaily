import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payment from "./Payment";

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li
            class='nav-item'
            style={{ margin: "0 10px", color: " #ffcc00", fontWeight: "40px" }}
          >
            <a href='/auth/google' class='nav-link js-scroll-trigger'>
              Login With Google
            </a>
          </li>
        );
      default:
        return [
          <li
            class='nav-item'
            key='3'
            style={{
              margin: "0 10px",
              color: " #ffcc00",
              fontWeight: "40px",
              font: "Montserrat",
            }}
          >
            Credits : {this.props.auth.credits}
          </li>,
          <li class='nav-item' key='1'>
            <Payment />
          </li>,
          <li class='nav-item' key='2'>
            <a
              href='/api/logout'
              class='nav-link js-scroll-trigger'
              style={{ color: " #ffcc00", fontWeight: "40px" }}
            >
              Logout
            </a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav class='navbar navbar-expand-lg navbar-dark fixed-top' id='mainNav'>
        <div class='container'>
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className='navbar-brand js-scroll-trigger'
          >
            FeedbackStore
          </Link>

          <div class='collapse navbar-collapse' id='navbarResponsive'>
            <ul class='navbar-nav text-uppercase ml-auto'>
              {this.renderContent()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
