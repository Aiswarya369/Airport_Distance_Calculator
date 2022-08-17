import { createContext, useState, FC } from "react";
import { ICordsData } from "../types";

interface Props {
  children: React.ReactNode;
}

export type AirportContextType = {
  source: ICordsData;
  setSource: (data) => void | undefined;
  destination: ICordsData;
  setDestination: (data) => void | undefined;
  distance: number;
  setDistance: (data: number) => void;
};

const AirportContextDefaultValues: AirportContextType = {
  source: { name: "", lat: "", lng: "" },
  destination: { name: "", lat: "", lng: "" },
  distance: 0,
  setSource: () => {},
  setDestination: () => {},
  setDistance: () => {},
};

export const AirportContext = createContext<AirportContextType>(
  AirportContextDefaultValues
);

const AirportContextProvider: FC<Props> = ({ children }) => {
  const [source, setSource] = useState(AirportContextDefaultValues.source);
  const [destination, setDestination] = useState(
    AirportContextDefaultValues.destination
  );
  const [distance, setDistance] = useState(
    AirportContextDefaultValues.distance
  );

  return (
    <AirportContext.Provider
      value={{
        source,
        setSource,
        destination,
        setDestination,
        distance,
        setDistance,
      }}
    >
      {children}
    </AirportContext.Provider>
  );
};

export default AirportContextProvider;
