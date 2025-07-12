import Hero from "../Components/Hero";
import Statements from "../Components/Statements";
import ViceChancellor from "../Components/ViceChancellor";
import About from "../Components/About";
import Tour from "../Components/Tour";
import Events from "../Components/Events";
import CardComponent from "../Components/CardComponent";
import testimonyData from "../Data/testimonial.json";
import VideoComponent from "../Components/VideoComponent";
import PhotoGallery from "../Components/PhotoGallery";
import { MetaHelmet } from "../Components/PageAttributes";
import useCampus from "../hooks/useCampus.js";

const HomePage = () => {
    const { useFaculties, useCommunities } = useCampus();

    const {
        data: facultyData,
        isLoading: facultyLoading,
        error: facultyError,
    } = useFaculties;

    const {
        data: communityData,
        isLoading: communityLoading,
        error: communityError,
    } = useCommunities;

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

                <CardComponent
                    tag="Our Faculties"
                    title="Programs Offered At Olabisi Onabanjo University"
                    address="services/faculty"
                    data={facultyData}
                    loading={facultyLoading}
                    error={facultyError}
                />

                <VideoComponent
                    address="services/testimony"
                    data={testimonyData}
                />

                <About />
                <Events />
                <Tour />

                <CardComponent
                    tag="Our Communities"
                    title="Communities at Olabisi Onabanjo University"
                    address="services/community"
                    data={communityData}
                    loading={communityLoading}
                    error={communityError}
                />
            </div>
        </>
    );
};

export default HomePage;
