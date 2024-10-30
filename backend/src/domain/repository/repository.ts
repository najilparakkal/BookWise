import { esClient } from "../../config/elasticSearch";
import { Books } from "../../framworks/pdf";
import { Users } from "../../framworks/users";
import { IUserDetails } from "../entities/Interfaces";

export default {
  signUp: async (userData: IUserDetails, password: string) => {
    try {
      const findUser = await Users.find({ email: userData.email });
      if (findUser.length === 0) {
        const newUser = await Users.create({
          email: userData.email,
          userName: userData.userName,
          password: password,
        });
        console.log(newUser);
        return { success: true, newUser };
      } else {
        return { success: false, message: "user already exists" };
      }
    } catch (error) {
      console.log(error);
    }
  },
  signIn: async (email: string) => {
    try {
      return await Users.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  },
  upload: async (email: string, data: string) => {
    // try {
    //     const uploadPdf = await Pdf.create({
    //       userEmail: email,
    //       pdf: data,
    //     })
    //     return {success:true,uploadPdf};
    // } catch (error) {
    //     console.log(error)
    // }
  },
  history: async (email: string) => {
    // try {
    //   return await Pdf.find({userEmail:email})
    // } catch (error) {
    //   console.log(error)
    // }
  },
  listAllBooks: async () => {
    try {
      return await Books.find();
    } catch (error) {
      console.log(error);
    }
  },
  search: async (query: string) => {
    const terms = query.split(" "); // Split the query into terms
    try {
      const result = await esClient.search({
        index: "books",
        body: {
          query: {
            bool: {
              should: [
                {
                  multi_match: {
                    query: query,
                    fields: ["title", "author", "year"],
                    type: "best_fields", // This will find the best match across the fields
                  },
                },
                ...terms.map(term => ({
                  multi_match: {
                    query: term,
                    fields: ["title", "author", "year"],
                    type: "best_fields",
                  },
                })),
              ],
            },
          },
        },
      });
  
      console.log(result.hits.hits, "🌹");
  
      const books = result.hits.hits.map((hit: any) => ({
        id: hit._id,
        ...hit._source,
      }));
      return books;
    } catch (error) {
      console.error("Elasticsearch error:", error);
      throw error;
    }
  },
  
    
};
