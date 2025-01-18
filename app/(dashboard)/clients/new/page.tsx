'use client'
import TopBar from '@/components/top-bar/top-bar';
import '../styles.scss';
import { appRoutes } from '@/constants/routes/app-routes';
import FormInput from '@/components/form-input/form-input';
import { useForm } from 'react-hook-form';
import './styles.scss'
import Button from '@/components/button/button';

import { ButtonTypes } from '@/enums/button-types';


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
            <label htmlFor="firstName">General info</label>

            <FormInput
              {...register('firstName', { required: true })}
              title="firstName"
              type="text"
              hint="First Name"
            />
            {errors.email && <span>This field is required</span>}
            <FormInput
              {...register('lastName', { required: true, })}
              title="lastName"
              type="text"
              hint="Last Name"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <br />
          <FormInput
            {...register('brn', { required: false, })}
            title="brn"
            type="text"
            hint="Business Registration Number (BRN)"
          />
          {errors.password && <span>This field is required</span>}
          <br />
          <FormInput
            {...register('shop', { required: true, })}
            title="shop"
            type="text"
            hint="Shop Name"
          />
          {errors.password && <span>This field is required</span>}
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