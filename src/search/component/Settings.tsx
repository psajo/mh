import React, { ReactElement } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';

interface SettingProps {
  logout: LogoutFunc;
}
type LogoutFunc = () => void;

export default function Settings({ logout }: SettingProps): ReactElement {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={logout}>로그아웃</Menu.Item>
        </Menu>
      }
      trigger={['click']}
      placement="bottomRight"
    >
      <Button shape="circle" icon={<SettingFilled />} />
    </Dropdown>
  );
}
