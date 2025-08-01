import { useForm } from 'react-hook-form';


export default function SummaryForm() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const saveClaimSummary = (data: FormData) => {

    }
    return (
        <div className='w-full h-full max-h-[435px] overflow-y-auto rounded-b-md'>
            <form onSubmit={handleSubmit(saveClaimSummary)} className='block p-3 bg-white space-y-2 rounded-b-md'>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="homeownername" className='font-medium'>Homeowner Name*</label>
                    <input
                        type="text"
                        id="homeownername"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("homeownername", {
                            required: "Enter Homeowner Name.",
                        })}
                    />
                    {errors.homeownername && (
                        <span className="text-red-500 text-xs">{`${errors.homeownername.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="claimnumber" className='font-medium'>Claim Number*</label>
                    <input
                        type="text"
                        id="claimnumber"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("claimnumber", {
                            required: "Enter Claim Number.",
                        })}
                    />
                    {errors.claimnumber && (
                        <span className="text-red-500 text-xs">{`${errors.claimnumber.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="policynumber" className='font-medium'>Policy Number*</label>
                    <input
                        type="text"
                        id="policynumber"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("policynumber", {
                            required: "Enter Policy Number.",
                        })}
                    />
                    {errors.policynumber && (
                        <span className="text-red-500 text-xs">{`${errors.policynumber.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="homeowneraddress" className='font-medium'>Homeowner Address*</label>
                    <input
                        type="text"
                        id="homeowneraddress"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("homeowneraddress", {
                            required: "Enter Homeowner Address.",
                        })}
                    />
                    {errors.homeowneraddress && (
                        <span className="text-red-500 text-xs">{`${errors.homeowneraddress.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="homeownerphone" className='font-medium'>Homeowner Phone Number*</label>
                    <input
                        type="text"
                        id="homeownerphone"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("homeownerphone", {
                            required: "Enter Homeowner Phone Number.",
                        })}
                    />
                    {errors.homeownerphone && (
                        <span className="text-red-500 text-xs">{`${errors.homeownerphone.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="alternativenumber" className='font-medium'>Alternative Phone Number*</label>
                    <input
                        type="text"
                        id="alternativenumber"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("alternativenumber", {
                            required: "Enter Alternative Phone Number.",
                        })}
                    />
                    {errors.alternativenumber && (
                        <span className="text-red-500 text-xs">{`${errors.alternativenumber.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="emailaddress" className='font-medium'>Email Address*</label>
                    <input
                        type="text"
                        id="emailaddress"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("emailaddress", {
                            required: "Enter Email Address.",
                        })}
                    />
                    {errors.emailaddress && (
                        <span className="text-red-500 text-xs">{`${errors.emailaddress.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="insurancecompany" className='font-medium'>Insurance Company*</label>
                    <input
                        type="text"
                        id="insurancecompany"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("insurancecompany", {
                            required: "Enter Insurance Company.",
                        })}
                    />
                    {errors.insurancecompany && (
                        <span className="text-red-500 text-xs">{`${errors.insurancecompany.message}`}</span>
                    )}
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="insuranceadjuster" className='font-medium'>Insurance Adjuster*</label>
                    <input
                        type="text"
                        id="insuranceadjuster"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("insuranceadjuster", {
                            required: "Enter Insurance Adjuster.",
                        })}
                    />
                    {errors.insuranceadjuster && (
                        <span className="text-red-500 text-xs">{`${errors.insuranceadjuster.message}`}</span>
                    )}
                </div>
                <button type="submit" className='text-white bg-[#1e90ff] px-4 py-1 text-sm font-medium rounded-sm cursor-pointer'>Save</button>
            </form>
        </div>
    )
}