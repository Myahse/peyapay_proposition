import React, { createContext, useContext, useState, ReactNode } from 'react';

type PhoneContextType = {
  phone: string;
  setPhone: (phone: string) => void;
};

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error('usePhone must be used within a PhoneProvider');
  }
  return context;
};

export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phone, setPhone] = useState('');
  return (
    <PhoneContext.Provider value={{ phone, setPhone }}>
      {children}
    </PhoneContext.Provider>
  );
}; 