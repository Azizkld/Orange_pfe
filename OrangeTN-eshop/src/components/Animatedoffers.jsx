import React from 'react';
import { Box, Image, Text, Button, Center, IconButton, Stack } from '@chakra-ui/react';
import Slider from 'react-slick';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import offre1 from '../images/offre1.jpeg';
import offre2 from '../images/offre2.jpeg';
import offre3 from '../images/offre3.jpeg';
import animated from '../images/animatedimage.png';

const slides = [
  {
    id: 1,
    src: offre1,
    alt: 'Image 1',
    title: 'Promo',
    subtitle: 'عرض الجو',
    description: '100% Bonus كل إثنين و خميس',
    buttonText: 'Découvrir',
    price: '54د.ت', // Example of price
    offer: '75 Go', // Example of offer
  },
  {
    id: 2,
    src: offre2,
    alt: 'Image 2',
    title: 'Promo',
    subtitle: 'عرض الجو',
    description: '100% Bonus كل إثنين و خميس',
    buttonText: 'Découvrir',
    price: '54د.ت',
    offer: '75 Go',
  },
  {
    id: 3,
    src: offre3,
    alt: 'Image 3',
    title: 'Promo',
    subtitle: 'عرض الجو',
    description: '100% Bonus كل إثنين و خميس',
    buttonText: 'Découvrir',
    price: '54د.ت',
    offer: '75 Go',
  },
  {
    id: 4,
    src: animated,
    alt: 'Image 4',
    title: 'Promo',
    subtitle: 'عرض الجو',
    description: '100% Bonus كل إثنين و خميس',
    buttonText: 'Découvrir',
    price: '54د.ت',
    offer: '75 Go',
  },
];

const Arrow = ({ onClick, icon }) => (
  <IconButton
    onClick={onClick}
    icon={icon}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="white"
    _hover={{ bg: 'gray.600', color: 'white' }}
    _active={{ bg: 'gray.800' }}
    size="md"
  />
);

const AnimatedOffers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <Arrow icon={<ChevronRightIcon boxSize={6} />} />,
    prevArrow: <Arrow icon={<ChevronLeftIcon boxSize={6} />} />,
  };

  return (
    <Box bg="black" py={5}>
      <Center>
        <Box width="100%" maxWidth="1200px" mx="auto" position="relative">
          <Slider {...settings}>
            {slides.map((slide) => (
              <Box key={slide.id} position="relative">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width="100%"
                  height="auto"
                  objectFit="cover"
                />
                <Stack
                  position="absolute"
                  top="30%"
                  left="10%"
                  transform="translateY(-30%)"
                  spacing={2}
                  color="white"
                >
               
                 
                </Stack>
              </Box>
            ))}
          </Slider>
        </Box>
      </Center>
    </Box>
  );
};

export default AnimatedOffers;
