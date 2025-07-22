import { createContext, useContext, useState } from "react";

const RotationContext = createContext();

export const useRotation = () => useContext(RotationContext);

export const RotationProvider = ({ children }) => {
    const [earthRotation, setEarthRotation] = useState([0, 0, 0]);
    return (
        <RotationContext.Provider value={{ earthRotation, setEarthRotation }}>
            {children}
        </RotationContext.Provider>
    );
};