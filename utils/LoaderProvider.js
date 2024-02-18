import React, { createContext, useContext, useState } from 'react';

// Create the context
export const LoaderContext = createContext();

// Custom hook to use the context
export const useLoader = () => {
    return useContext(LoaderContext);
};

// Context Provider component
export function LoaderProvider({ children }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const value = {
        isLoaded,
        setIsLoaded
    };

    return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}
