import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import FORMLAYOUT from '../constants/FORMLAYOUT';
import { isEmptyArray } from '../utilities/utlType';

const CmpDetail = ({ label, value, labelSpan = FORMLAYOUT.sameRow.body.labelCol.lg.span, valueSpan = FORMLAYOUT.sameRow.body.wrapperCol.lg.span, separator = ' - ' }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  // value to be displayed
  let renderedValue = value;

  // check if value is an empty array
  if (!isEmptyArray(renderedValue)) renderedValue = renderedValue.join(separator);

  return (
    <Row gutter={[8, 8]}>
      {/* label */}
      <Col span={labelSpan} style={{ textAlign: 'right' }}>
        {label} :
      </Col>
      {/* value */}
      <Col span={valueSpan} style={{ fontWeight: 'bold' }}>
        {renderedValue || '-'}
      </Col>
    </Row>
  );
};

CmpDetail.propTypes = {
  label: PropTypes.any.isRequired,
  value: PropTypes.any,
  labelSpan: PropTypes.number,
  valueSpan: PropTypes.number,
  separator: PropTypes.string,
};

export default CmpDetail;
