import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import FallbackComponent from "./utils/FallbackComponent";
import ProtectedRoute from "./utils/ProtectRoutes";

// Lazy loaded components
const NavBar = lazy(() => import("./Components/Nav/useContext"));
const Footer = lazy(() => import("./Components/Footer"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const Campus = lazy(() => import("./Pages/services/Campus"));
const CampusElement = lazy(() => import("./Pages/services/CampusElement"));
const PrincipalOfficers = lazy(() =>
    import("./Pages/administration/PrincipalOfficers")
);
const POfficers = lazy(() => import("./Pages/administration/POfficers"));
const Administration = lazy(() =>
    import("./Pages/administration/Administration")
);
const AAdministration = lazy(() =>
    import("./Pages/administration/AAdministration")
);
const AdminDash = lazy(() => import("./Admin/AdminDash"));
const AllFaculty = lazy(() => import("./Pages/faculties/AllFaculty"));
const Faculty = lazy(() => import("./Pages/faculties/Faculty"));
const ContinuingEducation = lazy(() =>
    import("./Pages/services/ContinuingEducation")
);
const ContinuingEducationElement = lazy(() =>
    import("./Pages/services/ContinuingEducationElement")
);
const Directorates = lazy(() => import("./Pages/services/Directorates"));
const DirectoratesElement = lazy(() =>
    import("./Pages/services/DirectoratesElement")
);
const NoPageFound = lazy(() => import("./Pages/NoPageFound"));
const Admissions = lazy(() => import("./Pages/admissions/Admissions"));
const Admission = lazy(() => import("./Pages/admissions/Admission"));
const Login = lazy(() => import("../src/Admin/Auth/Login"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<FallbackComponent />}>
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Administration Routes */}
                    <Route
                        path="/administration/admin"
                        element={<Administration />}
                    />
                    <Route
                        path="/administration/admin/:id"
                        element={<AAdministration />}
                    />
                    <Route
                        path="/administration/principal-officers"
                        element={<PrincipalOfficers />}
                    />
                    <Route
                        path="/administration/principal-officers/:id"
                        element={<POfficers />}
                    />

                    {/* Services Routes */}
                    <Route path="/services/campus" element={<Campus />} />
                    <Route
                        path="/services/campus/:id"
                        element={<CampusElement />}
                    />
                    <Route path="/services/faculty" element={<AllFaculty />} />
                    <Route path="/services/faculty/:id" element={<Faculty />} />
                    <Route
                        path="/services/continuing"
                        element={<ContinuingEducation />}
                    />
                    <Route
                        path="/services/continuing/:id"
                        element={<ContinuingEducationElement />}
                    />
                    <Route
                        path="/services/directorate"
                        element={<Directorates />}
                    />
                    <Route
                        path="/services/directorate/:id"
                        element={<DirectoratesElement />}
                    />

                    {/* Admin CMS Routes */}
                    <Route path="/admin/auth" element={<Login />} />

                    {/* Protected Admin Routes with Nested Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/admin-ict/oouagoiwoye-9g4c4h8sh/*"
                            element={<AdminDash />}
                        />
                    </Route>

                    {/* Admissions Routes */}
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/admissions/:id" element={<Admission />} />

                    <Route path="/*" element={<NoPageFound />} />
                </Routes>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
