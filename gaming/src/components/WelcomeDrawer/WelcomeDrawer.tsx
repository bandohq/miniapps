import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface WelcomeDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface PromoBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
}

export const WelcomeDrawer: React.FC<WelcomeDrawerProps> = ({ open, onClose }) => {
  const theme = useTheme();

  // Sample promotion banners - you can replace with real data
  const promoBanners: PromoBanner[] = [
    {
      id: 1,
      title: '',
      subtitle: '',
      image: '/promo1.png',
      gradient: 'linear-gradient(135deg, rgba(244, 65, 229, 0.8) 0%, rgba(68, 219, 246, 0.8) 100%)',
    },
  ];

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: { xs: '50vh', sm: '70vh'},
          maxHeight: '800px',
          width: '100%',
          background: 'linear-gradient(135deg, rgba(21, 175, 132, 0.1) 0%, rgba(185, 63, 237, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(185, 63, 237, 0.2)',
          borderBottom: 'none',
          borderTopLeftRadius: 'none',
          borderTopRightRadius: 'none',
          boxShadow: '0 -10px 50px rgba(185, 63, 237, 0.3)',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            padding: { xs: '12px 8px', sm: '16px 16px', md: '20px 24px' },
            textAlign: 'center',
            flexShrink: 0, // Prevent hero from shrinking
            maxHeight: { xs: '120px', sm: '140px', md: '160px' }, // Limit hero height
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: '700',
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
              mb: 0.5,
              textShadow: '0 0 30px rgba(185, 63, 237, 0.3)',
            }}
          >
            Welcome to GamePay
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              mb: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              textShadow: '0 0 20px rgba(21, 175, 132, 0.3)',
            }}
          >
            Buy gaming giftcards and vouchers for your favorite games and gaming stores.
            </Typography>
        </Box>

        {/* Promotion Slider Section */}
        <Box
          sx={{
            flex: '1 1 auto',
            padding: { xs: '8px 4px', sm: '12px 8px', md: '16px 12px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0, // Allow flex to work properly
            overflow: 'visible', // Allow content to be visible
          }}
        >

          <Box 
            sx={{ 
              flex: '1 1 auto', 
              position: 'relative',
              height: 'auto',
              width: '90%',
              margin: '0 auto',
              '& .slick-slider': {
                height: '100%',
              },
              '& .slick-list': {
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
              },
              '& .slick-track': {
                height: '100%',
              },
              '& .slick-slide': {
                height: 'auto',
                '& > div': {
                  height: '100%',
                },
              },
              '& .slick-dots': {
                display: 'none !important',
                bottom: '-40px',
                '& li': {
                  margin: '0 4px',
                  '& button': {
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    '&:before': {
                      display: 'none',
                    },
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.5)',
                      transform: 'scale(1.2)',
                    },
                  },
                  '&.slick-active button': {
                    background: 'linear-gradient(45deg, #15AF84 0%, #B93FED 100%)',
                    boxShadow: '0 0 15px rgba(185, 63, 237, 0.5)',
                  },
                },
              },
              '& .slick-arrow': {
                zIndex: 2,
                width: { xs: '32px', sm: '40px' },
                height: { xs: '32px', sm: '40px' },
                background: 'rgba(185, 63, 237, 0.1)',
                border: '1px solid rgba(185, 63, 237, 0.3)',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:before': {
                  color: '#B93FED',
                  fontSize: '16px',
                },
                '&:hover': {
                  background: 'rgba(185, 63, 237, 0.2)',
                  boxShadow: '0 0 20px rgba(185, 63, 237, 0.4)',
                },
              },
              '& .slick-prev': {
                left: { xs: '8px', sm: '12px' },
              },
              '& .slick-next': {
                right: { xs: '8px', sm: '12px' },
              },
            }}
          >
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={4000}
              pauseOnHover={true}
              arrows={true}
            >
              {promoBanners.map((banner) => (
                <Box key={banner.id} sx={{}}>
                  <Box
                    sx={{
                      height: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <img
                      src={banner.image}
                      alt="Promotion"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '16px',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>

        {/* Get Started Button */}
        <Box
          sx={{
            padding: { xs: '12px 16px', sm: '16px 20px', md: '20px 24px' },
            borderTop: '1px solid rgba(185, 63, 237, 0.2)',
            background: 'rgba(0, 0, 0, 0.2)',
            flexShrink: 0, // Prevent button area from shrinking
            minHeight: { xs: '70px', sm: '80px', md: '90px' }, // Ensure minimum height for button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onClose}
            fullWidth
            sx={{
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #15AF84 0%, #B93FED 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
              padding: { xs: '12px', sm: '14px', md: '16px' },
              boxShadow: '0 0 30px rgba(185, 63, 237, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 0 50px rgba(185, 63, 237, 0.6)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Let's get started! 🚀
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
