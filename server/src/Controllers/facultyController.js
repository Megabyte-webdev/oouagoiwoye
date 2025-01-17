const prismaClient = require("@prisma/client");
const deleteFile = require("../helpers/fileSystem");
const prisma = new prismaClient.PrismaClient();
const { currencyFormatter } = require("../helpers/utils");

const facultyDB = prisma.faculties;

//fetch faculty
const fetchFaculty = async (req, res, next) => {
    try {
        const allFaculties = await facultyDB.findMany({
            include:{
                Contact: true,
                departments: true,
                facultyLecturers: true,
                // admissionReq: true,
                // schoolFee: true
            }
        })
       
        res.status(200).json({
            message: "Faculties data fetched successfully",
            data: allFaculties
        })
    } catch (error) {
        next(error)
    }
}

//update faculty data
const updateFaculty = async (req, res, next) => {
    const { title, deanName, noOfDepartments, body } = req.body;

    const data = {};
    if(title) data.title = title;
    if(deanName) data.deanName = deanName;
    if(noOfDepartments) data.noOfDepartments = noOfDepartments;
    if(body) data.body = body
    if (Object.keys(data).length === 0) res.status(404).json("No data for update");
    try {
        const newData = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data
        });
        res.status(200).json({
            message: "Data updated successfully",
            data: newData
        });
    } catch (error) {
        next(error)
    }
} 

//update faculty image
const updateFacultyImage = async (req, res, next) => {
    const reqImg = req.file;
    try {
        const prevdata = await facultyDB.findUnique({
            where: {
                id: req.params.id
            }
        })
        const previmg = prevdata.image;

        const newImage = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data: {
                image: reqImg?.filename
            }
        })
        deleteFile(`public/uploads/${previmg}`);
        res.status(200).json({
            message: "Image updated successfully",
            data: newImage
        })
    } catch (error) {
        next(error)
    }
};

//upsert banner video
const upsertBannerimage = async (req, res, next) => {
    const reqBannerImg = req.file;
    try {
        const prevData = await facultyDB.findUnique({
            where: {
                id: req.params.id
            }
        })
        const prevBanner = prevData.bannerImage;

        const newBanner = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data:{
                bannerImage: reqBannerImg?.filename
            }
        });
        deleteFile(`public/uploads/${prevBanner}`)
        res.status(200).json({
            message: "successfully updated faculty banner",
            data: newBanner
        });

    } catch (error) {
        next(error)
    }
}
//update dean image
const updateDeanImg = async (req, res, next) =>{
    const imageName = req.file;
    try {
        const prevdata = await facultyDB.findUnique({
            where: {
                id: req.params.id
            }
        })
        const previmg = prevdata.deanImage;

        
        const newImage = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data: {
                deanImage: imageName?.filename
            }
        })
        
        if(previmg != null ){
            deleteFile(`public/uploads/${previmg}`);
        }
        res.status(200).json({
            message: "successfully updated dean's image",
            data: newImage
        })
    } catch (error) {
       next(error) 
    }  
}


//updating faculty contact
const UpdateFacultyContact = async (req, res, next) => {
    const { whatsapp, facebook, youtube } = req.body;
    try {
        const data = {};
        if(whatsapp) data.whatsapp = whatsapp;
        if(facebook) data.facebook = facebook;
        if(youtube) data.youtube = youtube;
        if(Object.keys(data).length === 0) res.status(400).json("No data to update");
        const updatedData = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data: {
                Contact: {
                    update: data
                }
            },
            include:{
                Contact: true
            }
        })
        res.status(200).json({
            message: "Campus contact updated successfully",
            data: updatedData
        })
    } catch (error) {
        next(error)
    }
}
//creating faculty lecturers
const createFacultyLecturers = async (req, res, next) => {
    const { name, designation } = req.body;
    const imageReq = req.file;
    
    try {

        const data = {};
        if(name) data.name = name;
        if(designation) data.designation = designation;
        if(imageReq) data.image = imageReq?.filename;
        if(Object.keys(data).length === 0) res.status(400).json("No data to update");

        const updated = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data: {
                facultyLecturers: {
                    create: data
                }
            },
            include:{
                facultyLecturers: true
            }
        })
        res.status(200).json({
            message: "Lecturer Added Successfully",
            data: updated
        })
    } catch (error) {
        next
    }
}

