import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const CmpDrawer = ({ title, placement = 'left', children, width, history, drawerCloseCallback }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // visible state
  const [isVisible, isVisibleSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // handle close drawer
  const handleClose = () => isVisibleSet(false);

  // handle close drawer with callback
  const handleCloseDrawerWithCallback = (...args) => {
    // call callback function before closing
    drawerCloseCallback(...args);

    // close drawer
    handleClose();
  };

  // handle after visible change
  const handleAfterVisibleChange = (_isVisible) => {
    // if drawer is closing => return to previous route
    if (!_isVisible) history.goBack();
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  // pass additional properties to rendered children
  const modifiedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      // children can close this drawer
      handleCloseDrawer: handleClose,
      // children can call callback function with the given parameter(s), then close this drawer
      handleCloseDrawerWithCallback: handleCloseDrawerWithCallback,
    })
  );

  return (
    <Drawer title={title} width={width} placement={placement} visible={isVisible} onClose={handleClose} afterVisibleChange={handleAfterVisibleChange}>
      {modifiedChildren}
    </Drawer>
  );
};

CmpDrawer.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  history: PropTypes.object.isRequired,
  drawerCloseCallback: PropTypes.func,
};

export default CmpDrawer;
