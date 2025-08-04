import ManageClaims from "../../_components/ManageClaims"


export default async function page(props: {   params: Promise<{ id: string }> }) {
const params = await props.params
const { id } = params
console.log("Claim id : ",id);
  return(
    <ManageClaims id={id}/>
  )
}