const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();


const faqsDB = prisma.faq;

const createFaqs = async (req, res, next) => {
    const { answer, question, type } = req.body;

    try {
        const newFaq = await faqsDB.create({
            data: {
                answer: answer,
                question: question,
                type: type.toUpperCase()
            }
        })
        res.status(201).json({
            message: "Successfully uploaded FAQ",
            data: newFaq
        })
    } catch (error) {
        next(error);
    }
}

const fetchFaqs = async (req, res, next) => {
    try {
        const Faqs = await faqsDB.findMany();

        res.status(200).json({
                message: "successfull fetched all faqs",
                data: Faqs
            }
        )
    } catch (error) {
        next(error);
    }
}


const fetchSingleFaq = async (req, res, next) => {
    const { id } = req.params; 

    try {
        const faq = await faqsDB.findUnique({
            where: {
                id: id
            }
        });

        if (faq) {
            res.status(200).json({
                data: faq
            })
        } else {
            res.status(404).json({
                error: "No faq with the specified id"
            })
        }
        } catch(error) {
            next(error);
        }
    
}

const updateFaq = async (req, res) => {
    const {answer, question, type } = req.body;

    try {
        let data = {}

        if (answer) data.answer = answer;
        if (question) data.question = question;
        if(type) data.type = type.toUpperCase();

        if (Object.keys(data).length === 0) {
            return res.status(204).json("No data was found for update");
        }

        const updatedData = await faqsDB.update({
            where: {
                id: req.params.id
            },
            data: data
        })

        res.status(200).json({
            message: "Data updated successfully",
            data: updatedData
        });
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}


const deleteFaq = async (req, res, next) => {
    
    try {
        const deletedFaq = await faqsDB.delete({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            message: "Successfully deleted faq",
            data: deletedFaq
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createFaqs,
    fetchFaqs,
    fetchSingleFaq,
    updateFaq,
    deleteFaq
}