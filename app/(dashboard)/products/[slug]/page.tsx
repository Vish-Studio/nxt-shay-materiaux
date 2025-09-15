
'use client';

import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useParams, useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/routes/app-routes';
import DetailCardHeader from '@/components/detail-card-header/detail-card-header';
import { IProduct } from '@/types/api/product';
import { useEffect, useState } from 'react';
import { productApiService } from '@/services/api/product';
import { useApiFetch } from '@/hooks/use-api-fetch';
import DetailCardItem from '@/components/detail-card-item/detail-card-item';
import DetailCard from '@/components/detail-card/detail-card-wrapper';
import Button from '@/components/button/button';
import { ButtonTypes } from '@/enums/button-types';
import Modal from '@/components/modal/modal';
import Image from 'next/image';
import { colorApiService } from '@/services/api/color';
import { IColor } from '@/types/api/color';

export default function Product() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { data: productsData, loading: productsLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
  });

  const { data: colorsData } = useApiFetch<IColor[]>({
    serviceFn: colorApiService.getAllColors
  });

  const [product, setProduct] = useState<IProduct>(Object);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    productsData &&
      !productsLoading &&
      productsData.filter((product) => {
        if (product._id === slug) {
          setProduct(product);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, productsData, productsLoading]);

  const submitDeleteproduct = async () => {
    const { status } = await productApiService.deleteProduct({ id: slug as string });
    if (status === 'success') {
      router.push(appRoutes.products.index);
    } else {
      setErrorModalOpen(true);
    }
  };

  // Helper function to get color hex value
  const getColorHex = (colorName: string) => {
    if (!colorsData) return '#CCCCCC';
    const color = colorsData.find(c => c.name === colorName);
    return color?.hexValue || '#CCCCCC';
  };

  // Helper function to format date
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Helper function to format time
  const formatTime = (date: string | Date | undefined) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to format day of week
  const formatDayOfWeek = (date: string | Date | undefined) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', {
      weekday: 'long'
    });
  };

  // Helper functions to check if sections have data
  const hasGeneralData = () => {
    return !productsLoading && (product.name || product?.description);
  };

  const hasColorData = () => {
    return !productsLoading && product.color;
  };

  const hasCategoryData = () => {
    return !productsLoading && product?.category?.name;
  };

  const hasPriceData = () => {
    return !productsLoading && (product?.price !== null && product?.price !== undefined ||
      product?.buyingPrice !== null && product?.buyingPrice !== undefined);
  };

  const hasQuantityData = () => {
    return !productsLoading && (product?.quantity !== null && product?.quantity !== undefined);
  };

  const hasCreatedData = () => {
    return !productsLoading && product.createdAt;
  };

  // Calculate remaining quantity (for now, assume 80% remaining as example)
  const soldQuantity = Math.floor((product.quantity || 0) * 0.2);
  const remainingQuantity = (product.quantity || 0) - soldQuantity;

  return (
    <main className="product-page">
      <div className={`page-product-details ${productsLoading ? 'loading-page' : ''}`}>
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.products.index}
          title="Product details"
          hasSearch={false}
        />

        <div className="main-content">
          <section className="product-details-header">
            <DetailCardHeader
              title={productsLoading ? "Loading product name..." : (product.name || "Product")}
              icon="inventory_2"
            />
          </section>

          {(product.image || productsLoading) && (
            <section className='image'>
              <DetailCard title="Image">
                {productsLoading ? (
                  <div className="image-placeholder">Loading image...</div>
                ) : (
                  <div className="product-image-container">
                    <Image
                      src={product?.image || '/placeholder-product.png'}
                      alt={`Product ${product.name} image`}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </DetailCard>
            </section>
          )}

          {(hasGeneralData() || productsLoading) && (
            <section>
              <DetailCard title="General">
                <DetailCardItem
                  title="Name"
                  name={productsLoading ? "Loading name..." : product.name}
                />
                <DetailCardItem
                  title="Description"
                  name={productsLoading ? "Loading description..." : product?.description}
                />
              </DetailCard>
            </section>
          )}

          {(hasColorData() || productsLoading) && (
            <section>
              <DetailCard title="Color">
                <div className="color-display-item">
                  <div className="color-info">
                    <span className="color-label">Name</span>
                    <span className="color-name">
                      {productsLoading ? "Loading color..." : (product.color || null)}
                    </span>
                  </div>
                  {!productsLoading && product.color && (
                    <div
                      className="color-circle"
                      style={{
                        backgroundColor: getColorHex(product.color),
                      }}
                    ></div>
                  )}
                </div>
              </DetailCard>
            </section>
          )}

          {(hasCategoryData() || productsLoading) && (
            <section>
              <DetailCard title="Category">
                <DetailCardItem
                  title="Type"
                  name={productsLoading ? "Loading category..." : product?.category?.name}
                />
                <DetailCardItem
                  title="Type"
                  name="Can"
                />
                <DetailCardItem
                  title="Type"
                  name="Sports"
                />
              </DetailCard>
            </section>
          )}

          {(hasPriceData() || productsLoading) && (
            <section>
              <DetailCard title="Price">
                <DetailCardItem
                  title="Selling Price"
                  name={productsLoading ? "Loading selling price..." : (product?.price ? `Rs ${product.price}` : null)}
                />
                <DetailCardItem
                  title="Buying Price"
                  name={productsLoading ? "Loading buying price..." : (product?.buyingPrice ? `Rs ${product.buyingPrice}` : null)}
                />
              </DetailCard>
            </section>
          )}

          {(hasQuantityData() || productsLoading) && (
            <section>
              <DetailCard title="Quantity">
                <DetailCardItem
                  title="Total"
                  name={productsLoading ? "Loading total..." : (product?.quantity !== null && product?.quantity !== undefined ? `${product.quantity} pieces` : null)}
                />
                <DetailCardItem
                  title="Sold"
                  name={productsLoading ? "Loading sold..." : (product?.quantity !== null && product?.quantity !== undefined ? `${soldQuantity} Pieces` : null)}
                />
                <DetailCardItem
                  title="Remaining"
                  name={productsLoading ? "Loading remaining..." : (product?.quantity !== null && product?.quantity !== undefined ? `${remainingQuantity} Pieces` : null)}
                />
              </DetailCard>
            </section>
          )}

          {(product.deliveryDate || productsLoading) && (
            <section>
              <DetailCard title="Delivery">
                <DetailCardItem
                  title="Date"
                  name={productsLoading ? "Loading date..." : formatDate(product.deliveryDate)}
                />
                <DetailCardItem
                  title="Time"
                  name={productsLoading ? "Loading time..." : formatTime(product.deliveryDate)}
                />
                <DetailCardItem
                  title="Day"
                  name={productsLoading ? "Loading day..." : formatDayOfWeek(product.deliveryDate)}
                />
              </DetailCard>
            </section>
          )}

          {(hasCreatedData() || productsLoading) && (
            <section>
              <DetailCard title="Created">
                <DetailCardItem
                  title="Date"
                  name={productsLoading ? "Loading date..." : formatDate(product.createdAt)}
                />
                <DetailCardItem
                  title="Time"
                  name={productsLoading ? "Loading time..." : formatTime(product.createdAt)}
                />
                <DetailCardItem
                  title="Day"
                  name={productsLoading ? "Loading day..." : formatDayOfWeek(product.createdAt)}
                />
              </DetailCard>
            </section>
          )}

          <div className="action-buttons">
            <Button
              className="btn-edit"
              iconName="edit"
              title={productsLoading ? "Loading..." : "Edit"}
              type={ButtonTypes.Button}
              variant="rounded"
              isDisabled={productsLoading}
              clickHandler={() => router.push(appRoutes.products.edit(slug as string))}
            />

            <Button
              className="btn-delete"
              iconName="delete"
              title={productsLoading ? "Loading..." : "Delete"}
              type={ButtonTypes.Submit}
              variant="rounded"
              isDisabled={productsLoading}
              clickHandler={() => setErrorModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Delete product"
        description="Are you sure you want to delete this product?"
        isOpen={errorModalOpen}
        primaryText='Confirm'
        secondaryText='Cancel'
        primaryClick={submitDeleteproduct}
        secondaryClick={() => setErrorModalOpen(false)}
      />
    </main>
  );
}