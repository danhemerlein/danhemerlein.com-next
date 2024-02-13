const LoadMoreButton = ({ handleLoadMore, allLoaded }) => {
  console.log('all loaded', allLoaded)

  return (
    <button
      className="border border-solid border-ink bg-ink px-4 py-2 text-reverse transition-colors hover:bg-reverse hover:text-ink disabled:cursor-not-allowed disabled:bg-red disabled:text-ink"
      onClick={handleLoadMore}
      disabled={allLoaded}
    >
      load more
    </button>
  )
}

export default LoadMoreButton
