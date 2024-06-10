import {
  MutableRefObject,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}
interface QuantityContextType {
  quantity: number | undefined;
  quantityLoading: boolean;
  removeQuantity: () => void;
  getQuantity: (number: number) => void;
}

export const QuantityContext = createContext<QuantityContextType>({
  quantity: undefined,
  quantityLoading: true,
  removeQuantity: () => {},
  getQuantity: () => {},
});

const QuantityProvider = ({ children }: Props) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [quantityLoading, setQuantityLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedQuantity = localStorage.getItem("quantity");
      if (savedQuantity !== null) {
        setQuantity(parseInt(savedQuantity, 10));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuantityLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("quantity:", quantity);
  }, [quantity]);

  const getQuantity = (number: number) => {
    setQuantity(number);
    localStorage.setItem("quantity", number.toString());
  };

  const removeQuantity = () => {
    localStorage.removeItem("quantity");
    setQuantity(0);
  };

  return (
    <QuantityContext.Provider
      value={{ quantityLoading, quantity, getQuantity, removeQuantity }}
    >
      {children}
    </QuantityContext.Provider>
  );
};
export default QuantityProvider;
