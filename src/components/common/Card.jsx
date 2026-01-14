import clsx from 'clsx';

const Card = ({ 
  children, 
  className = '',
  gradient = false,
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl p-6 transition-all duration-300',
        gradient 
          ? 'bg-gradient-blue text-white shadow-lg' 
          : 'bg-white shadow-card',
        hover && 'hover:shadow-card-hover transform hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
