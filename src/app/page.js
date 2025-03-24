import Technologies from "@/components/Technologies";

export default function Home() {
  const technologies = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
      name: "Javascript",
      desc: "Frontend/Backend Language",
    },
    {
      img: "https://blog.geekhunter.com.br/wp-content/uploads/2020/07/pngwing.com_.png",
      name: "Java",
      desc: "Backend Language",
    },
    {
      img: "https://cdn.iconscout.com/icon/free/png-256/free-python-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-2945099.png?f=webp&w=256",
      name: "Phyton",
      desc: "Backend Language",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      name: "React",
      desc: "Frontend Frameword",
    }
  ];

  return (
    <div className="flex gap-5 justify-center mt-5 flex-wrap">
      {technologies.map((technologie) => {
        return (
          <Technologies
            key={technologie.name}
            img={technologie.img}
            name={technologie.name}
            desc={technologie.desc}
          />
        );
      })}
    </div>
  );
}
