type SpinnerProps = {
  small: boolean
}

const Spinner = ({ small }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center mx-auto">
      <span
        className={`animate-spin rounded-full ${
          small
            ? "h-5 w-5 border-white  border-t-2 border-r-2"
            : "h-24 w-24 border-blue-500  border-t-4 border-r-4"
        }`}
      ></span>
    </div>
  )
}

export default Spinner