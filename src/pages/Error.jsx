import err from '../assets/error.png'

const Error = () => {
    return (
        <div className="h-full">
            <img src={err} className='w-80 mx-auto flex mt-15' alt="" />
            <h1 className="text-center text-6xl mt-5">Smile Please!</h1>
        </div>
    )
}

export default Error