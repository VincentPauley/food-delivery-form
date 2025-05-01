import { useForm } from 'react-hook-form'

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
}

export const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>()
                                // ^ provide the type and now form knows what to expect

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData)
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          {...register('customerName', {
            value: 'Vinnie'
          })}
          // ^ destructuring register attaches all of the props
          // with same name like name, ref, onChange, onBlur to the input
        />
        <label>Customer Name</label>
      </div>
      <div className="form-floating mb-3">
      <input
          type="text"
          className="form-control"
          {...register('mobile')}
        />
        <label>Mobile</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
