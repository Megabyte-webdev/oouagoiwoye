const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const campusDB = prisma.campus;


const createCampus = async (req, res) => {
    const { title, video, campusInfo, campusContact, faculties} = req.body;
    const {image} = req.file.filename;
    try {
        const newCampus = await campusDB.create({
            data: {
                title: title,
                image: image,
                video: video,
                campusInfo: campusInfo,
                campusContact: {
                    create: campusContact
                },
                faculties: {
                    create: [
                        ...faculties
                    ]
                }
            }
        })
        res.status(200).json({
            message: "Campus created successfully",
            data: newCampus
        })
    } catch (error) {
        
    }
}