//
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels
//
import clsx from 'clsx'

function Tag({ label, children, rounded = false, className, size = "medium", ...otherProps }) {
  return (
    <div
      className={clsx(
        `font-semibold inline-block uppercase rounded select-none last:mr-0 items-center`,
        'border-solid ', // in case we want it custom with a border
        {
          "rounded-full": rounded,
          "py-1 px-2 text-xs": size === "medium",
          "py-0.5 px-2 text-2xs": size === "small",
        },
        className
      )}
      {...otherProps}
    >
      <div className='flex items-center'>
        {children || label}
      </div>
    </div>
  );
}

export default Tag;
