import React, { useState, useEffect } from 'react';
import { Box, Fade, Slide } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PromoBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
}

interface PromoSliderProps {
  show: boolean;
}

export const PromoSlider: React.FC<PromoSliderProps> = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState<{[key: number]: boolean}>({});

  // Sample promotion banners - same as welcome drawer
  const promoBanners: PromoBanner[] = [
    {
      id: 1,
      title: '50% Bonus Credits',
      subtitle: 'First Purchase',
      image: '/promo1.mp4', // Changed to video
      gradient: 'linear-gradient(135deg, rgba(244, 65, 229, 0.8) 0%, rgba(68, 219, 246, 0.8) 100%)',
    },
  ];

  // Fallback image for when video fails to load
  const fallbackImage = '/promo1.png';

  const handleVideoError = (bannerId: number) => {
    setVideoError(prev => ({ ...prev, [bannerId]: true }));
  };

  useEffect(() => {
    if (show) {
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <Slide direction="down" in={isVisible} timeout={600}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
        }}
      >
        <Fade in={isVisible} timeout={800}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '416px', // Match typical widget width
              position: 'relative',
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
              },
              '& .slick-arrow': {
                display: 'none !important',
              },
            }}
          >
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={4000}
              pauseOnHover={true}
              arrows={false}
            >
              {promoBanners.map((banner) => (
                <Box key={banner.id}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.82);",
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 30px rgba(185, 63, 237, 0.2)',
                      },
                    }}
                  >
                    {videoError[banner.id] ? (
                      <img
                        src={fallbackImage}
                        alt={`${banner.title} - ${banner.subtitle}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '16px',
                        }}
                      />
                    ) : (
                      <video
                        src={banner.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onError={() => handleVideoError(banner.id)}
                        onLoadStart={() => {
                          // Reset error state when video starts loading
                          setVideoError(prev => ({ ...prev, [banner.id]: false }));
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '16px',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Fade>
      </Box>
    </Slide>
  );
};
