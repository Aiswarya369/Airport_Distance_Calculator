import { createContext, useState, FC } from "react";

interface Props {
  children: any;
}

export type AirportContextType = {
  source?: any;
  setSource?: any;
  destination?: any;
  setDestination?: any;
  distance?: any;
  setDistance?: any;
};

const AirportContextDefaultValues: AirportContextType = {
  source: {},
  destination: {},
  distance: 0,
};

export const AirportContext = createContext<AirportContextType>(
  AirportContextDefaultValues
);

const AirportContextProvider: FC<Props> = ({ children }) => {
  const [source, setSource] = useState<any>(AirportContextDefaultValues.source);
  const [destination, setDestination] = useState<any>(
    AirportContextDefaultValues.destination
  );
  const [distance, setDistance] = useState<any>(
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
