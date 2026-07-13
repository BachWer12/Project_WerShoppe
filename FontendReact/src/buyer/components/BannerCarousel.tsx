import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const bannerImages = [
    "https://picsum.photos/1200/350?random=1",
    "https://picsum.photos/1200/350?random=2",
    "https://picsum.photos/1200/350?random=3",
    "https://picsum.photos/1200/350?random=4",
  ]

  return (
    <div className="pt-8">
      <div className="container mx-auto px-4 flex gap-2 h-[235px]">
        {/* Main Carousel */}
        <div className="w-[66.666%] h-full">
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full group"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="h-full">
              {bannerImages.map((src, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="h-full w-full rounded-sm overflow-hidden bg-muted">
                    <img
                      src={src}
                      alt={`Banner ${index + 1}`}
                      className="object-cover w-full h-[235px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        </div>

        {/* Side Banners */}
        <div className="w-[33.333%] h-full flex flex-col gap-2">
          <div className="h-[113.5px] w-full rounded-sm overflow-hidden bg-muted">
            <img
              src="https://picsum.photos/600/175?random=5"
              alt="Side Banner 1"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="h-[113.5px] w-full rounded-sm overflow-hidden bg-muted">
            <img
              src="https://picsum.photos/600/175?random=6"
              alt="Side Banner 2"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
