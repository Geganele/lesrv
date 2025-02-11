
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  onPrevious: (e?: React.MouseEvent) => void;
  onNext: (e?: React.MouseEvent) => void;
  altText: string;
}

export const ImageGallery = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
  altText,
}: ImageGalleryProps) => {
  return (
    <div className="relative">
      <img 
        src={images[currentIndex]} 
        alt={altText} 
        className="w-full h-48 object-cover transition-opacity duration-300"
      />
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPrevious(e);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNext(e);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
