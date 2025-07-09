import {Account, Avatars, Client, Databases, ID, Query,Storage} from 'react-native-appwrite'
import {CreateUserParams, SignInParams} from "@/type";
import useAuthStore from "@/store/auth.store";
export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform:"com.monu.fooddev",
    projectID:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseID:'68693e06003b2c64f7a3',
    bucketId:'686d338e0023a36f0913',
    userCollectionId:'68693e38003b1fe651ec',
    categoriesCollectionId:'686d0b950013b8676001',
    menuCollectionId:'686d0ca50008ac7bdde3',
    customizationsCollectionId:'686d31a00001b1f57126',
    menuCustomizationCollectionId:'686d3277002c4e19d36d'
}


export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setPlatform(appwriteConfig.platform)
    .setProject(appwriteConfig.projectID!)

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client)
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
export const logout = async () => {
    try {
        await account.deleteSession('current'); // logs out the current session
    } catch (err) {
        console.error("Logout error:", err);
        throw new Error("Failed to logout");
    }
};

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

export const  getMenu = async ({category,query,limit})=>{
    try{
        const queries:string[] = [];
        if(category) queries.push(Query.equal("categories", category));
        if(query) queries.push(Query.search("name", query));
        if (limit) queries.push(Query.limit(limit));

        const menus = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.menuCollectionId,
             queries
        )
    return menus.documents;

    }catch (err: any) {
        console.error("getMenu error:", err);
        throw new Error(err.message || "Unknown error");
    }
}

export const getCategories = async ()=>{
    try {
        const categories = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.categoriesCollectionId,
        )
        return categories.documents;

    }catch (err: any) {
        console.error("getCategies error:", err);
        throw new Error(err.message || "Unknown error");
    }
}
