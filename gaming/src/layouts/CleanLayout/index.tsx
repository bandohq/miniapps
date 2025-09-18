import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import Navbar from '@components/Navbar';
import SimpleFooter from '@components/SimpleFooter';
import theme from '@config/theme';
import { PromoBanner } from "@components/PromoBanner/PromoBanner";

const LayoutContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  background: 'linear-gradient(45deg, #15AF84 0%, #B93FED 100%)',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Container = styled('div')(() => ({
  width: '100%',
  margin: '0 auto',
  height: 'auto',
  display: 'flex',
  padding: theme.spacing(2),
  paddingTop: '20px',
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '0 auto',
  padding: 0,
}));

export type CleanLayoutProps = PropsWithChildren;

export default function CleanLayout({ children }: CleanLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar />
      {/* <PromoBanner /> */}
      <Container>
        <ContentContainer>{children}</ContentContainer>
      </Container>
      <SimpleFooter bgColor="transparent" textColor="primary.main" />
    </LayoutContainer>
  );
}
