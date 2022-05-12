/* eslint-disable */ 
import { useState,useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';
import { previousDay } from 'date-fns';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

var TOTAL = 0;


export default function AppWeeklySales(users) {
 
  const [total,setTotal]=useState(0)

  
  useEffect(() => {
    TOTAL=0;
    users.users.map((item)=>{
      if (typeof item.items!='undefined'){
      var t=item.items.filter(y=>y.status=='captured').map(x=>x.amount).reduce((acc,bill)=>bill+acc);
      TOTAL=TOTAL+t
      setTotal(TOTAL);
    }
    })
   
   
  }, []) 
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="fa-solid:rupee-sign" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(total/100)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total amount of cash
      </Typography>
    </RootStyle>
  );
}
