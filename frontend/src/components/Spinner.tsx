type SpinnerProps = {
  small?: boolean
}

const Spinner = ({ small }: SpinnerProps) => {
  if (small) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <span className="animate-spin rounded-full h-5 w-5 border-white border-t-2 border-r-2"></span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <span className="animate-spin rounded-full h-24 w-24 border-teal-500 border-t-4 border-r-4"></span>
    </div>
  );
}

export default Spinner