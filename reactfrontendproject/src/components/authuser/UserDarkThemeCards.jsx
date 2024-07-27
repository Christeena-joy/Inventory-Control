import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Link as RouterLink } from 'react-router-dom';

const items = [
  
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Products',
    description:
      'Take charge of your inventory with intuitive tools to organize, monitor, and optimize product listings effortlessly.',
    link:'/user/product'
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Customers',
    description:
      'Cultivate strong customer relationships and provide exceptional service by managing customer information efficiently.',
      "link":"/customer"
  },
  
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Sales',
    description:
      'Dive deep into sales data, track performance metrics, and uncover insights to drive revenue growth and success.',
      "link":"/sales"
  },
];

export default function UserDarkThemeCards() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#000000bd',
        marginLeft:"80px"
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
           DASHBOARD
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          The dashboard provides comprehensive management capabilities, 
          enabling functionality to oversee sales, product listing and customers efficiently.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                <RouterLink to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  </RouterLink>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}