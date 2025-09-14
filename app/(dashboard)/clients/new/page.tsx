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
import { IAddClientParams } from '@/types/api/client';
import { clientApiService } from '@/services/api/client';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, FormGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Icon from '@/components/icon/icon';

import './styles.scss';
import '../styles.scss';
import '@/components/form-input/style.scss';
import Modal from '@/components/modal/modal';
import { Form } from 'rsuite';

// Form interface - payments is a single string for the radio group
interface INewClientFormData extends Omit<IAddClientParams, 'payments' | 'credit'> {
  payments: string;
  credit: {
    amount?: number;
    note: string;
    dueDateTime: dayjs.Dayjs | null;
  };
}

export default function NewClients() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<INewClientFormData>({
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
      deliveryDateTime: undefined,
      payments: '',
      credit: { amount: undefined, note: '', dueDateTime: null }
    }
  });

  const router = useRouter();
  const { payments } = useAppDataContext();

  const [isBtnDisabled, setBtnIsDisabled] = useState<boolean>(false);
  const [location, setLocation] = useState<TLocation>({ lat: 0, lng: 0 });
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  // Set "Juice" as default payment when payments data is loaded
  useEffect(() => {
    if (payments && payments.length > 0) {
      const juicePayment = payments.find(payment => payment.value === 'Juice');
      if (juicePayment) {
        setValue('payments', juicePayment._id);
      }
    }
  }, [payments, setValue]);


  const onSubmit = async (data: any) => {
    setBtnIsDisabled(true);

    try {
      // Prepare credit data
      const creditData: any = {};
      if (data.credit.amount && data.credit.amount !== '') {
        creditData.amount = parseFloat(data.credit.amount) || undefined;
      }
      if (data.credit.note && data.credit.note !== '') {
        creditData.note = data.credit.note;
      }
      if (data.credit.dueDateTime) {
        creditData.dueDateTime = data.credit.dueDateTime.format('YYYY-MM-DD');
      }

      data = {
        ...data,
        payments: [data.payments],
        credit: Object.keys(creditData).length > 0 ? creditData : undefined,
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

      const { status } = await clientApiService.createClient(data);

      if (status === 'success') {
        router.push(appRoutes.clients.index);
      } else {
        setBtnIsDisabled(false);
        setErrorModalOpen(true);
      }
    } catch (error) {
      setBtnIsDisabled(false);
      setErrorModalOpen(true);
      console.error('Error creating client:', error);
    }
  };

  const handleAddLoc = (e: TLocation) => setLocation(e);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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


            <div className="business-info vertical-fields">
              <div className="header">
                <label htmlFor="shops.shopName">Company</label>
                <span>Details about the company of the client.</span>
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


            <div className="credit-info vertical-fields">
              <div className="header">
                <label htmlFor="shops.shopName">Credit</label>
                <span>Due amount details.</span>
              </div>

              <div className="credit-amount-wrapper">
                <div className="form-input">
                  <div className="input-field">
                    <div className="currency-prefix"><strong>Rs</strong></div>
                    <input
                      {...register('credit.amount', { required: false })}
                      className="input-field__control"
                      type="text"
                      name="credit.amount"
                      placeholder="Credit Amount"
                      style={{ paddingLeft: '45px' }}
                    />
                  </div>
                </div>
              </div>

              <Controller
                name="credit.dueDateTime"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    slotProps={{
                      textField: {
                        placeholder: 'Due Date',
                        variant: 'outlined',
                        fullWidth: true,
                        InputProps: {
                          endAdornment: (
                            <Icon iconName="calendar_month" />
                          ),
                        },
                        sx: {
                          marginBottom: '5px',
                          gap: '10px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '75px',
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            padding: '15px 18px',
                            transition: 'all 0.3s ease-in-out',
                            backgroundColor: 'white',
                            gap: '10px',
                            '& input': {
                              padding: '0',
                              fontSize: '16px',
                            },
                            '& fieldset': {
                              border: '1.5px solid rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1b1b1b',
                              borderWidth: '1.5px',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            display: 'none',
                          },
                          '& .MuiInputAdornment-root': {
                            color: 'rgba(0, 0, 0, 0.23)',
                            marginRight: '10px',
                            marginLeft: '0',
                            '& .icon': {
                              fontSize: '22px',
                            },
                          },
                          '& input::placeholder': {
                            fontSize: '14px',
                            fontWeight: '500',
                            opacity: '1',
                            color: 'rgba(0, 0, 0, 0.6)',
                          },
                          // Style the help text inside the input
                          '& .MuiInputBase-input': {
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize: '14px',
                            fontWeight: '500',
                            paddingLeft: '8px',
                          },
                          // Remove webkit appearance and iOS styling
                          '& input': {
                            WebkitAppearance: 'none',
                            appearance: 'none',
                            WebkitTapHighlightColor: 'transparent',
                            WebkitTouchCalloutColor: 'none',
                            WebkitUserSelect: 'text',
                            userSelect: 'text',
                          },
                        },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="credit.note"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <div className="form-input">
                    <div className="input-field">
                      <textarea
                        className="input-field__control input-field__textarea"
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                        placeholder="Description"
                        style={{
                          borderRadius: '20px',
                          resize: 'none',
                          minHeight: '60px',
                          height: 'auto',
                          overflow: 'hidden',
                          fontFamily: 'inherit',
                          lineHeight: '1.5',
                          fontSize: '16px',
                          width: '100%',
                          padding: '15px 18px',
                          border: '1.5px solid rgba(0, 0, 0, 0.23)',
                          outline: 'none',
                          transition: 'all 0.3s ease-in-out',
                          marginBottom: '5px'
                        }}
                      />
                    </div>
                  </div>
                )}
              />
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
            title="Submit"
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
          description="An error occurred while trying to create a new client. Please try again or verify the values you are inputting."
          isOpen={errorModalOpen}
          primaryText='Try again'
          primaryClick={() => {
            setErrorModalOpen(false);
            setBtnIsDisabled(false);
          }}
        />
      </section>
    </LocalizationProvider>
  );
}
