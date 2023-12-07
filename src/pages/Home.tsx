export default function home() {
  return (
    <div
      className='relative overflow-hidden before:absolute before:top-0 before:start-1/2'>
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10'>
        <div className='mt-5 max-w-2xl text-center mx-auto'>
          <h1 className='block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200'>
            Let's Build
            <span
              className='bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent'>Together</span>
          </h1>
        </div>

        <div className='mt-5 max-w-3xl text-center mx-auto'>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  )
}
