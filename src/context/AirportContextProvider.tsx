import { createContext, useState, FC } from "react";
import { ICordsData,Idistance } from "../types";

interface Props {
  children: React.ReactNode;
}

export type AirportContextType = {
  source: ICordsData;
  setSource: (data) => void ;
  destination: ICordsData;
  setDestination: (data) => void ;
  distance: Idistance;
  setDistance: (data) => void;
};

const AirportContextDefaultValues: AirportContextType = {
  source: { name: "", lat: "", lng: "" },
  destination: { name: "", lat: "", lng: "" },
  distance:{d:0,comment:""},
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
