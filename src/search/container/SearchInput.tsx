import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Space, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setUserAC } from '../../user/state/ducks';
import { fetchAutoCompletesAC, setKeywordAC } from '../state/ducks';

type SearchsState = {
  search: {
    keyword: string;
    autoCompletes: UserData[];
  };
};

export default function SearchInput(): JSX.Element {
  const keyword = useSelector((state: SearchsState) => state.search.keyword);
  const dispatch = useDispatch();

  function onInputChange(value: string) {
    if (value !== keyword) {
      dispatch(setKeywordAC(value));
      dispatch(fetchAutoCompletesAC(value));
    }
  }

  const autoCompletes = useSelector(
    (state: SearchsState) => state.search.autoCompletes
  );
  const history = useHistory();
  function goToUser(value: string) {
    const user = autoCompletes.find(item => item.name === value);
    if (user) {
      dispatch(setUserAC(user));
      history.push(`/user/${user.name}`);
    }
  }
  return (
    <AutoComplete
      style={{ width: '100%' }}
      value={keyword}
      onChange={onInputChange}
      onSelect={goToUser}
      autoFocus
      options={autoCompletes.map(item => ({
        value: item.name,
        label: (
          <Space>
            <Typography.Text strong>{item.name}</Typography.Text>
            <Typography.Text type="secondary">
              {item.department}
            </Typography.Text>
            <Typography.Text>{item.tag}</Typography.Text>
          </Space>
        )
      }))}
    >
      <Input.Search
        size="large"
        placeholder="검색어를 입력해주세요"
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
}
