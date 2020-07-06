import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Drawer } from 'antd';
import Form from 'antd/lib/form/Form';

const AccountChangePassword = () => {
  // START -- CONTEXTS

  // api
  const {svsT3dapi} = React.useContext(CtxApi)
  
  // END -- CONTEXTS
  
  // START -- OTHERS

  // history
  const history = useHistory();
  
  // END -- OTHERS
  
  // START -- STATES

  // drawer open state
  const [isDrawerOpen, isDrawerOpenSet] = React.useState(true);
  
  // END -- STATES
  
  // START -- FUNCTIONS

  // close the drawer
  const handleDrawerClose = isDrawerOpenSet(false)
  
  // END -- FUNCTIONS
  
  // START -- EFFECTS
  
  // END -- EFFECTS

  return (
  <Drawer onClose={handleDrawerClose}>
    <Form>
      
    </Form>
  </Drawer>);
}
 
export default AccountChangePassword;