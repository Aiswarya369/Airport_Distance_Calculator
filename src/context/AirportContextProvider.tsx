import React from "react";
import { createContext, useState, FC } from "react";

interface Props{
    children:any
}

export type AirportContextType = {
  source?: any;
  setSource?:any;
  destination?: any;
  setDestination?:any;
  plotRoute?: any;
  setPlotRoute?:any;
};


const AirportContextDefaultValues: AirportContextType = {
  source: {},
  destination: {},
  plotRoute: false,
};

export const AirportContext = createContext<AirportContextType>(
  AirportContextDefaultValues
);

const AirportContextProvider: FC<Props> = ({ children }) => {
  const [source, setSource] = useState<any>(AirportContextDefaultValues.source);
  const [destination, setDestination] = useState<any>(
    AirportContextDefaultValues.destination
  );
  const [plotRoute, setPlotRoute] = useState<any>(
    AirportContextDefaultValues.plotRoute
  );

  return (
    <AirportContext.Provider
      value={{
        source,
        setSource,
        destination,
        setDestination,
        plotRoute,
        setPlotRoute
      }}
    >
      {children}
    </AirportContext.Provider>
  );
};

export default AirportContextProvider;
