import { useEffect, useState } from "react";
import { ModelProduct, Product } from "./models/product_model";
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());


function Products() {


const { data, error } = useSWR('/api/products', fetcher);


if (error) return <div>Failed to load</div>;
if (!data) return <div>Loading...</div>;
const parsed = JSON.parse(data);
const items: ModelProduct[] = parsed?.items?.map((item: Product) => new ModelProduct(item)) ?? [];
return (
  <div>
    <h1>Products list</h1>
    <ul>
    {items.map((value, index) => {
      return <li key={index}>{value.print()}</li>
    })}
  </ul>
  </div>
  )}

  
  export default Products