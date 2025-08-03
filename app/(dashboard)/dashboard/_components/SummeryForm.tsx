import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import { UserService } from '@/service/user/user.service';

interface userType {
    address: string;
    city: string;
    country: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    state: string;
    zip_code: string;
}


interface ClaimDataType {
    fullName: string;
    claim_number: string;
    policy_number: string;
    address: string;
    city: string;
    country: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    state: string;
    zip_code: string;
    insurance_company: string;
    adjuster: string;
}

interface FormValues {
    fullName: string;
    claim_number: string;
    policy_number: string;
    address: string;
    phone_number: string;
    alternativenumber?: string;
    email: string;
    insurance_company: string;
    adjuster: string;
}


type SummaryFormProps={
    claimData: ClaimDataType;
    id:string;
}



export default function SummaryForm({ claimData, id }: SummaryFormProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<FormValues>();

    useEffect(() => {
        // Set form default values when claimData changes
        reset({
            fullName: claimData?.fullName || '',
            claim_number: claimData?.claim_number || '',
            policy_number: claimData?.policy_number || '',
            address: claimData?.address || '',
            phone_number: claimData?.phone_number || '',
            email: claimData?.email || '',
            insurance_company: claimData?.insurance_company || '',
            adjuster: claimData?.adjuster || ''
        });
    }, [claimData, reset]);

    const saveClaimSummary = async (data: FormValues) => {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('claim_number', data.claim_number);
        formData.append('policy_number', data.policy_number);
        {data.alternativenumber && formData.append('alternativenumber', data.alternativenumber);}
        formData.append('address', data.address);
        formData.append('phone_number', data.phone_number);
        formData.append('email', data.email);
        formData.append('insurance_company', data.insurance_company);
        formData.append('adjuster', data.adjuster);

        if (!claimData?.claim_number) {
            toast.error("Missing claim information");
            return;
        }

        try {
            console.log("Form data : ",formData)
            const res = await UserService.updateClaimSummary(formData, id);

            if (res?.status >= 200 && res?.status < 300) {
                toast.success("Claim summary updated successfully");
            } else {
                toast.error("Failed to update claim summary");
            }
        } catch (err) {
            console.error('Error updating claim summary:', err);
            toast.error(
                err.response?.data?.message ||
                "An error occurred while updating claim summary"
            );
        }
    };

    return (
        <div className='w-full h-full px-4 max-h-[435px] overflow-y-auto rounded-b-md'>
            <Toaster position='top-right'/>
            <form onSubmit={handleSubmit(saveClaimSummary)} className='block p-3 bg-white space-y-2 rounded-b-md'>
                {/* Homeowner Name */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="fullName" className='font-medium'>Homeowner Name*</label>
                    <input
                        type="text"
                        id="fullName"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("fullName", { required: "Enter Homeowner Name." })}
                    />
                    {errors.fullName && (
                        <span className="text-red-500 text-xs">{`${errors.fullName.message}`}</span>
                    )}
                </div>

                {/* Claim Number */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="claim_number" className='font-medium'>Claim Number*</label>
                    <input
                        type="text"
                        id="claim_number"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("claim_number", { required: "Enter Claim Number." })}
                    />
                    {errors.claim_number && (
                        <span className="text-red-500 text-xs">{`${errors.claim_number.message}`}</span>
                    )}
                </div>

                {/* Policy Number */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="policy_number" className='font-medium'>Policy Number*</label>
                    <input
                        type="text"
                        id="policy_number"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("policy_number", { required: "Enter Policy Number." })}
                    />
                    {errors.policy_number && (
                        <span className="text-red-500 text-xs">{`${errors.policy_number.message}`}</span>
                    )}
                </div>

                {/* Homeowner Address */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="address" className='font-medium'>Homeowner Address*</label>
                    <input
                        type="text"
                        id="address"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("phone_number", { required: "Enter Homeowner Address." })}
                    />
                    {errors.address && (
                        <span className="text-red-500 text-xs">{`${errors.address.message}`}</span>
                    )}
                </div>

                {/* Homeowner Phone */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="phone_number" className='font-medium'>Homeowner Phone Number*</label>
                    <input
                        type="tel"
                        id="phone_number"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("phone_number", {
                            required: "Enter Homeowner Phone Number.",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Please enter a valid 10-digit phone number"
                            }
                        })}
                    />
                    {errors.phone_number && (
                        <span className="text-red-500 text-xs">{`${errors.phone_number.message}`}</span>
                    )}
                </div>

                {/* Alternative Phone */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="alternativenumber" className='font-medium'>Alternative Phone Number*</label>
                    <input
                        type="tel"
                        id="alternativenumber"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("alternativenumber", {
                            required: false,
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Please enter a valid 10-digit phone number"
                            }
                        })}
                    />
                    {errors.alternativenumber && (
                        <span className="text-red-500 text-xs">{`${errors.alternativenumber.message}`}</span>
                    )}
                </div>

                {/* Email */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="email" className='font-medium'>Email Address*</label>
                    <input
                        type="email"
                        id="email"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("email", {
                            required: "Enter Email Address.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">{`${errors.email.message}`}</span>
                    )}
                </div>

                {/* Insurance Company */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="insurance_company" className='font-medium'>Insurance Company*</label>
                    <input
                        type="text"
                        id="insurance_company"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("insurance_company", { required: "Enter Insurance Company." })}
                    />
                    {errors.insurance_company && (
                        <span className="text-red-500 text-xs">{`${errors.insurance_company.message}`}</span>
                    )}
                </div>

                {/* Insurance Adjuster */}
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="adjuster" className='font-medium'>Insurance Adjuster*</label>
                    <input
                        type="text"
                        id="adjuster"
                        className='border-2 rounded-sm outline-none p-2 text-sm'
                        {...register("adjuster", { required: "Enter Insurance Adjuster." })}
                    />
                    {errors.adjuster && (
                        <span className="text-red-500 text-xs">{`${errors.adjuster.message}`}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className='text-white bg-[#1e90ff] px-4 py-1 text-sm font-medium rounded-sm cursor-pointer hover:bg-[#0c7bd8] transition-colors'
                >
                    Save
                </button>
            </form>
        </div>
    )
}