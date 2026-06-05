import starFill from '@/assets/star-fill.svg';
import starOutline from '@/assets/star-outline.svg';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const StarRating = ({ rating, onChange, readonly = false }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className="h-8 w-8 disabled:cursor-default"
        >
          <img
            src={star <= rating ? starFill : starOutline}
            alt={`${star}점`}
            className="h-full w-full"
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
