import { useForm, FieldErrors } from 'react-hook-form'

import { TextField } from './controls/TextField'

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
  email: string;
}

export const FoodDeliveryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      customerName: ''
    }
  })

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData)
  }

  const onError = (err: FieldErrors) => {
    console.log(err)
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-floating mb-3">
        <TextField
          label="Customer Name"
          {...register('customerName', {
            required: 'This field is required.'
          })}
          error={errors.customerName}
        />
      </div>
      <div className="form-floating mb-3">
        <TextField
          label="Mobile Number"
          {...register('mobile', {
            minLength: {
              value: 10,
              message: 'Must be 10 digits'
            },
            maxLength: {
              value: 10,
              message: 'Must be 10 digits'
            },
            required: 'This field is required.'
          })}
          error={errors.mobile}
        />
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          {
            ...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'valid email required'
              },
              validate: {
                notFake: (value) => {
                  if (value === 'email@gmail.com') {
                    return 'particular email is blocked'
                  }
                  return true
                },
                notOnBlockedHosts: (value) => {
                  if (value.endsWith('.gov')) {
                    return 'that TLD is not supported'
                  }
                  return true
                }
              }
            })
          }
        />
        <label>Email</label>
        { errors.email &&
          <div>{errors.email?.message}</div>
        }
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
