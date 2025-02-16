import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {children}
    </Box>
  );
};
