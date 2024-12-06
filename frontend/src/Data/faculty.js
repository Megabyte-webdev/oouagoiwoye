 
import assets from "../assets/assets";

export const facultyData = {
  tag: "Our Faculties",
  darkTag: false,
  title: "Programs Offered At \n Olabisi Onabanjo University",
  items: [
    {
      id: 1,
      image: "https://example.com/images/faculty-of-pharmacy.jpg",
      title: "Faculty of Pharmacy",
      subtitle: "Various Departments",
      dean: "Prof. Lateef Saka Kasim",
      departments: ["Pharmaceutical Sciences", "Pharmacology", "Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacognosy", "Pharmaceutical Technology"],
      body: "The Faculty of Pharmacy was established in 1992 as Nigeria's first pharmacy faculty conceived by pharmacists. It offers diverse programs including MSc and PhD, and emphasizes academic and clinical training.",
    },
    {
      id: 2,
      image: "https://example.com/images/faculty-of-clinical-sciences.jpg",
      title: "Faculty of Clinical Sciences",
      subtitle: "7 Clinical Departments",
      dean: "Prof. B. A. Ayoade",
      departments: ["Anaesthesia", "Radiology", "Paediatrics", "Obstetrics and Gynaecology", "Community Medicine", "Primary Care", "Medicine and Surgery"],
      body: "The Faculty began in 1983 and focuses on practical medical education, incorporating community health training and excellent hospital facilities.",
    },
    {
      id: 3,
      image: "https://example.com/images/faculty-of-environmental-studies.jpg",
      title: "Faculty of Environmental Studies",
      subtitle: "Various Departments",
      dean: "Dr. Michael Abiodun Oyinloye",
      departments: ["Architecture", "Fine and Applied Arts", "Urban and Regional Planning", "Building", "Quantity Surveying", "Estate Management"],
      body: "Renamed in 2009, this faculty offers programs aimed at sustainable development and advanced training in environmental studies.",
    },
    {
      id: 4,
      image: "https://example.com/images/faculty-of-science.jpg",
      title: "Faculty of Science",
      subtitle: "7 Departments",
      dean: "Prof. John A. Laoye",
      departments: ["Plant Science", "Chemical Sciences", "Earth Sciences", "Microbiology", "Physics", "Zoology and Environmental Biology", "Mathematical Sciences"],
      body: "Established in 1983, the faculty focuses on producing scientific and technological manpower for national development with cutting-edge research facilities【24】.",
    },
    {
      id: 5,
      image: "https://example.com/images/faculty-of-social-sciences.jpg",
      title: "Faculty of Social Sciences",
      subtitle: "6 Departments",
      dean: "Prof. Ayodele Thomas Odunlami",
      departments: ["Economics", "Geography", "Political Science", "Psychology", "Sociology", "Mass Communication"],
      body: "This faculty offers diverse programs, including Criminology and Security Studies, and houses facilities like a digital radio station and TV studios【25】.",
    },
    {
      id: 6,
      image: "https://example.com/images/faculty-of-basic-medical-sciences.jpg",
      title: "Faculty of Basic Medical Sciences",
      subtitle: "11 Departments",
      dean: "Prof. Deji-Agboola Mopelola",
      departments: ["Anatomy", "Biochemistry", "Physiology", "Nursing", "Medical Laboratory Science", "Forensic Science"],
      body: "Part of the Obafemi Awolowo College of Health Sciences, the faculty offers robust programs addressing health challenges with state-of-the-art research labs【26】.",
    },
    {
      id: 7,
      image: "https://example.com/images/faculty-of-management-sciences.jpg",
      title: "Faculty of Administration and Management Sciences",
      subtitle: "7 Departments",
      dean: "Prof. Muse Olayiwola Solanke",
      departments: ["Accounting", "Banking and Finance", "Business Administration", "Public Administration", "Transport Management"],
      body: "This faculty trains articulate managers with emphasis on research and innovation for societal advancement【27】.",
    },
    {
      id: 8,
      image: "https://example.com/images/faculty-of-agricultural-sciences.jpg",
      title: "Faculty of Agricultural Sciences",
      subtitle: "4 Departments",
      dean: "Prof. Hakeem A. Awojobi",
      departments: ["Animal Production", "Crop Production", "Forestry, Wildlife and Fisheries", "Soil Science"],
      body: "Founded in 1983, this faculty focuses on comprehensive agricultural education and research with well-equipped farms and labs【28】.",
    }
  ]
};

// Generate href for each faculty item
facultyData.items.map((item) => {
  item.href = item.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
  return item;
});