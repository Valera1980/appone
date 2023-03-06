import { ModelProduct, Product } from "./models/product_model";
import useSWR from 'swr';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());


function Products() {

  const [productItems, setProductItems] = useState<ModelProduct[]>();
  const [filteredItems, setFilteredItems] = useState<ModelProduct[]>();

  const columns = [
    {
        name: 'id',
        selector: (row: any) => row.id ?? 'null',
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
    },
    {
      name: 'description',
      selector: (row: any) => row.description,
    },
    {
      name: 'price',
      selector: (row: any) => row.price,
    },
];



const { data, error } = useSWR('/api/products', fetcher);

useEffect(() => {
  if (data) {
    const parsed = JSON.parse(data);
   const items: ModelProduct[] = parsed?.items?.map((item: Product) => new ModelProduct(item)) ?? [];
    setProductItems(items);
    setFilteredItems(items);
  }
}, [data])


const inputText = (e: any) =>  {
  console.log(e.target.value);
  const inputSearch = e.target.value;
  if(!inputSearch?.length){
    setFilteredItems(productItems);
    return;
  }
  
  const newItems = productItems?.filter(item => {
    return item.name.includes(inputSearch) || item.description.includes(inputSearch) || item.price.toString().includes(inputSearch)
  });
  setFilteredItems(newItems);
}

if (error) return <div>Failed to load</div>;
if (!data) return <div>Loading...</div>;



return (
  <div>
    <h1>Products list</h1>
    <div>
      <input placeholder="input text here..."   onChange={inputText}></input>
    </div>
    <DataTable
            columns={columns}
            data={filteredItems!}
        />
  </div>
  )}

  
  export default Products



  
