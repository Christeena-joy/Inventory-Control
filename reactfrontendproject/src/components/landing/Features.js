import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    imageLight: '/static/images/templates/templates-images/dash-light.png',
    imageDark: '/static/images/templates/templates-images/dash-dark.png',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description:
      'This item could provide information about the mobile app version of the product.',
    imageLight: '/static/images/templates/templates-images/mobile-light.png',
    imageDark: '/static/images/templates/templates-images/mobile-dark.png',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: '/static/images/templates/templates-images/devices-light.png',
    imageDark: '/static/images/templates/templates-images/devices-dark.png',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Product features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Here you can provide a brief overview of the key features of the
              product. For example, you could list the number of features, the types
              of features, add-ons, or the benefits of the features.
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => (theme.palette.mode === 'light' ? (selectedItemIndex === index ? 'primary.light' : '') : (selectedItemIndex === index ? 'primary.light' : '')),
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
              width: '100%',
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${selectedFeature.imageLight})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
            </Box>
          </Box>
          <Grid container item spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {items.map(({ icon, title, description }, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: 'fit-content',
                    background: 'none',
                    backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                    borderColor: (theme) => (theme.palette.mode === 'light' ? (selectedItemIndex === index ? 'primary.light' : 'grey.200') : (selectedItemIndex === index ? 'primary.dark' : 'grey.800')),
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? (selectedItemIndex === index ? 'primary.main' : 'grey.300') : (selectedItemIndex === index ? 'primary.main' : 'grey.700')),
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography color="text.primary" variant="body2" fontWeight="bold">
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                      {description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
