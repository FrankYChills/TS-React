import { ReactNode } from "react";

type SectionProps = { title?: string; children: ReactNode };

const Section = ({ title = "SubHeading 1", children }: SectionProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
};

export default Section;
