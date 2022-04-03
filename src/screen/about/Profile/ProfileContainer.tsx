import { useQuery } from '@apollo/client';
import React from 'react';
import { Loader } from '../../../common/components';
import { userDetail } from '../graphql/queries';
import ProfileScreen from './ProfileScreen';

const ProfileContainer: React.FC<any> = ({ navigation }: any) => {
  const { data, loading } = useQuery(userDetail, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <Loader />;
  }

  const updatedProps = {
    navigation,
    dataUser: data?.userDetail,
  };
  return <ProfileScreen {...updatedProps} />;
};

export default ProfileContainer;
