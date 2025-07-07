import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite'
import {CreateUserParams, SignInParams} from "@/type";
export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform:"com.monu.fooddev",
    projectID:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseID:'68693e06003b2c64f7a3',
    userCollectionId:'68693e38003b1fe651ec'

}


export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setPlatform(appwriteConfig.platform)
    .setProject(appwriteConfig.projectID!)

export const account = new Account(client);
export const database = new Databases(client);
const  avatars = new Avatars(client);


export const createUser = async ({ name, email, password }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw new Error("Account creation failed");



        const avatarUrl = avatars.getInitialsURL(name);

        await database.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        );
        await signIn({ email, password });
    } catch (err: any) {
        console.error("Create user error:", err);
        throw new Error(err.message || "Unknown error");
    }
};

export const signIn = async ({email,password}:SignInParams)=>{
  try{
   const session = await  account.createEmailPasswordSession(email,password);

  }catch(err){
   throw new Error(err as string);
  }
}

export const getCurrentUser = async () => {
    try {
        const currentAcc = await account.get();
        if (!currentAcc) throw new Error("User not found in Appwrite account");

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAcc.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0)
            throw new Error("User not found in database collection");

        return currentUser.documents[0];
    } catch (err: any) {
        console.error("getCurrentUser error:", err);
        throw new Error(err.message || "Unknown error in getCurrentUser");
    }
};
