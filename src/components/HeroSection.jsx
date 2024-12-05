/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */


const HeroSection = ({title,description,imageUrl}) => {
  return (
        <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
        {/* Background Image */}
        {/* <div className="relative h-[500px] w-full">
        </div> */}
          <img 
            src={imageUrl??'https://img.freepik.com/premium-photo/3d-illustration-purple-retro-headphones-purple-isolated-background-white-lights-headphone-icon-illustration_116124-7777.jpg'}
            alt="Background image"
            layout="fill"
            objectfit="cover"
            className="absolute top-0 left-0 bottom-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className=' absolute flex inset-0 items-center justify-center'>
          <div className="flex flex-col justify-center items-center max-w-[20rem]">
            <h1 className="text-white text-2xl md:text-5xl font-semibold">{title}</h1>
            <p className='text-white text-center mt-2 text-medium md:text-lg'>{description}</p>
          </div>
          </div>
        
        {/* Wave SVG at the bottom */}
        {/* <div className="absolute h-[15rem] bottom-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EC6A04" fillOpacity="1" d="M0,64L26.7,80C53.3,96,107,128,160,128C213.3,128,267,96,320,106.7C373.3,117,427,171,480,170.7C533.3,171,587,117,640,112C693.3,107,747,149,800,160C853.3,171,907,149,960,122.7C1013.3,96,1067,64,1120,48C1173.3,32,1227,32,1280,42.7C1333.3,53,1387,75,1413,85.3L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
        </div> */}
      </div>
  )
}

export default HeroSection