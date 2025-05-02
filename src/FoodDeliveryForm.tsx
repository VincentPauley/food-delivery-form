import { useForm, FieldErrors } from 'react-hook-form'

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
  email: string;
}

export const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>({
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
              }
            })
          }
        />
        <label>Email</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
