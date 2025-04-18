// Store for managing CRM data
import { create } from 'zustand';

interface CRMStore {
  selectedObject: string;
  records: any[];
  customObjects: any[];
  setSelectedObject: (obj: string) => void;
  setRecords: (records: any[]) => void;
  setCustomObjects: (objects: any[]) => void;
}

export const useCRMStore = create<CRMStore>((set) => ({
  selectedObject: '',
  records: [],
  customObjects: [],
  setSelectedObject: (obj) => set({ selectedObject: obj }),
  setRecords: (records) => set({ records }),
  setCustomObjects: (objects) => set({ customObjects: objects }),
}));
