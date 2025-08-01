export default function DocumentCard({title}){
    return(
        <div className="bg-[#f9f9f9] p-4 rounded-lg space-y-2 grow min-w-fit">
            <h3 className="text-center">{title}</h3>
            <div className="min-h-[80px] text-center block border border-dashed bg-white rounded">
                <h3>No documents yet</h3>
            </div>
            <label htmlFor="policydocs" className="block text-xs w-fit cursor-pointer font-medium pt-3"> <span className="p-1 rounded bg-white border border-[#666]">Choose file</span><span> No file choosen</span></label>
            <input type="file" name="policydocs" id="policydocs" className="hidden"/>
            <span className="text-xs text-center w-full block">Last Update: None</span>
        </div>
    )
}