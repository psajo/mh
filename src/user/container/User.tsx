import { Col, Descriptions, PageHeader, Row, Typography } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { fetchUserAC } from '../state/ducks';

type UserProps = {
  name: string;
};
/**
 *
 * @param {object} param
 * @param {import('react-router').match} param.match
 */
export default function User({
  match
}: RouteComponentProps<UserProps>): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { user: { user: UserData } }) => state.user.user
  );
  const { name } = match.params;
  // const {params} = match;
  // const name = match.params.name;
  useEffect(() => {
    // dispatch(actions.fetchUser(name));
    dispatch(fetchUserAC(name));
  }, [dispatch, name]);

  const isFetched = true;

  // const { isFetched, isSlow } = useFetchInfo(Types.FetchUser);

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader onBack={history.goBack} title="사용자 정보">
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="소속">
                {user.department}
              </Descriptions.Item>
              <Descriptions.Item label="태그">{user.tag}</Descriptions.Item>
              <Descriptions.Item label="수정 내역">수정 내역</Descriptions.Item>
            </Descriptions>
          )}
          {!user && isFetched && (
            <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>
          )}
        </PageHeader>
      </Col>
    </Row>
  );
}
