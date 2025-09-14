import { TypeAnimation } from "react-type-animation";

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        "Saswata",
        1000,
        "Web Developer",
        2000,
        () => {
          console.log("Sequence completed"); // Place optional callbacks anywhere in the array
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      className="text-[#7364d2] font-4xl font-brand inline-block"
      s
    />
  );
};
export default ExampleComponent;
