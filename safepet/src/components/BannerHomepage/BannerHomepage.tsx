import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import './BannerHomePage.scss'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ENV } from '../../env';
import { useUser } from '../../Contexts/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BannerHomepage() {

  
  return (
    <>
        <div className='bannerHomepage-container'>
            <img className="logo-banner" src="../imgs/logo2.webp" alt="SafePet" width={300} height={85} loading="lazy" decoding="async" />
        </div>
    </>
  );
}

export default BannerHomepage;
