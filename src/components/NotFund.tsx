
import { Link } from 'react-router-dom'
import './NotFund.css'

function NotFound() {
    return (
        <div className="notfund container text-center w-full flex-col" >
            <div className='p-2 my-2'> <h1 className='text-9xl'>404</h1></div>
            <div className='p-2 text-4xl my-2'>Ooops! That page can not be found.</div>
            <div className="p-2 my-2"> <p>We’re sorry, but we can’t seem to find the page which you requested. </p>
                <p>This might be because you have typed the web address incorrectly. </p>
            </div>
            <div className='flex items-center justify-center my-5  '>

                <div className='p-2 border-2 border-orange-500 rounded-full w-20 text-orange-500    hover:bg-orange-500' ><Link className=' hover:text-slate-50' to='/'>Home</Link></div>
            </div>
        </div>
    )
}
export default NotFound