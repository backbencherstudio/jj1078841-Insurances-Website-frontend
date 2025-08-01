'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';



export default function TodayTable() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [showMeeting, setShowMeeting] = useState(false);
    const setMeeting = (data: FormData) => {

    }
    return (
        <div className="bg-white rounded-lg">
            {/* <h3 className='bg-[#1e90ff] text-white font-medium text-xl p-2 rounded-t-md'>Today</h3> */}
            <div className='bg-white rounded-b-md'>
                <table className="w-full">
                    <thead className="">
                        <tr className="">
                            <th className="text-start text-sm p-2 bg-[#f9f9f9]">Task</th>
                            <th className="text-start text-sm p-2 bg-[#f9f9f9]">Status</th>
                            <th className="text-start text-sm p-2 bg-[#f9f9f9]">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-2 text-xs">Upload Photos of Damage</td>
                            <td className="p-2 text-xs text-red-500 font-medium">
                                Incomplete
                            </td>
                            <td className="p-2 text-xs">Not Updated</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2 text-xs">Upload Insurance Policy / Declaration Page	</td>
                            <td className="p-2 text-xs text-red-500 font-medium">
                                Incomplete
                            </td>
                            <td className="p-2 text-xs">Not Updated</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2 text-xs">Submit Signed Public Adjuster Agreement	</td>
                            <td className="p-2 text-xs text-red-500 font-medium">
                                Incomplete
                            </td>
                            <td className="p-2 text-xs">Not Updated</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2 text-xs">Schedule Inspection (if needed)</td>
                            <td className="p-2 text-xs text-red-500 font-medium cursor-pointer">
                                <form onSubmit={handleSubmit(setMeeting)} className="">
                                    {!showMeeting && <label htmlFor="date" className="cursor-pointer" onClick={()=>setShowMeeting(prev=>!prev)}>Click to Schedule</label>}
                                    {showMeeting &&
                                        <div className='flex flex-col gap-1'>
                                            <input type="date" name="schedule" id="schedule" className="border p-1 w-fit rounded-sm"
                                                {...register("date", {
                                                    required: "Enter Meeting date.",
                                                })}
                                            />
                                            {errors.date && (
                                                <span className="text-red-500 text-[10px]">{`${errors.date.message}`}</span>
                                            )}
                                            <input type="time" name="time" id="time" className="border p-1 w-fit rounded-sm"
                                                {...register("time", {
                                                    required: "Enter select time.",
                                                })}
                                            />
                                            {errors.time && (
                                                <span className="text-red-500 text-[10px]">{`${errors.time.message}`}</span>
                                            )}
                                            <button type="submit" className="text-white bg-green-500 w-fit px-3 py-1 rounded-sm cursor-pointer">Send</button>
                                        </div>}
                                </form>
                            </td>
                            <td className="p-2 text-xs">Not Updated</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2 text-xs">Await Response from Insurance Ally Team	</td>
                            <td className="p-2 text-xs text-red-500 font-medium">
                                Incomplete
                            </td>
                            <td className="p-2 text-xs">Not Updated</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}