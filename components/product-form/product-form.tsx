'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';

import FormInput from '@/components/form-input/form-input';
import Button from '@/components/button/button';
import { ButtonTypes } from '@/enums/button-types';
import { useAppDataContext } from '@/context/AppDataContext';
import { IAddProductParams, IProduct } from '@/types/api/product';
import Icon from '@/components/icon/icon';
import Modal from '@/components/modal/modal';
import ButtonFab from '@/components/button-fab/button-fab';

import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import './styles.scss';

// Extended form interface to match the design
interface IProductFormData extends Omit<IAddProductParams, 'moreInfo'> {
  description?: string;
  color?: string;
  deliveryDate?: dayjs.Dayjs | null;
  image?: File | null;
}

interface IProductFormProps {
  initialData?: IProduct;
  submitButtonText: string;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export default function ProductForm({
  initialData,
  submitButtonText,
  onSubmit,
  loading = false
}: IProductFormProps) {
  // Memoize form default values
  const defaultFormValues = useMemo(() => ({
    name: '',
    description: '',
    category: '',
    price: 0,
    buyingPrice: 0,
    quantity: 0,
    color: '',
    deliveryDate: null,
    image: null
  }), []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<IProductFormData>({
    defaultValues: defaultFormValues
  });

  const { statuses } = useAppDataContext();
  const [isBtnDisabled, setBtnIsDisabled] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [addColorModalOpen, setAddColorModalOpen] = useState<boolean>(false);
  const [newColorName, setNewColorName] = useState<string>('');

  const watchQuantity = watch('quantity');

  // Set initial data when editing
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category?._id || '',
        price: initialData.price?.selling || 0,
        buyingPrice: initialData.price?.buying || initialData.buyingPrice || 0,
        quantity: initialData.quantity || 0,
        color: initialData.color || '',
        deliveryDate: null, // You might want to add this field to the backend
        image: null
      });
    }
  }, [initialData, reset]);

  const handleQuantityChange = (increment: boolean) => {
    const currentValue = watchQuantity || 0;
    const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
    setValue('quantity', newValue);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    setAddCategoryModalOpen(true);
  };

  const handleCategoryModalCancel = () => {
    setAddCategoryModalOpen(false);
    setNewCategoryName('');
  };

  const handleCategoryModalAdd = () => {
    if (newCategoryName.trim()) {
      // Here you would typically call an API to add the new category
      // For now, we'll just close the modal
      console.log('Adding new category:', newCategoryName);
      setAddCategoryModalOpen(false);
      setNewCategoryName('');
      // TODO: Implement API call to add category and refresh the categories list
    }
  };

  const handleAddColor = () => {
    setAddColorModalOpen(true);
  };

  const handleColorModalCancel = () => {
    setAddColorModalOpen(false);
    setNewColorName('');
  };

  const handleColorModalAdd = () => {
    if (newColorName.trim()) {
      // Here you would typically call an API to add the new color
      // For now, we'll just close the modal
      console.log('Adding new color:', newColorName);
      setAddColorModalOpen(false);
      setNewColorName('');
      // TODO: Implement API call to add color and refresh the colors list
    }
  };

  const handleFormSubmit = useCallback(async (data: IProductFormData) => {
    setBtnIsDisabled(true);

    try {
      // Convert form data to API format
      const submitData = {
        name: data.name,
        quantity: data.quantity,
        category: data.category,
        price: data.price,
        buyingPrice: data.buyingPrice,
        paymentStatus: 'unpaid', // Set default for now
        moreInfo: data.description || ''
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setBtnIsDisabled(false);
    }
  }, [onSubmit]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="product-form">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Name Field */}
          <div className="form-field">
            <label htmlFor="name">Name*</label>
            <div className="input-wrapper">
              <input
                {...register('name', { required: true })}
                type="text"
                placeholder="Product name"
                className="form-input"
              />
            </div>
            {errors.name && <span className="error-text">This field is required</span>}
          </div>

          {/* Description Field */}
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <div className="input-wrapper">
              <textarea
                {...register('description')}
                placeholder="Describe your product"
                className="form-textarea"
                rows={4}
              />
            </div>
          </div>

          {/* Category Field with Add Button */}
          <div className="form-field">
            <label htmlFor="category">Category*</label>
            <div className="category-with-add">
              <div className="category-select">
                <FormControl fullWidth>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        renderValue={(value) => {
                          if (!value) return <span className="placeholder">Select a category</span>;
                          const category = statuses?.find(cat => cat._id === value);
                          return category?.name || value;
                        }}
                      >
                        {statuses?.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </div>
              <Button
                title="Add"
                type={ButtonTypes.Button}
                variant="rounded"
                className="add-category-btn"
                clickHandler={handleAddCategory}
              />
            </div>
            {errors.category && <span className="error-text">This field is required</span>}
          </div>

          {/* Price Fields */}
          <div className="form-field">
            <div className="price-fields">
              <div className="price-field">
                <label htmlFor="price">Price*</label>
                <div className="price-input">
                  <span className="currency">Rs</span>
                  <input
                    {...register('price', { required: true, min: 0 })}
                    type="number"
                    placeholder="0"
                  />
                </div>
                {errors.price && <span className="error-text">This field is required</span>}
              </div>
              <div className="price-field">
                <label htmlFor="buyingPrice">Buying Price</label>
                <div className="price-input">
                  <span className="currency">Rs</span>
                  <input
                    {...register('buyingPrice', { required: true, min: 0 })}
                    type="number"
                    placeholder="0"
                  />
                </div>
                {errors.buyingPrice && <span className="error-text">This field is required</span>}
              </div>
            </div>
          </div>

          {/* Total Stock Field with +/- Buttons */}
          <div className="form-field">
            <label htmlFor="quantity">Total Stock*</label>
            <div className="stock-field">
              <input
                {...register('quantity', { required: true, min: 0 })}
                type="number"
                placeholder="0"
                readOnly
              />
              <div className="stock-controls">
                <ButtonFab
                  icon="remove"
                  type="mini"
                  className="stock-btn minus"
                  clickHandler={() => handleQuantityChange(false)}
                />
                <ButtonFab
                  icon="add"
                  type="mini"
                  className="stock-btn plus"
                  clickHandler={() => handleQuantityChange(true)}
                />
              </div>
            </div>
            {errors.quantity && <span className="error-text">This field is required</span>}
          </div>

          {/* Color Field with Add Button */}
          <div className="form-field">
            <label htmlFor="color">Color</label>
            <div className="color-with-add">
              <div className="color-select">
                <FormControl fullWidth>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        renderValue={(value) => {
                          if (!value) return <span className="placeholder">Select a color</span>;
                          return value;
                        }}
                      >
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Green">Green</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </div>
              <Button
                title="Add"
                type={ButtonTypes.Button}
                variant="rounded"
                className="add-color-btn"
                clickHandler={handleAddColor}
              />
            </div>
          </div>

          {/* Delivery Date Field */}
          <div className="form-field">
            <label htmlFor="deliveryDate">Delivery Date*</label>
            <Controller
              name="deliveryDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  slotProps={{
                    textField: {
                      placeholder: 'dd/mm/yyyy',
                      variant: 'outlined',
                      fullWidth: true,
                      sx: {
                        fontFamily: 'inherit',
                      },
                      InputProps: {
                        endAdornment: (
                          <Icon iconName="calendar_today" />
                        ),
                      }
                    }
                  }}
                />
              )}
            />
          </div>

          {/* Image Upload Field */}
          <div className="form-field">
            <div className="image-field">
              <div className="image-header">
                <label htmlFor="image">Image</label>
                <span className="image-size">Size: 2 mb</span>
              </div>
              <div className="image-upload-area">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="upload-label">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" className="image-preview" width={200} height={200} />
                  ) : (
                    <>
                      <Icon iconName="cloud_upload" className="upload-icon" />
                      <p>Upload your product photo or capture from camera.</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </form>

        <div className="btn-submit">
          <Button
            title={submitButtonText}
            titleBold={true}
            type={ButtonTypes.Button}
            variant="rounded"
            clickHandler={handleSubmit(handleFormSubmit)}
            isDisabled={isBtnDisabled || loading}
          />
        </div>

        {/* Add Category Modal */}
        <Modal
          title="Add Category"
          description="Below you can add you new category item."
          isOpen={addCategoryModalOpen}
          primaryText="Add"
          secondaryText="Cancel"
          primaryClick={handleCategoryModalAdd}
          secondaryClick={handleCategoryModalCancel}
        >
          <div className="category-input-wrapper">
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="category-input"
            />
          </div>
        </Modal>

        {/* Add Color Modal */}
        <Modal
          title="Add Color"
          description="Below you can add you new color item."
          isOpen={addColorModalOpen}
          primaryText="Add"
          secondaryText="Cancel"
          primaryClick={handleColorModalAdd}
          secondaryClick={handleColorModalCancel}
        >
          <div className="category-input-wrapper">
            <input
              type="text"
              placeholder="Color name"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              className="category-input"
            />
          </div>
        </Modal>
      </div>
    </LocalizationProvider>
  );
}
