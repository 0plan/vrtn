const Footer = () => {
  return (
    <footer className='w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto'>
      <div className='text-center'>
        <div className='mt-3 space-x-2'>

          <a
            className='inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800'
            href='https://github.com/chlee125/vite-react-typescript-template' target='_blank'>
            <div className={'i-mdi:github text-2xl flex-shrink-0 w-3.5 h-3.5'} />
          </a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