//Adding departments in faculty
const addDepartment = async (req, res, next) => {
    const {title, body} = req.body;

    try {
        const newDepartment = await facultyDB.update({
            where: {
                id: req.params.id
            },
            data:{
                departments:{
                    create: {
                        title,
                        image: req.file?.filename,
                        body
                    }
                }
            },
            include: {
                departments: true
            }
        })
        res.status(200).json({
            message: "Department successfully added",
            data: newDepartment
        })
    } catch (error) {
        next(error)
    }
}

//adding admission requirements
const createAdmissonRequirements = async (req, res, next) => {
    const { course, utmeReq, olevelReq, DEReq } = req.body;
    const { id } = req.params;
    try {
        const data = {};
        if(course) data.course = course;
        if(utmeReq) data.utmeReq = utmeReq.split('#');
        if(olevelReq) data.olevelReq = olevelReq.split('#');
        if(DEReq) data.DEReq = DEReq.split('#');
        if(Object.keys(data).length < 1) res.status(404).json("Enter a Value to send");

        const newRequirements = await prisma.faculties.update({
            where: {
                id: id
            },
            data: {
                admissionReq: {
                create: data
                }
            },
            include: {
                admissionReq: true
            }
        });
        res.status(200).json({
            message: "Added Admission requirements",
            data: newRequirements
        })
    } catch (error) {
        next(error)
    }
};

// creating school fee
const creatScchoolFee = async (req, res, next) => {
    const { course, acceptanceFee, admissionSchFee, returningSchFee } = req.body;
    const { id } = req.params;

    const data = {};
    try {
        if(course) data.course = course;
        if(acceptanceFee) data.acceptanceFee = currencyFormatter(acceptanceFee);
        if(admissionSchFee) data.admissionSchFee = currencyFormatter(admissionSchFee);
        if(returningSchFee) data.returningSchFee = currencyFormatter(returningSchFee);
        if(Object.keys(data).length < 1) res.status(404).json("Add a data to continue");
        
        const newSchoolFees = await prisma.faculties.update({
            where: {
                id: id
            },
            data: {
                schoolFee: {
                    create: data
                }
            },
            include: {
                schoolFee: true
            }
        });
        res.status(200).json({
            message: "Successfully added course school fee",
            data: newSchoolFees
        });

    } catch (error) {
        next(error);
    }
} 

//deleting faculties
const deleteFaculties = async (req, res, next) => {
    try {
        const facultyData = await prisma.faculties.findUnique({
            where: {
                id: req.params.id
            },
            include:{
                facultyLecturers: true,
                departments: true
            }
        });

        const facultyImg = facultyData.image;
        const facultyDeanImg = facultyData.deanImage;
        const facultyBanner = facultyData.bannerImage;

        facultyImg !== null ? deleteFile(`public/uploads/${facultyImg}`) : '';
        facultyDeanImg !== null ? deleteFile(`public/uploads/${facultyDeanImg}`) : '';
        facultyBanner !== null ? deleteFile(`public/uploads/${facultyBanner}`) : '';

        let departmentImages = [];
        let lecturerImages = [];

        function deleteMisc(){
            if(facultyData.departments.length !== 0){
                for(const dep of facultyData.departments){
                    departmentImages = facultyData.departments.map(item => ({image: item.image}))
                }
            }
            if (facultyData.facultyLecturers.length !== 0) {
                for(const lec of facultyData.facultyLecturers){
                    lecturerImages = facultyData.facultyLecturers.map(item => ({image: item.image}))
                }
            }
            // console.log("success", departmentImages, lecturerImages);
            
            for(const data of departmentImages){
                if (data.image !== null) {
                    data.image !== null ? deleteFile(`public/uploads/${data.image}`) : '';
                }
            }
            for(const data of lecturerImages){
                if (data.image !== null) {
                    data.image !== null ? deleteFile(`public/uploads/${data.image}`) : '';

                }
            }
        }
        deleteMisc();

        const deleteFaculty = await facultyDB.delete({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            message: "deleted successfully",
            data:  deleteFaculty
        }) 
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchFaculty,
    updateFaculty,
    updateFacultyImage,
    upsertBannerimage,
    updateDeanImg,
    UpdateFacultyContact,
    createFacultyLecturers,
    addDepartment,
    createAdmissonRequirements,
    creatScchoolFee,
    deleteFaculties
}