 /* eslint-disable */ 
import { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Backdrop,CircularProgress} from '@mui/material'
//
import axios from 'axios';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData]=useState({})
  const [isLoading, setLoading] = useState(true);
  
useEffect(() => {
    axios.get('https://eurl.vigneshcodes.in/api/current/user',{ headers: { Authorization: localStorage.getItem('token') }})
  .then(function (response) {
    
   
   
    setUserData(response.data.user)
    setLoading(false)
  })
  .catch(function (error) {
    
    console.log(error);
  })  
  
    
  }, [])
  if (isLoading) {
    return ( <div>
      <Backdrop
        sx={{ color: '#00A555', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>);
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} userData={userData} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} userData={userData} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
