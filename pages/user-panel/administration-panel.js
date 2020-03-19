import React from 'react'
import Head from 'next/head'

import { useSelector } from 'react-redux'

import Layout from '../../components/Layout'
import UserPanel from '../../components/User-panel'
import Articles from '../../components/User-panel/articles'
import get from '../../API/get'


const ArticlesPanel = ({ articles }) => {

  const languageSource = useSelector( s => s.language.source );

  return (
    <Layout>
      <Head>
        <title>
          { languageSource.userPanel.adminPanelTitle } - SiemaBiz Forum
        </title>
      </Head>

      <UserPanel menu = { languageSource.administrationPanel.menu } >
        <Articles />
      </UserPanel>

    </Layout>
  )
}

// Articles.getInitialProps = async ctx => {
//   const articles = await get( 'articles/shorts' );

//   return {
//     articles
//   }
// }

export default ArticlesPanel