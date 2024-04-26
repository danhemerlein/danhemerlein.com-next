import { codeProjects } from './header-data'

const NewCode = () => (
  <div className="grid grid-cols-4 gap-10">
    <div className="min-h-[128px] border border-l-0 border-r-0 border-solid py-2">
      <span className="text-4xl uppercase">code</span>
      <p className="text-base lowercase">
        Web Engineering, Tech Leadership, Passion Projects
      </p>
    </div>

    {codeProjects.map((project, index) => {
      return (
        <div
          key={index}
          className="flex min-h-[128px] border border-l-0 border-r-0 border-solid py-2"
        >
          <div>
            <img src="" alt="" />
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-base uppercase">{project.job}</p>
                <div className="mt-3 text-sm uppercase">{project.subLabel}</div>
              </div>
              <p className="text-sm">{project.description}</p>
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

NewCode.propTypes = {}

export default NewCode
