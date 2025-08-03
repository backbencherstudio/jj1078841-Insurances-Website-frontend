'use client'

import { useParams } from "next/navigation";
import Dashboard from "../_components/Dashboard";

export default function page(){
    const {id} = useParams();
    return(
        <Dashboard id={`${id}`}/>
    )
}