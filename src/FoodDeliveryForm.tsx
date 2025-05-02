import { useForm, FieldErrors } from 'react-hook-form'

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
  email: string;
}

export const FoodDeliveryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      customerName: 'snoopy'
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
        <input
          type="text"
          className="form-control"
          {...register('customerName')}
          // ^ destructuring register attaches all of the props
          // with same name like name, ref, onChange, onBlur to the input
        />
        <label>Customer Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          {...register('mobile', {
            minLength: 10,
            maxLength: 10,
            required: true
          })}
        />
        <label>Mobile</label>
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
