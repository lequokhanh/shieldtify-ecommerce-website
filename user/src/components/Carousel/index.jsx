import { Box, Image } from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { carouselImages } from '../../Categories'

const PCCarousel = () => {
    return (
        <Carousel 
        showArrows={false}
        showStatus={false}
        autoPlay={true} 
        infiniteLoop={true}
        width="600px"
        >
          {
            carouselImages.map((image) => (
              <Box   key={image.id} >
                <Image src={image.url} />
              </Box>
            ))
          }
        </Carousel>
    )
}

export default PCCarousel;