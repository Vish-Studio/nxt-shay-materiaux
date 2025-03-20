
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

export default function Product() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { data: productsData, loading: productsLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
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
  }, [slug, productsData]);


  const submitDeleteproduct = async () => {
    const { status } = await productApiService.deleteProduct({ id: slug as string });
    if (status === 'success') {
      router.push(appRoutes.products.index);
    } else {
      setErrorModalOpen(true);
    }
  };


  return (
    <main className="product-page">
      <div className="page-product-details">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.products.index}
          title="product detail"
          hasSearch={false}
        />

        <div className="main-content">
          <section className="product-details-header">
            <DetailCardHeader
              title={product.name}
              icon="inventory_2"

            />
          </section>

          {product.image && (
            <section className='image'>
              <DetailCard title="Image">
                <></>
                <img src={product?.image} alt={`Product ${product.name} image`} />
              </DetailCard>
            </section>
          )}

          <section className='general-info'>
            <DetailCard title="General">
              <DetailCardItem
                title="Name"
                name={product.name || '------'}
              />
              <DetailCardItem
                title="Description"
                name={product?.description || '------'}
              />
            </DetailCard>
          </section>


          <section className='color'>
            <DetailCard title="Color">
              <DetailCardItem
                title="Name"
                name={product.color || '------'}
              />
            </DetailCard>
          </section>


          <section className='categpry'>
            <DetailCard title="Category">
              <DetailCardItem
                title="Type"
                name={product?.category?.name || '------'}
              />
            </DetailCard>
          </section>


          {
            product.price && (
              <section className='price'>
                <DetailCard title="Price">
                  <DetailCardItem
                    title="Selling price"
                    name={`Rs ${product?.price?.selling}` || '------'}
                  />

                  <DetailCardItem
                    title="Buying price"
                    name={`Rs ${product?.price?.buying}` || '------'}
                  />
                </DetailCard>
              </section>
            )
          }


          <Button
            className="btn-delete"
            iconName="delete"
            title="Delete"
            type={ButtonTypes.Submit}
            variant="rounded"
            isDisabled={false}
            onClick={() => setErrorModalOpen(true)}
          />
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
