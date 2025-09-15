'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import TopBar from '@/components/top-bar/top-bar';
import { appRoutes } from '@/constants/routes/app-routes';
import { IProduct } from '@/types/api/product';
import { productApiService } from '@/services/api/product';
import { useApiFetch } from '@/hooks/use-api-fetch';
import Modal from '@/components/modal/modal';
import ProductForm from '@/components/product-form/product-form';

import '../../new/styles.scss';
import '../../styles.scss';

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { data: productsData, loading: productsDataLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
  });

  const [product, setProduct] = useState<IProduct | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  // Find and set the product data when component loads
  useEffect(() => {
    if (productsData && !productsDataLoading && slug) {
      const foundProduct = productsData.find((product) => product._id === slug);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [slug, productsData, productsDataLoading]);

  const handleSubmit = async (data: any) => {
    if (!product?._id) return;

    const updateData = {
      id: product._id,
      ...data
    };

    try {
      const { status } = await productApiService.updateProduct(updateData);

      if (status === 'success') {
        setSuccessModalOpen(true);
      } else {
        setErrorModalOpen(true);
      }
    } catch (error) {
      setErrorModalOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    router.push(appRoutes.products.index + `/${slug}`);
  };

  if (productsDataLoading) {
    return (
      <section className="new-products-page">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.products.index + `/${slug}`}
          title="Edit product"
        />
        <div className="content">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="new-products-page">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.products.index}
          title="Edit product"
        />
        <div className="content">
          <p>Product not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="new-products-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.products.index + `/${slug}`}
        title="Edit product"
      />

      <div className="content">
        <ProductForm
          initialData={product}
          submitButtonText="Update"
          onSubmit={handleSubmit}
          loading={productsDataLoading}
        />
      </div>

      <Modal
        className="warning"
        icon="error"
        title="Error"
        description="An error occurred while trying to update the product. Please try again or verify the values you are inputting."
        isOpen={errorModalOpen}
        primaryText='Try again'
        primaryClick={() => setErrorModalOpen(false)}
      />

      <Modal
        className="success"
        icon="check_circle"
        title="Success"
        description="Product has been updated successfully!"
        isOpen={successModalOpen}
        primaryText='OK'
        primaryClick={handleSuccessClose}
      />
    </section>
  );
}
