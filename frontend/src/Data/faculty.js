import assets from "../assets/assets";

export const facultyData = {
  tag: "Our Faculties",
  darkTag: false,
  title: "Programs Offered At \n Olabisi Onabanjo University",
  items: [
    {
      id: 1,
      image: assets.facultyImg,
      title: "Faculty of Pharmacy",
      subtitle: "Various Departments",
      dean: "Prof. Lateef Saka Kasim",
      departments: ["Pharmaceutical Sciences", "Pharmacology", "Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacognosy", "Pharmaceutical Technology"],
      body: "The Faculty of Pharmacy, Olabisi Onabanjo University, was established in 1992 as the first Pharmacy Faculty in Nigeria conceived and established by pharmacists themselves. It offers undergraduate and postgraduate programs, including MSc and PhD, in various pharmaceutical disciplines.",
    },
    {
      id: 2,
      image: assets.facultyImg,
      title: "Faculty of Clinical Sciences",
      subtitle: "7 Clinical Departments",
      dean: "Prof. B. A. Ayoade",
      departments: ["Anaesthesia", "Radiology", "Paediatrics", "Obstetrics and Gynaecology", "Community Medicine", "Primary Care", "Medicine and Surgery"],
      body: "The Faculty of Clinical Sciences began operations in 1983 as part of the Ogun State University, now Olabisi Onabanjo University. It has a strong focus on practical medical education with training in local community health facilities and hospitals.",
    },
    {
      id: 3,
      image: assets.facultyImg,
      title: "Faculty of Environmental Studies",
      subtitle: "Various Departments",
      dean: "Dr. Michael Abiodun Oyinloye",
      departments: ["Architecture", "Fine and Applied Arts", "Urban and Regional Planning", "Building", "Quantity Surveying", "Estate Management"],
      body: "The Faculty of Environmental Studies was initially the Faculty of Environmental Technology, renamed in 2009/2010. It now offers a wide range of programs aimed at developing future leaders in environmental planning and design, as well as contributing to human and economic development globally.",
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
