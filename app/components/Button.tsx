interface ButtonProps {
  cta: string
  styles?: string
}

const Button = ({ cta, styles }: ButtonProps) => (
  <button
    className={`border border-solid border-ink px-[30px] py-[10px] transition-colors hover:border-red hover:text-red focus:border-red focus:text-red focus:outline-none ${styles}`}
  >
    <span className="text-base">{cta}</span>
  </button>
)
export default Button
