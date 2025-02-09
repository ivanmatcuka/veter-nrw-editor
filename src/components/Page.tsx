import { Box, Container } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2}>
        {children}
      </Box>
    </Container>
  );
};
