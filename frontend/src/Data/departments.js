import assets from "../assets/assets"

export const departmentData = [
      {
        id: 1,
        image: assets.facultyImg,
        title: "Agricultural science",
        faculty: "science",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 2,
        image: assets.facultyImg,
        title: "Chemical science",
        faculty: "science",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 3,
        image: assets.facultyImg,
        title: "Industrial chemistry",
        faculty: "science",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 2,
        image: assets.facultyImg,
        title: "Computer engineering",
        faculty: "engineering",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 4,
        image: assets.facultyImg,
        title: "Electrical engineering",
        faculty: "engineering",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 5,
        image: assets.facultyImg,
        title: "Civil engineering",
        faculty: "engineering",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 6,
        image: assets.facultyImg,
        title: "Computer education",
        faculty: "education",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 6,
        image: assets.facultyImg,
        title: "english education",
        faculty: "education",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
      {
        id: 6,
        image: assets.facultyImg,
        title: "chemistry education",
        faculty: "education",
        dean: "Prof Agboola, Ayodeji olayinka johnson.",
        body: "At the School of Management and Social Sciences, our expert faculty members are at the forefront of research in their respective fields, ensuring that you receive a top-notch education from leading",
      },
  ];

  departmentData.map((item, index)=> {item.href=item.title.trim().split(" ").join("").toLowerCase().replace("facultyof", ""); item.id=index; return item})