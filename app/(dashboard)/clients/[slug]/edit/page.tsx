'use client';

import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import TopBar from '@/components/top-bar/top-bar';
import { appRoutes } from '@/constants/routes/app-routes';
import FormInput from '@/components/form-input/form-input';
import Button from '@/components/button/button';
import { ButtonTypes } from '@/enums/button-types';
import GoogleMap, { TLocation } from '@/components/google-maps/google-map';
import { useAppDataContext } from '@/context/AppDataContext';
import { IUpdateClientParams, IClient } from '@/types/api/client';
import { clientApiService } from '@/services/api/client';
import { useApiFetch } from '@/hooks/use-api-fetch';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, FormGroup } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';

import '../../new/styles.scss';
import '../../styles.scss';
import Modal from '@/components/modal/modal';

export default function EditClient() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });

  const { payments } = useAppDataContext();
  const [client, setClient] = useState<IClient | null>(null);
  const [isBtnDisabled, setBtnIsDisabled] = useState<boolean>(false);
  const [location, setLocation] = useState<TLocation>({ lat: 0, lng: 0 });
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IUpdateClientParams>({
    defaultValues: {
      firstName: '',
      lastName: '',
      nid: '',
      brnNumber: '',
      email: '',
      mobileNumber: '',
      phoneNumber: '',
      shops: [
        {
          shopName: '',
          address: {
            name: '',
            city: '',
            lat: 0,
            long: 0
          }
        }
      ],
      deliveryDateTime: [],
      payments: ['']
    }
  });

  // Find and set the client data when component loads
  useEffect(() => {
    if (clientsData && !clientsDataLoading && slug) {
      const foundClient = clientsData.find((client) => client._id === slug);
      if (foundClient) {
        setClient(foundClient);

        // Set location from client data
        if (foundClient.shops?.[0]?.address?.lat && foundClient.shops?.[0]?.address?.long) {
          setLocation({
            lat: foundClient.shops[0].address.lat,
            lng: foundClient.shops[0].address.long
          });
        }

        // Reset form with client data
        reset({
          firstName: foundClient.firstName || '',
          lastName: foundClient.lastName || '',
          nid: foundClient.nid || '',
          brnNumber: foundClient.brnNumber || '',
          email: foundClient.email || '',
          mobileNumber: foundClient.mobileNumber || '',
          phoneNumber: foundClient.phoneNumber || '',
          shops: [
            {
              shopName: foundClient.shops?.[0]?.shopName || '',
              address: {
                name: foundClient.shops?.[0]?.address?.name || '',
                city: foundClient.shops?.[0]?.address?.city || '',
                lat: foundClient.shops?.[0]?.address?.lat || 0,
                long: foundClient.shops?.[0]?.address?.long || 0
              }
            }
          ],
          deliveryDateTime: foundClient.deliveryDateTime || [],
          payments: foundClient.payments?.map(p => p._id) || ['']
        });
      }
    }
  }, [slug, clientsData, clientsDataLoading, reset]);

  const onSubmit = async (data: any) => {
    if (!client?._id) return;

    setBtnIsDisabled(true);

    const updateData = {
      id: client._id,
      ...data,
      payments: [data.payments],
      shops: [
        {
          ...data.shops[0],
          address: {
            ...data.shops[0].address,
            lat: location.lat,
            long: location.lng
          }
        }
      ]
    };

    try {
      const { status } = await clientApiService.updateClient(updateData);

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

  const handleAddLoc = (e: TLocation) => setLocation(e);

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    router.push(appRoutes.clients.index + `/${slug}`);
  };

  if (clientsDataLoading) {
    return (
      <section className="new-clients-page">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index + `/${slug}`}
          title="Edit client"
        />
        <div className="content">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!client) {
    return (
      <section className="new-clients-page">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index}
          title="Edit client"
        />
        <div className="content">
          <p>Client not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="new-clients-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.clients.index + `/${slug}`}
        title="Edit client"
      />

      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="general-info vertical-fields">
            <div className="header">
              <label htmlFor="firstName">General info</label>
              <span>Update the basic info.</span>
            </div>

            <div className="horizontal-fields">
              <FormInput
                {...register('firstName', { required: false })}
                title="firstName"
                type="text"
                hint="First Name"
              />
              {errors.firstName && <span>This field is required</span>}

              <FormInput
                {...register('lastName', { required: false })}
                title="lastName"
                type="text"
                hint="Last Name"
              />
              {errors.lastName && <span>This field is required</span>}
            </div>

            <FormInput
              {...register('nid', { required: false })}
              title="nid"
              type="text"
              hint="National ID (NID)"
            />
          </div>

          <div className="contact-info vertical-fields">
            <label htmlFor="phoneNumber">Contact</label>

            <div className="horizontal-fields">
              <FormInput
                {...register('mobileNumber', { required: false })}
                title="mobileNumber"
                type="tel"
                hint="Mobile"
              />
              <FormInput
                {...register('phoneNumber', { required: false })}
                title="phoneNumber"
                type="tel"
                hint="Phone"
              />
            </div>

            <FormInput
              {...register('email', { required: false })}
              title="email"
              type="email"
              hint="Email"
            />
          </div>

          <div className="address-info vertical-fields">
            <div className="header">
              <label htmlFor="address">Address</label>
              <span>Update address or add from the map below.</span>
            </div>

            <FormInput
              {...register('shops.0.address.name', { required: false })}
              title="shops.address.name"
              type="text"
              hint="Address"
            />

            <FormInput
              {...register('shops.0.address.city', { required: false })}
              title="shops.address.city"
              type="text"
              hint="City"
            />
          </div>

          <div className="business-info vertical-fields">
            <div className="header">
              <label htmlFor="shops.shopName">Company</label>
              <span>Update company details.</span>
            </div>

            <FormInput
              {...register('shops.0.shopName', { required: false })}
              title="shops.shopName"
              type="text"
              hint="Shop name"
            />

            <FormInput
              {...register('brnNumber', { required: false })}
              title="brnNumber"
              type="text"
              hint="Business Registration Number (BRN)"
            />
          </div>

          <div className="delivery-info vertical-fields">
            <div className="header">
              <label htmlFor="deliveryDateTime">Delivery</label>
              <span>Update delivery dates for reminders.</span>
            </div>

            <FormControl
              className="delivery-options"
              component="fieldset"
            >
              <FormGroup
                className="options-list"
                aria-label="position"
                row
              >
                <Controller
                  rules={{ required: false }}
                  control={control}
                  name="deliveryDateTime"
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        {...field}
                        name="mon"
                        value="mon"
                        control={<Checkbox />}
                        label="Mon"
                        labelPlacement="bottom"
                      />

                      <FormControlLabel
                        {...field}
                        name="Tue"
                        value="Tue"
                        control={<Checkbox />}
                        label="Tue"
                        labelPlacement="bottom"
                      />

                      <FormControlLabel
                        name="Wed"
                        value="Wed"
                        control={<Checkbox />}
                        label="Wed"
                        labelPlacement="bottom"
                      />

                      <FormControlLabel
                        name="Thurs"
                        value="Thurs"
                        control={<Checkbox />}
                        label="Thurs"
                        labelPlacement="bottom"
                      />

                      <FormControlLabel
                        name="Fri"
                        value="Fri"
                        control={<Checkbox />}
                        label="Fri"
                        labelPlacement="bottom"
                      />

                      <FormControlLabel
                        name="Sat"
                        value="Sat"
                        control={<Checkbox />}
                        label="Sat"
                        labelPlacement="bottom"
                      />

                      <FormControlLabel
                        name="Sun"
                        value="Sun"
                        control={<Checkbox />}
                        label="Sun"
                        labelPlacement="bottom"
                      />
                    </>
                  )}
                />
              </FormGroup>
            </FormControl>
          </div>

          <div className="payment-info vertical-fields">
            <div className="header">
              <label htmlFor="deliveryDateTime">Payment Type</label>
              <span>Update the payment type of this client.</span>
            </div>

            <FormControl>
              <Controller
                rules={{ required: true }}
                control={control}
                name="payments"
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {payments?.map((payment) => (
                      <FormControlLabel
                        key={payment._id}
                        value={payment._id}
                        control={<Radio />}
                        label={payment.value}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
          </div>
        </form>

        <div className="map-section">
          <GoogleMap
            zoom={13}
            lat={location.lat}
            lng={location.lng}
            clickAddLoc={handleAddLoc}
          />
        </div>
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
        description="An error occurred while trying to update the client. Please try again or verify the values you are inputting."
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
        description="Client has been updated successfully!"
        isOpen={successModalOpen}
        primaryText='OK'
        primaryClick={handleSuccessClose}
      />
    </section>
  );
}
