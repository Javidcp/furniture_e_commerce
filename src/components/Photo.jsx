import img1 from '../assets/photos/img-1.jpg'
import img2 from '../assets/photos/img-2.jpg'
import img3 from '../assets/photos/img-3.jpg'
import img4 from '../assets/photos/img-4.jpg'
import img5 from '../assets/photos/img-5.jpg'
import img6 from '../assets/photos/img-6.jpg'
import img7 from '../assets/photos/img-7.jpg'
import img8 from '../assets/photos/img-8.jpg'
import img9 from '../assets/photos/img-9.jpg'
import Masonry from 'react-masonry-css'

const images = [img1, img2, img3, img4, img5, img7, img6, img8, img9];

const Photo = () => {
    return (
        <div className="mx-10 md:mx-20 my-20">
            <h2 className='text-center text-2xl md:text-4xl font-bold my-8'>Gallery</h2>
            <Masonry
                breakpointCols={{ default: 3, 1024: 2, 768: 1 }}
                className="flex gap-2.5"
                columnClassName="flex flex-col gap-2.5"
                >
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`image-${index}`} className="w-full" />
                ))}
            </Masonry>
        </div>

    )
}

export default Photo