/* eslint-disable no-unused-vars */
import assets from '../assets/assets'

const Hero = () => {
  return (
    <header className="hero-section p-5 md:p-10 my-3">
      {/* <img className="rounded-3xl object-cover" src={assets.hero_img} alt="hero-img" /> */}
      <div className='w-full h-full rounded-3xl relative' style={{ backgroundImage: `url(${assets.hero_img})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className='absolute top-0 bottom-0 left-0 w-full h-full rounded-3xl bg-gradient-to-r from-[#000000b5] from-50 to-transparent z-0' />
        <div className='absolute bottom-0 left-0 pl-5 lg:pl-10 pb-5 lg:pb-10'>

          <img src={assets.welcome_img} className='w-4/5 lg:w-full' alt="welcome-image" />
          <img className="absolute w-8 lg:w-12 top-0 lg:top-1 right-24 lg:right-12" src={assets.union} alt="Union" />
          <img className="absolute w-12 lg:w-24 bottom-7 lg:bottom-12 right-28 lg:right-12" src={assets.rectangle} alt="Rectangle" />
        </div>

      </div>
    </header>
  )
}

export default Hero;
