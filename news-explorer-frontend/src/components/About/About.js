import React, { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function About() {
    const currentUser = useContext(CurrentUserContext);
  
  return (
    <div>
      <h3 className="about-user_email">{currentUser.email}</h3>
    </div>
  );
}

export default About;