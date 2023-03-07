import { useState, useEffect } from 'react';
// import useSWR from 'swr';
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material'

import { AdminLayout } from '../../../components';
import { SummaryTile } from '../../../components';
import { DashboardSummaryResponse } from '@/features/next-teslo';
import { useDashboard } from '../../../api/get-dashboard';

export const DashboardPageAdmin = () => {

    // const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    //     refreshInterval: 30 * 1000 // 30 segundos
    // });

    const { data, error, isLoading, refetch } = useDashboard({
      useQueryOptions: {
        refetchInterval: 30 * 1000, // 30 Segundos
      },
    })

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
      const interval = setInterval(()=>{
        console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
      }, 1000 );
    
      return () => clearInterval(interval)
    }, []);
    



    // if ( !error && !data ) {
    //     return <></>
    // }

    if (isLoading) {
      return <><h4>Carganado los datos</h4></>;
    }

    if ( error ){
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }


    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;


  return (
    <AdminLayout title='Dashboard' subTitle='Estadisticas generales' icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle='Ordenes totales'
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={paidOrders}
          subTitle='Ordenes pagadas'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={notPaidOrders}
          subTitle='Ordenes pendientes'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfClients}
          subTitle='Clientes'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfProducts}
          subTitle='Productos'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={productsWithNoInventory}
          subTitle='Sin existencias'
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={lowInventory}
          subTitle='Bajo inventario'
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={refreshIn}
          subTitle='Actualización en:'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />

        <Button onClick={()=>refetch()} color={ 'primary' }>Actualizar manualmente</Button>
      </Grid>
    </AdminLayout>
  )
}

//export default DashboardPage