import React, { useState } from "react"; // Corrected the double semicolon
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        {
            id: 1,
            title: "What is Mayrahkee Africa?",
            content: `Mayrahkee Africa is a one-stop online talent search and human capital recruitment company that provides solutions focused and committed to high performance and professionalism with best ethical business practices.\n\nOur unique culture and values stem from the tenets of our principles on leadership, which allows us to be relentless in our mission of becoming the preferred employer of choice that imbibes and promotes ethical business practices in a safe work environment, which are central to our business decisions.\n\nWe thrive to harness full potentials, increase capacity, productivity and ultimately growth and sustainability through cost effective strategies of all stakeholders in the value chain.`,
        },
        {
            id: 2,
            title: "How do I apply for a job?",
            content:
                "To apply, click on the job title of interest and then follow the instructions in the chosen ad. Then you will be able to apply.",
        },
        {
            id: 3,
            title: "What do I need to access Mayrahkee Africa?",
            content:
                "As long as you have internet connectivity, you can access Mayrahkee Africa on your smart phone, tablet or PC.",
        },
        {
            id: 4,
            title: "I am a fresh graduate without work experience",
            content:
                "We are happy to be part of your success journey as some of the employers on our platform seek fresh graduates/internship positions",
        },
        {
            id: 5,
            title: "How does an incomplete proﬁle affect me?",
            content:
                "We can only match Job seekers with a complete proﬁle to potential employers.",
        },
        {
            id: 6,
            title: "Can I advertise on Mayrahkee Africa?",
            content:
                "Yes, you can advertise job listings on Mayrahkee Africa as an employer by sending a request through advertise [@] mayrahkeeafrica.com",
        },
    ];

    return (
        <div className="relative my-10 px-5 h-auto flex flex-col gap-3">
            {/* Header */}
            {/* <header className="text-center py-10">
                <small className="text-little text-blue-600 font-medium">FAQ</small>
                <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                <p className="text-gray-600 mt-2">Have questions? We’re here to help.</p>
            </header> */}

            {/* Accordion Section */}
            <div className="mx-auto w-full flex flex-col gap-2">
                {questions?.map((question, index) => (
                    <div
                        key={question?.id}
                        className="bg-blue-100 p-4 pb-0 cursor-pointer text-blue-800"
                        onClick={() => toggleAccordion(question?.id)}
                    >
                        <div className={`flex justify-between items-center gap-3 pb-4 border-blue-400 ${openIndex === question?.id ? "border-b" : "border-b-0"}`} >
                            <p
                                className="md:text-xl font-medium"
                            >
                                {question?.title}
                            </p>
                            <div
                                className="w-6 h-6 text-2xl font-extrabold flex items-center justify-center transition-transform duration-300"
                                style={{
                                
                                }}
                            >
                                {openIndex === question?.id ? "-" : "+"}
                            </div>
                        </div>
                        <div
                            className={`text-sm overflow-hidden transition-all duration-300 ${openIndex === question?.id ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <p className="text-gray-500 font-medium mt-2 leading-relaxed first-line:mt-2 whitespace-pre-wrap w-[80%]">
                                {question?.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
