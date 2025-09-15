'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import TopBar from '@/components/top-bar/top-bar';
import { appRoutes } from '@/constants/routes/app-routes';
import { productApiService } from '@/services/api/product';
import Modal from '@/components/modal/modal';
import ProductForm from '@/components/product-form/product-form';

import './styles.scss';

export default function NewProduct() {
  const router = useRouter();
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const handleSubmit = async (data: any) => {
    try {
      const { status } = await productApiService.createProduct(data);

      if (status === 'success') {
        router.push(appRoutes.products.index);
      } else {
        setErrorModalOpen(true);
      }
    } catch (error) {
      setErrorModalOpen(true);
      console.error('Error creating product:', error);
    }
  };

  return (
    <section className="new-products-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.products.index}
        title="Add product"
      />

      <div className="content">
        <ProductForm
          submitButtonText="Submit"
          onSubmit={handleSubmit}
        />
      </div>

      <Modal
        className="warning"
        icon="error"
        title="Error"
        description="An error occurred while trying to create a new product. Please try again or verify the values you are inputting."
        isOpen={errorModalOpen}
        primaryText='Try again'
        primaryClick={() => setErrorModalOpen(false)}
      />
    </section>
  );
}
