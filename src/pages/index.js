import { useSelector } from "react-redux";

export const Index = () => {
  const storage = useSelector((store) => store);
  return <div>Hola a todos</div>;
};

export default Index;
