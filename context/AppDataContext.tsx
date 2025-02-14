import { createContext, useContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';

import { paymentApiService } from '@/services/api/payment';
import type { IPayment } from '@/types/api/payment';
import type { ICategory } from '@/types/api/category';
import { categoryApiService } from '@/services/api/category';

interface IAppDataState {
  payments: IPayment[] | null;
  statuses: ICategory[] | null;
  loading: boolean;
  error: string | null;
}

interface IAppDataAction {
  type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR';
  payload?: any;
}

const AppDataContext = createContext<{
  payments: IPayment[] | null;
  statuses: ICategory[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} | null>(null);

const initialState: IAppDataState = {
  payments: null,
  statuses: null,
  loading: false,
  error: null
};

const dataReducer = (state: IAppDataState, action: IAppDataAction): IAppDataState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        [action.payload.key]: action.payload.data || [] // Directly set entitirs
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AppDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const [paymentsResult, statusesResult] = await Promise.all([
        paymentApiService.getPayments(),
        categoryApiService.getAllCategories()
      ]);

      dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'payments', data: paymentsResult.data } });
      dispatch({ type: 'FETCH_SUCCESS', payload: { key: 'statuses', data: statusesResult.data } });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppDataContext.Provider value={{ ...state, refetch: fetchData }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppDataContext must be used within an AppDataProvider');
  }
  return context;
};
