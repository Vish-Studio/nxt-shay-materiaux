'use client'
import TopBar from '@/components/top-bar/top-bar';
import '../styles.scss';
import { appRoutes } from '@/constants/routes/app-routes';
import FormInput from '@/components/form-input/form-input';
import { useForm } from 'react-hook-form';
import './styles.scss'
import Button from '@/components/button/button';

import { ButtonTypes } from '@/enums/button-types';
import GoogleMap from '@/components/google-maps/google-map';


export default function NewClients() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log('');
  };

  return (
    <section className="new-clients-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.clients.index}
        title="Add clients"
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
              hint="National ID"
            />
            {errors.nid && <span>This field is required</span>}
          </div>

          <div className="contact-info vertical-fields">
            <label htmlFor="tel">Contact</label>

            <div className="horizontal-fields">
              <FormInput
                {...register('phone', { required: false })}
                title="phone"
                type="number"
                hint="Phone"
              />

              <FormInput
                {...register('mobile', { required: false })}
                title="mobile"
                type="number"
                hint="Mobile"
              />
            </div>
          </div>

          <div className="address-info vertical-fields">
            <div className="header">
              <label htmlFor="adress">Address</label>
              <span>Fill in required address or add from the map below.</span>
            </div>

            <FormInput
              {...register('adress', { required: false })}
              title="adress"
              type="text"
              hint="Addresse"
            />

            <FormInput
              {...register('city', { required: false })}
              title="city"
              type="text"
              hint="City"
            />

            <div className="google-maps">
              <GoogleMap zoom={9} />
            </div>
          </div>


          <div className="business-info vertical-fields">
            <div className="header">
              <label htmlFor="shopName">Company</label>
              <span>Details about the company of the client.</span>
            </div>

            <FormInput
              {...register('shopName', { required: false, })}
              title="shopName"
              type="text"
              hint="Shop name"
            />

            <FormInput
              {...register('brn', { required: false })}
              title="brn"
              type="text"
              hint="BRN"
            />
          </div>

          <div className="delivery-info vertical-fields">
            <div className="header">
              <label htmlFor="shopName">Delivery</label>
              <span>Add delivery date for reminders.</span>
            </div>

            <FormInput
              {...register('date', { required: false, })}
              title="date"
              type="text"
              hint="Delivery Date"
            />

            <FormInput
              {...register('brn', { required: false })}
              title="brn"
              type="text"
              hint="BRN"
            />
          </div>
        </form>
      </div>

      <div className="btn-submit">
        <Button
          title="Submit"
          titleBold={true}
          type={ButtonTypes.Button}
          clickHandler={onSubmit}
        />
      </div>
    </section>
  )
}