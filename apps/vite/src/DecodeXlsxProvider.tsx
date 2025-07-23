import React, { useState, useEffect, createContext, useContext } from 'react';
import Decoder, {DecoderOptions} from './DecodeXlsx';

const DecodeXlsxContext = createContext<Decoder | any | null>(null); // TODO

interface DecodeXlsxProviderProps {
  options: DecoderOptions;
  children: React.ReactNode;
}

export const DecodeXlsxProvider: React.FC<DecodeXlsxProviderProps> = ({ children, options }) => {
    const [decoder, setDecoder] = useState<Decoder | null>(null);
    const [selectedWorksheet, setSelectedWorksheet] = useState<string | null>(null);

    useEffect(() => {
      setDecoder(new Decoder(options));
    }, []);

    return (
        <DecodeXlsxContext.Provider value={{decoder, selectedWorksheet, setSelectedWorksheet}}>
            {children}
        </DecodeXlsxContext.Provider>
    );
};

export const useDecodeXlsx = () => {
    return useContext(DecodeXlsxContext);
};
