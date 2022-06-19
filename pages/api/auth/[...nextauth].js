import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

// this here, we want to add the google authentication tokens here, this helps us access the google next authentication.
export default NextAuth({
 
    providers: [
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    // we add callbacks, callbacks are async functions that control when a session is initialized

   callbacks: {
       async session({session, token}){
           session.user.tag = session.user.name.split(" ").join("").toLocaleLowerCase();
           session.user.uid = token.sub; 
           return session;
       },
   },
   //    this would add a secret to my enviornment variables
   secret: process.env.JWT_SECRET
})
// next step after adding googleProvider;
// after developing an api for this, we now add a useSession in our app so that it is accessible every where.
