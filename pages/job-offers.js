import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'

import get from '../API/get'
import JobOffersSite from '../components/job-offers-site'


const Articles = ({ jobOffers }) => {
  const language = useSelector( s => s.language.source.jobOffersSite );

  return(
    <Layout>
      <Head><title>{ language.siteTitle } SiemaBiz Forum</title></Head>
      <JobOffersSite jobOffers = { jobOffers } />
    </Layout>
  )
}

Articles.getInitialProps = async ctx =>{

  const jobOffers = await get( 'get-all-job-offers' );
  return { jobOffers: jobOffers.reverse() }
}

export default Articles