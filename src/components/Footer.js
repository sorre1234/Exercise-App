import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import Logo from '../assets/images/Logo-1.png'

const Footer = () => {
  return (
    <Box mt="80px" bgColor="#FFF3F4">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="200px" height="40px" />
      </Stack>
      <Typography align="center" pb="40px" mt="30px" variant="h5">
        Made with ❤️ by <a href="https://github.com/SamarthMayya">SamarthMayya</a>
      </Typography>
    </Box>
  )
}

export default Footer