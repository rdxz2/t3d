import React from 'react';

const PgAccount = ({ handleChangeActivePage }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // change active page
  React.useEffect(() => {
    handleChangeActivePage('Account');
  }, [handleChangeActivePage]);

  // END -- EFFECTS
  return (
    <>
      <div>Pg Account</div>
      {/* user information */}
      {/* user preferences */}
      {/* about this application */}
      {/* (this project is inspired by ...) */}
    </>
  );
};

export default PgAccount;
