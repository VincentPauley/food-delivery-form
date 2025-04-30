import { useForm } from 'react-hook-form'

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
}

export const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>()

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData)
  }

  const onError = (errors) => {
    console.log(errors)
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          {...register('customerName', {
            required: 'customer name is required'
          })}
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
