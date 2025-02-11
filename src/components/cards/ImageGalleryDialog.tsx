
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  altText: string;
}

export const ImageGalleryDialog = ({
  isOpen,
  onOpenChange,
  images,
  currentIndex,
  onPrevious,
  onNext,
  altText,
}: ImageGalleryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 bg-black/90">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-white hover:text-gray-300 transition-colors z-50"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative aspect-video">
          <img
            src={images[currentIndex]}
            alt={altText}
            className="w-full h-full object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
