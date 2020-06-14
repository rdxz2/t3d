import { ArrowLeftOutlined, EllipsisOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useHistory } from 'react-router';

import COLOR from '../../constants/COLOR';
import FORMLAYOUT from '../../constants/FORMLAYOUT';
import INPUTSELECT from '../../constants/INPUTSELECT';
import CtxApi from '../../contexts/ctxApi';

const FrRegister = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // select inputs
  const [selectDepartment, selectDepartmentSet] = React.useState({ isLoading: true, data: [] });
  const [selectPosition, selectPositionSet] = React.useState({ isLoading: true, data: [] });

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // submit: register
  const handleSubmit = async (values) => {
    // submitting...
    isSubmittingSet(true);

    try {
      // send log in request
      const response = await svsT3dapi.sendRequest('api/authentication/register', 'post', values);

      // set jwt to local storage
      svsT3dapi.setApiJwt(response.data.token);

      // display message
      message.success(`register success, welcome ${response.data.name}`);

      // redirect to home
      history.replace('/');
    } catch {
      // not submitting...
      isSubmittingSet(false);
    }
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    // populate select list: department
    svsT3dapi
      .sendRequestSelectList('department')
      .then((response) => selectDepartmentSet({ isLoading: false, data: response.data }))
      .catch((error) => selectDepartmentSet({ isLoading: false }));

    // populate select list: position
    svsT3dapi
      .sendRequestSelectList('position')
      .then((response) => selectPositionSet({ isLoading: false, data: response.data }))
      .catch((error) => selectPositionSet({ isLoading: false }));
  }, [svsT3dapi]);

  // END -- EFFECTS

  return (
    <Form {...FORMLAYOUT.sameRow.body} onFinish={handleSubmit}>
      {/* username */}
      <Form.Item hasFeedback label='Username' name='username' rules={[{ required: true, whitespace: true, message: 'username is required' }]}>
        <Input autoFocus placeholder='your username' prefix={<UserOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></UserOutlined>}></Input>
      </Form.Item>
      {/* name */}
      <Form.Item hasFeedback label='Name' name='name' rules={[{ required: true, whitespace: true, message: 'name is required' }]}>
        <Input autoFocus placeholder='your real name' prefix={<EllipsisOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></EllipsisOutlined>}></Input>
      </Form.Item>
      {/* email */}
      <Form.Item
        hasFeedback
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'email is required' },
          { type: 'email', message: 'email format is invalid' },
        ]}>
        <Input autoFocus placeholder='your email' prefix={<MailOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></MailOutlined>}></Input>
      </Form.Item>
      {/* password */}
      <Form.Item
        hasFeedback
        label='Password'
        name='password'
        rules={[
          { required: true, whitespace: true, message: 'password is required' },
          { min: 5, message: 'min. password length is 5 character' },
          { max: 100, message: 'max. password length is 100 character' },
        ]}>
        <Input autoFocus placeholder='your password' type='password' prefix={<LockOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></LockOutlined>}></Input>
      </Form.Item>
      {/* confirm password */}
      <Form.Item
        hasFeedback
        label='Confirm Password'
        name='passwordConfirm'
        dependencies={['password']}
        rules={[
          { required: true, message: 'password confirmation is required' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) return Promise.resolve();
              return Promise.reject('password does not match');
            },
          }),
        ]}>
        <Input autoFocus placeholder='confirm your password' type='password' prefix={<LockOutlined style={{ color: COLOR.ICON_PLACEHOLDER }}></LockOutlined>}></Input>
      </Form.Item>
      {/* department */}
      <Form.Item hasFeedback label='Department' name='department' rules={[{ required: true, whitespace: true, message: 'select department' }]}>
        <Select
          {...INPUTSELECT.SEARCH_PROPERTY}
          notFoundContent='department not found'
          placeholder='- select your department -'
          loading={selectDepartment.isLoading}
          onSearch={_.debounce(async (searchString) => {
            // get department selectlist data
            selectDepartmentSet((_selectDepartment) => ({ ...selectDepartment, isLoading: true }));
            const responseSelectDepartment = await svsT3dapi.sendRequestSelectList('department', { search: searchString });
            selectDepartmentSet({ isLoading: false, data: responseSelectDepartment.data });
          }, INPUTSELECT.SEARCH_DELAY)}
          // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {selectDepartment.data.map((department, departmentIndex) => (
            <Select.Option key={departmentIndex} value={department.value}>
              {department.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {/* position */}
      <Form.Item hasFeedback label='Position' name='position' rules={[{ required: true, whitespace: true, message: 'select position' }]}>
        <Select
          {...INPUTSELECT.SEARCH_PROPERTY}
          notFoundContent='position not found'
          placeholder='- select your position -'
          loading={selectPosition.isLoading}
          onSearch={_.debounce(async (searchString) => {
            // get position selectlist data
            selectPositionSet((_selectPosition) => ({ ...selectPosition, isLoading: true }));
            const responseSelectPosition = await svsT3dapi.sendRequestSelectList('position', { search: searchString });
            selectPositionSet({ isLoading: false, data: responseSelectPosition.data });
          }, INPUTSELECT.SEARCH_DELAY)}>
          {selectPosition.data.map((position, positionIndex) => (
            <Select.Option key={positionIndex} value={position.value}>
              {position.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {/* action buttons */}
      <Form.Item {...FORMLAYOUT.sameRow.action}>
        <Row gutter={16}>
          {/* back */}
          <Col span={12}>
            <Button block icon={<ArrowLeftOutlined></ArrowLeftOutlined>} onClick={() => history.push('/login')}>
              Back
            </Button>
          </Col>
          {/* submit */}
          <Col span={12}>
            <Button block type='primary' htmlType='submit' loading={isSubmitting}>
              Register
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FrRegister;
