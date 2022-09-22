/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <Head>
        <title>Discotify</title>
        <meta name="description" content="meta description for Sign In Page" />
      </Head>
      <img src="/images/beigelogo.png" alt="logo" className="logo" />
      <button type="button" className="btn btn-primary btn-sm copy-btn sign-in" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
