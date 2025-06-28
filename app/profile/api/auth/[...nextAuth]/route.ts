import nextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
 
 
const authHandler=nextAuth({
    providers:[
        CredentialProvider({
            name:"Credentials",
            credentials:{
                username:{label:"Username",type:"text",placeholder:"jsmith"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                try{
                    return null
                }catch(e){
                    throw new Error(e)
                }
            }
        })
    ]
})


export {authHandler as GET,authHandler as POST}