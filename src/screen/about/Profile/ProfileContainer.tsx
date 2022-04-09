import { useQuery } from '@apollo/client';
import React from 'react';
import { Loader } from '../../../common/components';
import { useApp } from '../../../hook';
import { userDetail } from '../graphql/queries';
import AboutScreen from './AboutScreen';

const ProfileContainer: React.FC<any> = ({ navigation, route }: any) => {
  const app = useApp();
  const { data, loading } = useQuery(userDetail, {
    variables: {
      _id: app.currentUser._id,
    },
  });

  if (loading) {
    return <Loader />;
  }
  console.log(data);

  const updatedProps = {
    navigation,
    route,
    dataUser: data?.userDetail,
  };
  return <AboutScreen {...updatedProps} />;
};

export default ProfileContainer;
