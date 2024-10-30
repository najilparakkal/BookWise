interface JWTInterface {
    secret: string;
    exp: string;
    remember: string;
  }
  
  const JWT = <JWTInterface>{
    exp: process.env.EXPIRY || "1d",
    remember: process.env.REMEMBER || "7d",
    secret: process.env.JWT_SECRET || "",
  };
  
  export default JWT;   
  