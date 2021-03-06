import React from 'react';
import Head from 'next/head';

import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import Separator from '../../components/UI/separator';
import UserPanel from '../../components/User-panel';
import ProfileSettingsComponent from '../../components/User-panel/profile-settings';
import MyCv from '../../components/User-panel/my-cv';
import ChangePassword from '../../components/User-panel/change-password';
import DeleteAccount from '../../components/User-panel/delete_account';

const ProfileSettings = () => {
  const languageSource = useSelector(s => s.language.source);

  return (
    <Layout>
      <Head>
        <title>profile settings - SiemaBiz Forum</title>
      </Head>

      <UserPanel menu={languageSource.userPanel.usermenu}>
        <ProfileSettingsComponent />
        <Separator height='30px' />
        <MyCv />
        <Separator height='30px' />
        <ChangePassword />
        <Separator height='30px' />
        <DeleteAccount />
        <Separator height='30px' />
      </UserPanel>
    </Layout>
  );
};

export default ProfileSettings;
