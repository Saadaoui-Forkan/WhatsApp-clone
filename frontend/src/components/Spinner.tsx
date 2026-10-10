type SpinnerProps = {
  small?: boolean;
  size?: "sm" | "md" | "lg";
}

const Spinner = ({ small, size = "md" }: SpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-1.5",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  return (
    <div className={`flex justify-center items-center ${small ? "my-4" : "fixed inset-0 bg-black/30 z-50"}`}>
      <span className={`animate-spin rounded-full border-primary-600 border-t-transparent border-r-transparent ${sizeClasses[size]}`} />
    </div>
  );
};

export default Spinner;