import React from "react";
import { CardTeam } from "@/components/cardTeam/cardTeam";
import { ITeamMember } from "@/interfaces/interfaz";
import { team } from "@/utils/arrayTeam";

const AboutUs = () => {
  const teamMembers = team;

  return (
    <div className="bg-greyVivino ">
      <h1 className="text-wine text-center text-6xl font-plus-jakarta-sans  mb-8 p-20 pb-0">
        Conoce más sobre nosotros
      </h1>
      <section className="my-10 flex flex-col items-center gap-8">
        <h2 className="text-black text-4xl text-center pt-10">
          ¿Quiénes somos?
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20">
          <img src="/about.png" className="h-64 md:h-80" alt="team" />
          <p className="body1 text-lg md:text-xl text-center md:text-left max-w-2xl">
            Somos un equipo de siete talentosos desarrolladores, cuatro
            especializados en backend y tres en frontend, que nos hemos reunido
            para realizar un emocionante proyecto. Todos nosotros nos formamos
            en la academia SoyHenry, donde adquirimos una sólida base técnica y
            una pasión compartida por el desarrollo de software. Nuestro
            objetivo es colaborar estrechamente, aprovechar nuestras habilidades
            complementarias y superar cualquier desafío para lograr los
            objetivos del proyecto con la mayor calidad y eficiencia!
          </p>
        </div>
      </section>
      <section className="my-10 flex flex-col items-center gap-8">
        <h2 className="text-black text-4xl text-center z-10">Nuestro equipo</h2>
        <div className="flex overflow-x-scroll space-x-4 p-10">
          {teamMembers.map((member: ITeamMember) => (
            <CardTeam
              key={member.id}
              id={member.id}
              name={member.name}
              role={member.role}
              GitHub={member.GitHub}
              LinkedIn={member.LinkedIn}
              img={member.img}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
