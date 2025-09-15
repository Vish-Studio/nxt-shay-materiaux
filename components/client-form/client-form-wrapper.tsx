import React from 'react';
import { IClient } from '@/types/api/client';
import ClientForm from './client-form';
import { TLocation } from '@/components/google-maps/google-map';

// Server Component wrapper that handles static structure
interface IClientFormWrapperProps {
  initialData?: IClient;
  submitButtonText: string;
  onSubmit: (data: any, location: TLocation) => Promise<void>;
  loading?: boolean;
  mode: 'create' | 'edit';
}

// This could be a Server Component if we extract static content
export default function ClientFormWrapper({
  mode,
  ...props
}: IClientFormWrapperProps) {
  // Static content that could be server-rendered
  const pageTitle = mode === 'create' ? 'Add Client' : 'Edit Client';
  const pageDescription = mode === 'create'
    ? 'Create a new client with all necessary information.'
    : 'Update client information and settings.';

  return (
    <div className="client-form-wrapper">
      {/* Static header that could be server-rendered */}
      <div className="form-header">
        <h1>{pageTitle}</h1>
        <p>{pageDescription}</p>
      </div>

      {/* Interactive form stays as client component */}
      <ClientForm {...props} />
    </div>
  );
}
