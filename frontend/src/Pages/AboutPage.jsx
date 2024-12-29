import React from 'react'
import About from '../Components/About'
import ViceChancellor from '../Components/ViceChancellor'
import Statements from '../Components/Statements'
import assets from '../assets/assets'
const AboutPage = () => {
  return (

    <div className="bg-gray-100 text-gray-900 py-12">
      {/* Hero Section */}
      <section style={{ "backgroundImage": `url(${assets.faculty})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="bg-center min-h-80 flex items-center justify-center bg-blue-900 p-5">
        <div className="bg-black bg-opacity-50 text-center text-white py-10 px-6 rounded-md min-h-28">
          <h2 className="text-4xl font-bold mb-4">About Olabisi Onabanjo University</h2>
          <p className="text-lg">Discover Our Rich History and Vision for the Future.</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 bg-white px-5">
        <div className="">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Journey Through Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
              <p className="text-lg leading-relaxed">
                Established in 1982, Olabisi Onabanjo University has been a beacon
                of academic excellence. Over the years, we have grown to become a leading institution
                in Nigeria, producing world-class graduates and fostering innovation.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Situated in the serene town of Ago-Iwoye, the university boasts state-of-the-art facilities
                and a conducive learning environment. With a commitment to academic rigor and community impact,
                the university has consistently ranked among the top institutions in the country.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Our alumni network spans across the globe, making significant contributions in various sectors,
                including education, healthcare, technology, and the arts. Olabisi Onabanjo University remains
                dedicated to nurturing talent and shaping the future of society.
              </p>
            </div>
            
              <img src={assets?.chief} alt="History" className="rounded-md shadow-md h-[450px] w-full object-fit" />
            
          </div>
        </div>
      </section>

      {/* Detailed History Section */}
      <section className="py-12 bg-gray-50 px-5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">The History of Olabisi Onabanjo University</h2>
          <div className="text-lg leading-relaxed space-y-6">
            <p>
              On <strong>16th March 1982</strong>, a planning committee led by the renowned <strong>Professor Akinlawon Ladipo Mabogunje</strong> submitted its report. Following this, in <strong>July 1982</strong>, the Ogun State House of Assembly debated and passed a bill to establish Ogun State University. With the assent of the then Civilian Governor of Ogun State, <strong>Chief Olabisi Onabanjo</strong>, on <strong>7th July 1982</strong>, the bill became law.
            </p>
            <p>
              On <strong>Tuesday, 28th September 1982</strong>, the appointment of the pioneer Chairman of Council, the first Vice-Chancellor, and other members of the Provisional Council was announced. The Provisional Council was formally inaugurated on <strong>Thursday, 28th October 1982</strong>.
            </p>
            <p>
              Ogun State University was modeled after the American State University system. It adopted the "land grant" system and was established to address the state's challenges. To ensure state-wide reach, the university was designed as a <strong>multi-campus institution</strong>, with campuses in:
            </p>
            <ul className="list-disc list-inside ml-6">
              <li><strong>Sagamu (Remo):</strong> College of Health Sciences</li>
              <li><strong>Ibogun (Egba):</strong> College of Engineering</li>
              <li><strong>Aiyetoro (Yewa):</strong> College of Agricultural Sciences</li>
              <li><strong>Ago-Iwoye (Ijebu):</strong> Main campus housing Faculties of Arts and Humanities and Natural Sciences</li>
            </ul>
            <p>
              The university opened its doors to its first students on <strong>31st January 1983</strong>, numbering slightly over 500. By <strong>30th January 1987</strong>, the first convocation ceremony was held, graduating <strong>285 students</strong>.
            </p>
            <p>
              Today, Olabisi Onabanjo University operates across its campuses, with over <strong>95% of its academic programs accredited</strong> by the National Universities Commission (NUC). The institution has consistently produced high-quality graduates who lead in solving global challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, and Philosophy */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Guiding Principles</h2>
          <Statements />
        </div>
      </section>

    {/* Core Values Section */}
<section className="py-12 bg-white px-5">
  <div className="mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { value: "Integrity", image: assets.integrity },
        { value: "Excellence", image: assets.excellence },
        { value: "Service", image: assets.service },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 p-6 rounded-md shadow-md text-center flex flex-col items-center"
        >
          <img
            src={item.image}
            alt={item.value}
            className="w-20 h-20 object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-blue-900">{item.value}</h3>
          <p>
            Commitment to {item.value.toLowerCase()} in all aspects of learning,
            research, and service.
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  )
}

export default AboutPage