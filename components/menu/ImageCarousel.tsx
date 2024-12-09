import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'

  interface ImageCarouselProps {
    images: string[];
  }

  const ImageCarousel = ({ images }: ImageCarouselProps) => {
    return (
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image} alt={image} width={250} height={250} className={'object-contain size-[250px] mx-auto'}/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    )
  }

  export default ImageCarousel