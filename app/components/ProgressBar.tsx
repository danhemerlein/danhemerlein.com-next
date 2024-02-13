import { useEffect, useState } from 'react'

const ProgressBar = ({ current, target }) => {
  const [width, setWidth] = useState(0)
  const p = (current / target) * 100

  useEffect(() => {
    if (p >= 100) {
      setWidth(100)
    } else {
      setWidth(p)
    }
  }, [p])

  return (
    <div className="mt-4 max-w-[200px]">
      <div className="relative mx-auto h-4 max-w-[200px] border border-solid border-ink bg-reverse ">
        <div
          style={{
            width: `${p}%`,
          }}
          className="absolute left-0 top-0 h-full bg-ink"
        ></div>
      </div>
      <p className="mt-2 text-center">
        {current} / {target}
      </p>
    </div>
  )
}

export default ProgressBar
