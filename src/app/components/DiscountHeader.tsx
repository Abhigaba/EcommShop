import React from 'react'

const DiscountHeader = () => {
  return (
<div className="w-full inset-x-0 top-0 z-50">
    <div className="bg-teal-600">
        <div className="mx-auto max-w-7xl py-2 px-3 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between lg:flex-row lg:justify-center">
                <div className="flex flex-1 items-center lg:mr-3 lg:flex-none">
                    <p className="ml-3 text-center font-medium text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                            stroke="currentColor" aria-hidden="true" className="mr-2 hidden h-6 w-6 lg:inline">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z">
                            </path>
                        </svg>
                        <span className="font-black">Buy 3</span> or more to get <span className="font-black">10% off</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DiscountHeader