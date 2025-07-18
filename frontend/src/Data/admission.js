import assets from "../assets/assets"
export const admissionData = {
  tag: "Our Faculties",
  darkTag: false,
  title: "Programs Offered At \n Olabisi Onabanjo University",
  items: [
    {
      id: 1,
      title: "undergraduate",
      href:"undergraduate",
      programs:[
        {
          id: 1,
          title:"Admission Requirements",
        },{
          id:2,
          title:"Available Programs"
        },{
          id: 3,
          title:"School Fees"
        },{
          id: 4,
          title:"FAQS"
        }
      ]
    },
    {
      id: 2,
      title: "postgraduate",
      href:"postgraduate",
      programs:[
        {
          id: 1,
          title:"Available Programs an Requirements",
        },{
          id:2,
          title:"FAQs"
        }
      ]
    },
    
  ]
};

// Generate href and image for each faculty item
admissionData.items = admissionData.items.map((item) => {
  item.href = item.title
    .toLowerCase()
    .trim()
    
  item.image = assets.faculty;

  return item;
});
