'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Task = {
  id: number;
  name: string;
  status: 'Complete' | 'Incomplete';
  lastUpdated: string;
};

export default function TodayTable() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [showMeeting, setShowMeeting] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Upload Photos of Damage', status: 'Incomplete', lastUpdated: 'Not Updated' },
    { id: 2, name: 'Upload Insurance Policy / Declaration Page', status: 'Incomplete', lastUpdated: 'Not Updated' },
    { id: 3, name: 'Submit Signed Public Adjuster Agreement', status: 'Incomplete', lastUpdated: 'Not Updated' },
    { id: 4, name: 'Schedule Inspection (if needed)', status: 'Incomplete', lastUpdated: 'Not Updated' },
    { id: 5, name: 'Await Response from Insurance Ally Team', status: 'Incomplete', lastUpdated: 'Not Updated' },
  ]);

  const setMeeting = (data: any) => {
    // Handle form submission
    console.log(data);
    setShowMeeting(false);
    // Update the task status
    updateTaskStatus(4, 'Complete');
  };

  const updateTaskStatus = (id: number, newStatus: 'Complete' | 'Incomplete') => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: newStatus, lastUpdated: new Date().toLocaleDateString() } 
        : task
    ));
  };

  const toggleStatus = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTaskStatus(id, task.status === 'Complete' ? 'Incomplete' : 'Complete');
    }
  };

  const handleUpdateStatus=()=>{

  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
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
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-2 text-xs">{task.name}</td>
                <td className="p-2 text-xs">
                  {task.id === 4 ? (
                    <form onSubmit={handleSubmit(setMeeting)}>
                      {!showMeeting ? (
                        <button 
                          type="button"
                          className={`font-medium cursor-pointer ${task.status === 'Complete' ? 'text-green-500' : 'text-red-500'}`}
                          onClick={() => task.status === 'Incomplete' ? setShowMeeting(true) : toggleStatus(task.id)}
                        >
                          {task.status === 'Complete' ? 'Complete' : 'Click to Schedule'}
                        </button>
                      ) : (
                        <div className='flex flex-col gap-1'>
                          <input 
                            type="date" 
                            className="border p-1 w-fit rounded-sm"
                            {...register("date", { required: "Enter Meeting date." })}
                          />
                          {errors.date && (
                            <span className="text-red-500 text-[10px]">{`${errors.date.message}`}</span>
                          )}
                          <input 
                            type="time" 
                            className="border p-1 w-fit rounded-sm"
                            {...register("time", { required: "Enter select time." })}
                          />
                          {errors.time && (
                            <span className="text-red-500 text-[10px]">{`${errors.time.message}`}</span>
                          )}
                          <div className="flex gap-2">
                            <button 
                              type="submit" 
                              className="text-white bg-green-500 w-fit px-3 py-1 rounded-sm cursor-pointer"
                            >
                              Send
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setShowMeeting(false)}
                              className="text-white bg-gray-500 w-fit px-3 py-1 rounded-sm cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  ) : (
                    <button
                      onClick={() => toggleStatus(task.id)}
                      className={`font-medium cursor-pointer ${task.status === 'Complete' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {task.status}
                    </button>
                  )}
                </td>
                <td className="p-2 text-xs">{task.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className='text-white bg-[#1e90ff] px-4 py-1 text-sm font-medium rounded-sm cursor-pointer m-2' onClick={handleUpdateStatus}>Save</button>
    </div>
  )
}