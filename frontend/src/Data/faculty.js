export const facultyData = {
  tag: "Our Faculties",
  darkTag: false,
  title: "Programs Offered At \n Olabisi Onabanjo University",
  items: [
    {
      id: 1,
      image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Faculty+of+Pharmacy",
      title: "Faculty of Pharmacy",
      subtitle: "Various Departments",
      dean: "Prof. Lateef Saka Kasim",
      departments: ["Pharmaceutical Sciences", "Pharmacology", "Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacognosy", "Pharmaceutical Technology"],
      body: "The Faculty of Pharmacy was established in 1992 as Nigeria's first pharmacy faculty conceived by pharmacists. It offers diverse programs including MSc and PhD, and emphasizes academic and clinical training.",
      link: "/faculty/faculty-of-pharmacy"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Faculty+of+Clinical+Sciences",
      title: "Faculty of Clinical Sciences",
      subtitle: "7 Clinical Departments",
      dean: "Prof. B. A. Ayoade",
      departments: ["Anaesthesia", "Radiology", "Paediatrics", "Obstetrics and Gynaecology", "Community Medicine", "Primary Care", "Medicine and Surgery"],
      body: "The Faculty began in 1983 and focuses on practical medical education, incorporating community health training and excellent hospital facilities.",
      link: "/faculty/faculty-of-clinical-sciences"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150/008000/FFFFFF?text=Faculty+of+Environmental+Studies",
      title: "Faculty of Environmental Studies",
      subtitle: "Various Departments",
      dean: "Dr. Michael Abiodun Oyinloye",
      departments: ["Architecture", "Fine and Applied Arts", "Urban and Regional Planning", "Building", "Quantity Surveying", "Estate Management"],
      body: "Renamed in 2009, this faculty offers programs aimed at sustainable development and advanced training in environmental studies.",
      link: "/faculty/faculty-of-environmental-studies"
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150/FFFF00/000000?text=Faculty+of+Science",
      title: "Faculty of Science",
      subtitle: "7 Departments",
      dean: "Prof. John A. Laoye",
      departments: ["Plant Science", "Chemical Sciences", "Earth Sciences", "Microbiology", "Physics", "Zoology and Environmental Biology", "Mathematical Sciences"],
      body: "Established in 1983, the faculty focuses on producing scientific and technological manpower for national development with cutting-edge research facilities.",
      link: "/faculty/faculty-of-science"
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150/800080/FFFFFF?text=Faculty+of+Social+Sciences",
      title: "Faculty of Social Sciences",
      subtitle: "6 Departments",
      dean: "Prof. Ayodele Thomas Odunlami",
      departments: ["Economics", "Geography", "Political Science", "Psychology", "Sociology", "Mass Communication"],
      body: "This faculty offers diverse programs, including Criminology and Security Studies, and houses facilities like a digital radio station and TV studios.",
      link: "/faculty/faculty-of-social-sciences"
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
