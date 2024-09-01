import React from 'react';
import errorimg from '../../assets/errorimg.svg';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center', maxWidth: '500px' }}>
          <img src={errorimg} alt="Page Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
            Opps!!!
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            The page you are looking for could not be found.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            sx={{ textDecoration: 'none' }}
          >
            Go Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
