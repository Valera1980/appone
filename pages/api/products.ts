import path from "path";
import { promises as fs } from "fs";
export default async function handler(req, res) {
  //   return axios.get("public/product.json").then((data) => data);
  const jsonDirectory = path.join(process.cwd(), "public");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/product.json",
    "utf8"
  );
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}
