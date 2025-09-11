'use client';

import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import TopBar from '@/components/top-bar/top-bar';
import { appRoutes } from '@/constants/routes/app-routes';
import FormInput from '@/components/form-input/form-input';
import Button from '@/components/button/button';
import { ButtonTypes } from '@/enums/button-types';
import { useAppDataContext } from '@/context/AppDataContext';
import { IUpdateProductParams, IProduct } from '@/types/api/product';
import { productApiService } from '@/services/api/product';
import { useApiFetch } from '@/hooks/use-api-fetch';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useRouter, useParams } from 'next/navigation';

import '../../new/styles.scss';
import '../../styles.scss';
import Modal from '@/components/modal/modal';

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { data: productsData, loading: productsLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
  });

  const { statuses: categories } = useAppDataContext();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isBtnDisabled, setBtnIsDisabled] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IUpdateProductParams>({
    defaultValues: {
      name: '',
      quantity: 0,
      category: '',
      price: 0,
      buyingPrice: 0,
      moreInfo: ''
    }
  });

  // Find and set the product data when component loads
  useEffect(() => {
    if (productsData && !productsLoading && slug) {
      const foundProduct = productsData.find((product) => product._id === slug);
      if (foundProduct) {
        setProduct(foundProduct);

        // Reset form with product data
        reset({
          name: foundProduct.name || '',
          quantity: foundProduct.quantity || 0,
          category: foundProduct.category?._id || '',
          price: foundProduct.price?.selling || 0,
          buyingPrice: foundProduct.price?.buying || foundProduct.buyingPrice || 0,
          moreInfo: foundProduct.moreInfo || ''
        });
      }
    }
  }, [slug, productsData, productsLoading, reset]);

  const onSubmit = async (data: any) => {
    if (!product?._id) return;

    setBtnIsDisabled(true);

    const updateData = {
      id: product._id,
      ...data
    };

    try {
      const { status } = await productApiService.updateProduct(updateData);

      if (status === 'success') {
        setBtnIsDisabled(false);
        setSuccessModalOpen(true);
      } else {
        setBtnIsDisabled(false);
        setErrorModalOpen(true);
      }
    } catch (error) {
      setBtnIsDisabled(false);
      setErrorModalOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    router.push(appRoutes.products.index + `/${slug}`);
  };

  if (productsLoading) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="general-info vertical-fields">
            <div className="header">
              <label htmlFor="name">General info</label>
              <span>Update the basic product info.</span>
            </div>

            <FormInput
              {...register('name', { required: true })}
              title="name"
              type="text"
              hint="Product Name"
            />
            {errors.name && <span>This field is required</span>}

            <FormInput
              {...register('quantity', { required: true })}
              title="quantity"
              type="number"
              hint="Quantity"
            />
            {errors.quantity && <span>This field is required</span>}

            <FormInput
              {...register('moreInfo', { required: false })}
              title="moreInfo"
              type="text"
              hint="Additional Information"
            />
          </div>

          <div className="category-info vertical-fields">
            <div className="header">
              <label htmlFor="category">Category</label>
              <span>Update the product category.</span>
            </div>

            <FormControl>
              <Controller
                rules={{ required: true }}
                control={control}
                name="category"
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {categories?.map((category: any) => (
                      <FormControlLabel
                        key={category._id}
                        value={category._id}
                        control={<Radio />}
                        label={category.name}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
            {errors.category && <span>This field is required</span>}
          </div>

          <div className="price-info vertical-fields">
            <div className="header">
              <label htmlFor="price">Pricing</label>
              <span>Update product pricing information.</span>
            </div>

            <div className="horizontal-fields">
              <FormInput
                {...register('price', { required: true })}
                title="price"
                type="number"
                hint="Selling Price"
              />
              {errors.price && <span>This field is required</span>}

              <FormInput
                {...register('buyingPrice', { required: true })}
                title="buyingPrice"
                type="number"
                hint="Buying Price"
              />
              {errors.buyingPrice && <span>This field is required</span>}
            </div>
          </div>
        </form>
      </div>

      <div className="btn-submit">
        <Button
          title="Update"
          titleBold={true}
          type={ButtonTypes.Button}
          variant="rounded"
          clickHandler={handleSubmit(onSubmit)}
          isDisabled={isBtnDisabled}
        />
      </div>

      <Modal
        className="warning"
        icon="error"
        title="Error"
        description="An error occurred while trying to update the product. Please try again or verify the values you are inputting."
        isOpen={errorModalOpen}
        primaryText='Try again'
        primaryClick={() => {
          setErrorModalOpen(false);
          setBtnIsDisabled(false);
        }}
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
