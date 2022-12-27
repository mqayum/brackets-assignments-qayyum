import {BiBox, BiSupport, BiSmile, BiUserCheck} from "react-icons/bi"
const HighlightedServices = () => {
  return (
      <>
          <div className="w-full py-10 lg:h-32 flex justify-center flex-wrap items-center">
              <div className="w-1/2 lg:w-1/4 flex justify-center flex-col lg:flex-row gap-5 items-center">
                  <BiBox className="text-4xl"/>
                  <div className="flex justify-center flex-col items-center">
                      <h6 className="font-bold text-center">Free Shipping</h6>
                      <p className="text-center">All over the Pakistan</p>
                  </div>
              </div>
              <div className="w-1/2 lg:w-1/4 flex justify-center flex-col lg:flex-row gap-5 items-center">
                  <BiSupport className="text-4xl"/>
                  <div className="flex justify-center items-center flex-col ">
                      <h6 className="font-bold text-center">Customer Support</h6>
                      <p className="text-center">24/7 available service </p>
                  </div>
              </div>
              <div className="w-1/2 lg:w-1/4 flex justify-center flex-col lg:flex-row gap-5 items-center">
                  <BiSmile className="text-4xl"/>
                  <div className="flex justify-center items-center flex-col ">
                      <h6 className="font-bold text-center">Customer Satisfaction</h6>
                      <p className="text-center">10K+ completed orders</p>
                  </div>
              </div>
              <div className="w-1/2 lg:w-1/4 flex justify-start flex-col lg:flex-row gap-5 items-center">
                  <BiUserCheck className="text-4xl"/>
                  <div className="flex justify-center items-center flex-col">
                      <h6 className="font-bold text-center">Verified Vendors</h6>
                      <p className="text-center">Multi Vendor Services</p>
                  </div>
              </div>
          </div>
      </>
  )
}
export default HighlightedServices