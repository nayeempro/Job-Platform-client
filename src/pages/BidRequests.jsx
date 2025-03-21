import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import axios from "axios"
import BidReqTable from "../components/BidReqTable"
import useAxiosSecure from "../components/useAxiosSecure"
// import { axiosSecure } from "../components/useAxiosSecure"




const BidRequests = () => {
  const { user } = useContext(AuthContext)
  // use custom hook
  const axiosSecure = useAxiosSecure()
  
  const [bids, setBids] = useState([])
  useEffect(() => {
    fetchAllBids()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const fetchAllBids = async () => {
    const { data } = await axiosSecure.get(`/bids/${user?.email}?buyer=true`)
    setBids(data)
  }
  // handle status
  const handleStatus = async(id,prevStatus,status)=>{
    console.table({id,prevStatus,status})
    if(prevStatus===status || status==="Completed") {
      return console.log("Not Allowed")
    }

    try{
      const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/bid-status-update/${id}`, {status})
      fetchAllBids()
      console.log(data)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <section className='container px-4 mx-auto my-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {bids.length} Requests
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Email</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Category
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Status
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {bids.map(bid=> <BidReqTable key={bid._id} handleStatus={handleStatus} bid={bid} />)}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BidRequests
