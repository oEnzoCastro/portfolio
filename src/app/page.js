import Technologies from "@/components/Technologies";

export default function Home() {
  return (
    <div className="flex gap-5 justify-center mt-5 flex-wrap">
      <Technologies img="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" name="Javascript" desc="Frontend/Backend Language"/>
      <Technologies img="https://blog.geekhunter.com.br/wp-content/uploads/2020/07/pngwing.com_.png" name="Java" desc="Backend Language"/>
      <Technologies img="https://149860134.v2.pressablecdn.com/wp-content/uploads/pythoned.png" name="Phyton" desc="Backend Language"/>
    </div>
  );
}
