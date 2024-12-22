export default () => {
    return (
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                    <h3 className="text-indigo-600 font-semibold">
                        500 Error
                    </h3>
                    <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                        Internal Server Error
                    </p>
                    <p className="text-gray-600">
                        Sorry, something went wrong and we will be looking into it.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href="/dashboard" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg">
                            Dashboard
                        </a>
                        <a href="javascript:void(0)" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                        <div className="flex items-center gap-x-2">
                            Contact support
                            <span className="text-xs bg-green-100 text-green-600 rounded-full px-2 py-1">
                                Coming Soon
                            </span>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}