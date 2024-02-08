import cn from 'classnames'

import MusicKey from './MusicKey'

const Music = ({ allMusicProjects }) => {
  return (
    <>
      <h2 className="my-4 flex font-extrabold">music</h2>

      <MusicKey />

      {allMusicProjects.map((project, key) => {
        const { wrote, produced, performed, title, artist, releaseDate } =
          project
        return (
          <div
            className={cn(
              'flex items-start justify-between gap-2 border-b border-l border-r border-solid border-ink px-4 py-2 first-of-type:border-t',
              key === 0 && 'border-t',
            )}
            key={project.sys.id}
          >
            <div>
              <h3 className="my-2 font-bold">{title}</h3>
              <p>
                <span className="italic">by</span>
                &nbsp;{artist}&nbsp;
                <span>
                  <span className="italic">released</span>
                  &nbsp;{releaseDate}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              {wrote && <div className="h-4 w-4 rounded-full bg-red"></div>}
              {produced && (
                <div className="bg-vin-rouge h-4 w-4 rounded-full bg-vinRouge"></div>
              )}
              {performed && (
                <div className="h-4 w-4 rounded-full bg-lochmara"></div>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Music
