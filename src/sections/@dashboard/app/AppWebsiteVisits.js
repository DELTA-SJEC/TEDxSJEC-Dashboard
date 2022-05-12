/* eslint-disable */ 
import { useState,useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box ,CircularProgress} from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';

// ----------------------------------------------------------------------



export default function AppWebsiteVisits(users) {
  var count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};

  const [date,setDate]=useState([])
  const [occ,setOcc]=useState([])
  const [isLoading,setLoading]=useState(true);
  
  const CHART_DATA = [
  {
    name: 'Total',
    type: 'column',
    data: [],
  }
];
const chartOptions = merge(BaseOptionChart(), {
   
  stroke: { width: [1, 2, 3] },
  plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
  fill: { type: ['solid', 'gradient', 'solid'] },
  labels: [],
  xaxis: { type: 'datetime' },
  tooltip: {
    shared:Boolean,
    intersect: false,
    followCursor: Boolean,
    y: {
      formatter: (y) => {
        if (typeof y !== 'undefined') {
          return `${y.toFixed(0)} registered`;
        }
        return y;
      }
    },
    x: {
      
      formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
        return new Date(value).toLocaleDateString('en-GB', {  month: 'short', day: 'numeric' })
            }
      },
      
   
  },


});

  useEffect(() => {
   var datearray=[]
    users.users.map((item)=>{
      if (typeof item.items!='undefined'){
      datearray.push(item.items.filter(y=>y.status=='captured').map(x=>new Date(x.created_at*1000).toLocaleDateString('en-US'))[0])
    
    }})
    setDate(Object.keys(count(datearray)))
    setOcc(Object.values(count(datearray)))
    setLoading(false)
   
   
  
  }, []) 
  if (isLoading) {
    return (   
    <div>
      
        <CircularProgress color="inherit" />
      
    </div>);
  }else{
    CHART_DATA[0]['data']=occ
    chartOptions['labels']=date

}
  
  
  


  return (

   
    <Card>
      <CardHeader title="Registrations" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line"  series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
