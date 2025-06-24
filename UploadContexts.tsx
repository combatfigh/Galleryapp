import React, { createContext, useContext, useState } from 'react';

const UploadContext = createContext<any>(null);

export const useUploads = () => useContext(UploadContext);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [uploads, setUploads] = useState<any[]>([]);

  const addUpload = (image: any) => {
    setUploads(prev => [image, ...prev]);
  };

  return (
    <UploadContext.Provider value={{ uploads, addUpload }}>
      {children}
    </UploadContext.Provider>
  );
};
