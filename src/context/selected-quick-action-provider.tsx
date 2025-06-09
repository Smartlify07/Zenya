import type { ReactNode } from '@tanstack/react-router';
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
} from 'react';

export type QuickAction = 'invoice' | 'client' | 'task' | 'project' | null;

export const SelectedQuickActionContext = createContext<{
  selectedQuickAction: QuickAction;
  showDialog: boolean;
  setSelectedQuickAction: (action: QuickAction) => void;
  setShowDialog: Dispatch<React.SetStateAction<boolean>>;
}>({
  selectedQuickAction: null,
  setSelectedQuickAction: () => {},
  showDialog: false,
  setShowDialog: () => false,
});

export const SelectedQuickActionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedQuickAction, setSelectedQuickAction] =
    useState<QuickAction>(null);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <SelectedQuickActionContext.Provider
      value={{
        selectedQuickAction,
        setSelectedQuickAction,
        showDialog,
        setShowDialog,
      }}
    >
      {children}
    </SelectedQuickActionContext.Provider>
  );
};

export const useSelectedQuickAction = () => {
  const context = useContext(SelectedQuickActionContext);
  if (!context) {
    throw new Error(
      'useSelectedQuickAction must be used within a SelectedQuickActionProvider'
    );
  }
  return context;
};
