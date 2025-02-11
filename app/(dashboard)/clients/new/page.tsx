'use client';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TopBar from '@/components/top-bar/top-bar';
import '../styles.scss';
import { appRoutes } from '@/constants/routes/app-routes';
import FormInput from '@/components/form-input/form-input';
import './styles.scss';
import Button from '@/components/button/button';

import { ButtonTypes } from '@/enums/button-types';
import GoogleMap, { TLocation } from '@/components/google-maps/google-map';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, FormGroup } from '@mui/material';
import { IAddClientParams, IClient } from '@/types/api/client';
import { clientApiService } from '@/services/api/client';

export default function NewClients() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IAddClientParams>({
    defaultValues: {
      firstName: '',
      lastName: '',
      nid: '',
      brnNumber: null,
      email: '',
      mobileNumber: null,
      phoneNumber: null,
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
      deliveryDateTime: undefined,
      payments: ['']
    }
  });
  const [isBtnDisabled, setBtnIsDisabled] = useState<boolean>(false);
  const [location, setLocation] = useState<TLocation>({ lat: 0, lng: 0 });

  const onSubmit = async (data: any) => {
    data = { ...data, shops: [{ address: { lat: location.lat, long: location.lng } }] };

    clientApiService.createClient(data);
  };

  const handleAddLoc = (e: TLocation) => setLocation(e);

  return (
    <section className="new-clients-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.clients.index}
        title="Add client"
      />

      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="general-info vertical-fields">
            <div className="header">
              <label htmlFor="firstName">General info</label>
              <span>Fill in the required basic info.</span>
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
              <span>Fill in required address or add from the map below.</span>
            </div>

            <FormInput
              {...register('shops.0.address.name', { required: false })}
              title="shops.address.name"
              type="text"
              hint="Addresse"
            />

            <FormInput
              {...register('shops.0.address.city', { required: false })}
              title="shops.address.city"
              type="text"
              hint="City"
            />
          </div>

          <div className="address-map vertical-fields">
            <div className="header">
              <label htmlFor="maps">Pin Point</label>
              <span>Add the current location by clicking the (+) button</span>
            </div>

            <GoogleMap
              zoom={17}
              clickAddLoc={handleAddLoc}
            />
          </div>

          <div className="business-info vertical-fields">
            <div className="header">
              <label htmlFor="shops.shopName">Company</label>
              <span>Details about the company of the client.</span>
            </div>

            <FormInput
              {...register('shops.0.shopName', { required: false })}
              title="shop.shopName"
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
              <span>Add delivery date for reminders.</span>
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
              <span>Select the payment type of this client.</span>
            </div>

            <FormControl>
              <Controller
                rules={{ required: true }}
                control={control}
                name="payments.0"
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="6793ba84790a0829fd04067d"
                      control={<Radio />}
                      label="Cash"
                    />
                    <FormControlLabel
                      value="671cfd5448a2b25d4edce7f8"
                      control={<Radio />}
                      label="Juice"
                    />
                    <FormControlLabel
                      value="6793ba94790a0829fd04067e"
                      control={<Radio />}
                      label="Cheque"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </div>
        </form>
      </div>

      <div className="btn-submit">
        <Button
          title="Submit"
          titleBold={true}
          type={ButtonTypes.Button}
          variant="rounded"
          clickHandler={handleSubmit(onSubmit)}
          isDisabled={isBtnDisabled}
        />
      </div>
    </section>
  );
}
