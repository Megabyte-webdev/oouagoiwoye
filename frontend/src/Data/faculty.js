import assets from "../assets/assets"
export const facultyData = {
  tag: "Our Faculties",
  darkTag: false,
  title: "Programs Offered At \n Olabisi Onabanjo University",
  items: [
    {
      id: 1,
      title: "Faculty of Pharmacy",
      subtitle: "Various Departments",
      dean: "Prof. Lateef Saka Kasim",
      departments: ["Pharmaceutical Sciences", "Pharmacology", "Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacognosy", "Pharmaceutical Technology"],
      body: "The Faculty of Pharmacy offers diverse programs including MSc and PhD, emphasizing academic and clinical training.",
      link: "/faculty/faculty-of-pharmacy"
    },
    {
      id: 2,
      title: "Faculty of Clinical Sciences",
      subtitle: "7 Clinical Departments",
      dean: "Prof. B. A. Ayoade",
      departments: ["Anaesthesia", "Radiology", "Paediatrics", "Obstetrics and Gynaecology", "Community Medicine", "Primary Care", "Medicine and Surgery"],
      body: "The Faculty focuses on practical medical education with excellent hospital facilities.",
      link: "/faculty/faculty-of-clinical-sciences"
    },
    {
      id: 3,
      title: "Faculty of Environmental Studies",
      subtitle: "Various Departments",
      dean: "Dr. Michael Abiodun Oyinloye",
      departments: ["Architecture", "Fine and Applied Arts", "Urban and Regional Planning", "Building", "Quantity Surveying", "Estate Management"],
      body: "This faculty offers programs aimed at sustainable development and advanced training in environmental studies.",
      link: "/faculty/faculty-of-environmental-studies"
    },
    {
      id: 4,
      title: "Faculty of Science",
      subtitle: "7 Departments",
      dean: "Prof. John A. Laoye",
      departments: ["Plant Science", "Chemical Sciences", "Earth Sciences", "Microbiology", "Physics", "Zoology and Environmental Biology", "Mathematical Sciences"],
      body: "The Faculty focuses on producing scientific and technological manpower for national development.",
      link: "/faculty/faculty-of-science"
    },
    {
      id: 5,
      title: "Faculty of Social Sciences",
      subtitle: "6 Departments",
      dean: "Prof. Ayodele Thomas Odunlami",
      departments: ["Economics", "Geography", "Political Science", "Psychology", "Sociology", "Mass Communication"],
      body: "This faculty offers diverse programs, including Criminology and Security Studies.",
      link: "/faculty/faculty-of-social-sciences"
    },
    {
      id: 6,
      title: "Faculty of Basic Medical Sciences",
      subtitle: "11 Departments",
      dean: "Prof. Deji-Agboola Mopelola",
      departments: ["Anatomy", "Biochemistry", "Physiology", "Nursing", "Medical Laboratory Science", "Forensic Science"],
      body: "The Faculty offers robust programs addressing health challenges with state-of-the-art research labs.",
      link: "/faculty/faculty-of-basic-medical-sciences"
    },
    {
      id: 7,
      title: "Faculty of Administration and Management Sciences",
      subtitle: "7 Departments",
      dean: "Prof. Muse Olayiwola Solanke",
      departments: ["Accounting", "Banking and Finance", "Business Administration", "Public Administration", "Transport Management"],
      body: "This faculty trains articulate managers with emphasis on research and innovation.",
      link: "/faculty/faculty-of-administration-and-management-sciences"
    },
    {
      id: 8,
      title: "Faculty of Agricultural Sciences",
      subtitle: "4 Departments",
      dean: "Prof. Hakeem A. Awojobi",
      departments: ["Animal Production", "Crop Production", "Forestry, Wildlife and Fisheries", "Soil Science"],
      body: "This faculty focuses on comprehensive agricultural education and research with well-equipped farms and labs.",
      link: "/faculty/faculty-of-agricultural-sciences"
    }
  ]
};

// Generate href and image for each faculty item
facultyData.items = facultyData.items.map((item) => {
  item.href = item.title
    .toLowerCase()
    .replace("faculty of", "")
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    
  item.image = assets.faculty;

  return item;
});
