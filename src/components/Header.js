import React from "react";

function Header() {
  return (
    <header className="header">
      <img src="<%=require('./images/logo.svg')%>" alt="Логотип" className="header__logo"/>
    </header>
  )
}

export default Header;
