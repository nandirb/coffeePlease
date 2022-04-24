import React from 'react';
import { useQuery } from '@apollo/client';
import { Loader } from '../../../common/components';
import { useApp } from '../../../hook';
import { userDetail } from '../graphql/queries';
import AboutScreen from './AboutScreen';

const AboutContainer: React.FC<any> = ({ navigation, route }: any) => {
  const app = useApp();
  const { data, loading } = useQuery(userDetail, {
    variables: {
      _id: app.currentUser._id,
    },
  });

  if (loading) {
    return <Loader />;
  }

  const updatedProps = {
    navigation,
    route,
    dataUser: data?.userDetail,
  };
  return <AboutScreen {...updatedProps} />;
};

export default AboutContainer;
