import './accountProjects.css';

import { UserOutlined } from '@ant-design/icons';
import { Col, Popover, Row, Space, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

import CmpMiniProfileAsync from '../../components/cmpMiniProfileAsync';

const AccountProjects = ({ projects = [] }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%', maxHeight: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
      {projects.map((project, projectIndex) => (
        <Row key={projectIndex} gutter={[8]}>
          {/* col 1 */}
          <Col span={20}>
            {/* project name */}
            <div>
              <Typography.Link strong onClick={() => history.push(`/project/${project.code}`)}>
                {project.code} - {project.name}
              </Typography.Link>
            </div>
            {/* project description */}
            <div style={{ paddingLeft: 8 }}>
              <Typography.Text type='secondary'> {project.description}</Typography.Text>
            </div>
            {/* author */}
            <div style={{ paddingLeft: 8 }}>
              <Popover mouseEnterDelay={0.5} placement='right' content={<CmpMiniProfileAsync userId={project.author._id}></CmpMiniProfileAsync>} style={{ width: 400 }}>
                <Typography.Text className='collaborator-name'>
                  by <strong>{project.author.name}</strong>
                </Typography.Text>
              </Popover>
            </div>
          </Col>
          {/* col 2 */}
          <Col span={4}>
            {/* collaborators count */}
            <UserOutlined></UserOutlined> {project.collaboratorsCount}
          </Col>
        </Row>
      ))}
    </Space>
  );
};

export default AccountProjects;
