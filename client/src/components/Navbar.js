import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{flexGrow: 1}}>
            Ad App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar