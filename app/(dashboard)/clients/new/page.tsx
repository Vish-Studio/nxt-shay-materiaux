'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import TopBar from '@/components/top-bar/top-bar';
import '../styles.scss';
import { appRoutes } from '@/constants/routes/app-routes';
import FormInput from '@/components/form-input/form-input';
import './styles.scss'
import Button from '@/components/button/button';

import { ButtonTypes } from '@/enums/button-types';
import GoogleMap from '@/components/google-maps/google-map';
import dayjs, { Dayjs } from 'dayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, FormGroup } from '@mui/material';


export default function NewClients() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const onSubmit = async (data: any) => {
    console.log(data);
  };

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
                {...register('firstName', { required: true })}
                title="firstName"
                type="text"
                hint="First Name"
              />
              {errors.firstName && <span>This field is required</span>}

              <FormInput
                {...register('lastName', { required: true, })}
                title="lastName"
                type="text"
                hint="Last Name"
              />
              {errors.lastName && <span>This field is required</span>}
            </div>

            <FormInput
              {...register('nid', { required: true, })}
              title="nid"
              type="text"
              hint="National ID (NID)"
            />
          </div>

          <div className="contact-info vertical-fields">
            <label htmlFor="phoneNumber">Contact</label>

            <div className="horizontal-fields">
              <FormInput
                {...register('phoneNumber', { required: false })}
                title="phoneNumber"
                type="number"
                hint="Phone"
              />

              <FormInput
                {...register('mobileNumber', { required: false })}
                title="mobileNumber"
                type="number"
                hint="Mobile"
              />
            </div>
          </div>

          <div className="address-info vertical-fields">
            <div className="header">
              <label htmlFor="address">Address</label>
              <span>Fill in required address or add from the map below.</span>
            </div>

            <FormInput
              {...register('shops.address.name', { required: false })}
              title="shops.address.name"
              type="text"
              hint="Addresse"
            />

            <FormInput
              {...register('shops.address.city', { required: false })}
              title="shops.address.city"
              type="text"
              hint="City"
            />
          </div>

          <div className="address-info vertical-fields">
            <div className="header">
              <label htmlFor="maps">Pin Point</label>
              <span>Add the current location by clicking the (+) button</span>
            </div>

            <div className="maps">
              <GoogleMap zoom={17} />
            </div>
          </div>


          <div className="business-info vertical-fields">
            <div className="header">
              <label htmlFor="shops.shopName">Company</label>
              <span>Details about the company of the client.</span>
            </div>

            <FormInput
              {...register('shops.shopName', { required: false, })}
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

            <FormControl className="delivery-options" component="fieldset">
              <FormGroup className='options-list' aria-label="position" row>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Mon"
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Tue"
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Wed"
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Thurs"
                  labelPlacement="bottom"
                />


                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Fri"
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Sat"
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value="bottom"
                  control={<Checkbox />}
                  label="Sun"
                  labelPlacement="bottom"
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
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="juice" control={<Radio />} label="Juice" />
                <FormControlLabel value="cheque" control={<Radio />} label="Cheque" />
              </RadioGroup>
            </FormControl>
          </div>
        </form>
      </div >

      <div className="btn-submit">
        <Button
          title="Submit"
          titleBold={true}
          type={ButtonTypes.Button}
          variant='rounded'
          clickHandler={() => handleSubmit(onSubmit)}
        />
      </div>
    </section >
  )
}