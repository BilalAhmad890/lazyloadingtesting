import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageGalleryProps {
  mainImage: string;
  productTitle: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ mainImage, productTitle }) => {
  // For demo purposes, we'll create an array of the same image
  // In a real application, you would have multiple product images
  const images = [mainImage, mainImage, mainImage];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    arrows: true,
    className: "w-full rounded-lg overflow-hidden bg-white shadow-sm"
  };
  
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={`${productTitle} - pic${index + 1}`} className="outline-none">
            <img 
              src={image} 
              alt={`${productTitle} - pic${index + 1}`}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageGallery;