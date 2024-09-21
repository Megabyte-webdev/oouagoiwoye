import assets from '../assets/assets'

const Testimonials = ({ theme }) => {
  return (
    <div>
        <section className={`p-10 lg:p-20 ${theme && theme}  bg-blue-100`}>
            <article>
                <div className='flex flex-row items-center justify-center bg-slate-300 w-40 p-1'>
                    <i className='bx bx-buildings mr-1 text-xl text-blue-800'></i>
                    <h5 className="text-xl font-semibold text-blue-800">Testimonial</h5>
                </div>
                {/* <h5 className="section-label"></h5> */}
                <h2 className="text-xl lg:text-3xl my-3 font-bold">Let's hear what our <br />students have to say about OOU.</h2>
                {/* <h2 className="main-heading"> </h2> */}
            </article>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <section className="">
                    <img src={assets.group19} alt="hero-img-large" />
                    
                </section>
                <section className="">
                    <img src={assets.group20} alt="hero-img-large" />

                </section>
                <section className="">
                    <img src={assets.group19} alt="hero-img-large" />
        
                </section>
            </div>

        </section>
    </div>
  )
}

export default Testimonials