import Hero from "../Components/Hero";
import Statements from "../Components/Statements";
import ViceChancellor from "../Components/ViceChancellor";
import About from "../Components/About";
import Tour from "../Components/Tour";
import Events from "../Components/Events";
import CardComponent from "../Components/CardComponent";
import { facultyData } from "../Data/faculty.js"
import testimonyData from "../Data/testimonial.json"
import VideoComponent from "../Components/VideoComponent";
import {communityData} from "../Data/communities.js" 
import PhotoGallery from "../Components/PhotoGallery";
import { MetaHelmet } from '../Components/PageAttributes';



const HomePage = () => {
  return (
    <>
    <MetaHelmet title="Home" />

    <div className="">
      <Hero />
      <ViceChancellor />
      <PhotoGallery />
      <div className="hidden md:block">
      <Statements />
      </div>
      
      <CardComponent address="services/faculty" data={facultyData} />
      <VideoComponent address="services/testimony" data={testimonyData} />
      <About />   
      <Events/>     
      <Tour />
      <CardComponent address="services/community" data={communityData} />
    </div>
    </>
  );
};

export default HomePage;
