export default function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow-md m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-between flex-col md:flex-row md:items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              MyEcommerce™
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your trusted partner in online shopping. © 2024
            </p>
          </div>
          <div className="">
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Get exclusive offers and updates!
              </p>
              <form className="flex flex-col md:flex-row items-center justify-between">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 mb-2 md:mb-0 md:mr-4"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
