import React from 'react'

const HeadImage = () => {
  return (
    <div className="bg-transparent">
  <div
    className="bg-center bg-no-repeat rounded-3xl bg-cover w-full h-[90vh] flex items-center justify-center fold:justify-start"
    style={{
      backgroundImage: `
        linear-gradient(180deg, rgba(0, 132, 214, 0.5), rgba(0, 0, 0, 0.7)),
        url(https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/home-new-bg-free-img.jpg)
      `,
    }}
  >
    <div className="flex flex-col gap-6 text-center fold:text-left mt-24 fold:mt-0">
    <h1 className="text-white  fold:px-10 w-full font-bold text-5xl fold:text-6xl fold:w-9/12 leading-[4rem] fold:leading-[5rem]">
      Raining offers For Hot Summer!
    </h1>

    <p className="text-white px-10 font-semibold text-2xl fold:w-1/2 leading-normal">
    25% Off On All Products
    </p>

    <div className="flex flex-col fold:flex-row gap-3 px-10">
      <button className="bg-white rounded-xl w-full fold:w-32 h-10 text-black hover:bg-black hover:text-white duration-700">Shop Now</button>
      <button className="bg-transparent rounded-xl text-white border border-white w-full fold:w-32 h-10 hover:text-black hover:bg-white duration-700">Find More</button>
    </div>
    </div>
  </div>
</div>
  )
}

export default HeadImage