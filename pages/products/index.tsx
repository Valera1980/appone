import { ModelProduct, Product } from "./models/product_model";
import useSWR from 'swr';
import DataTable from 'react-data-table-component';

const fetcher = (url: string) => fetch(url).then((res) => res.json());


function Products() {

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


if (error) return <div>Failed to load</div>;
if (!data) return <div>Loading...</div>;
const parsed = JSON.parse(data);
const items: ModelProduct[] = parsed?.items?.map((item: Product) => new ModelProduct(item)) ?? [];
return (
  <div>
    <h1>Products list</h1>
    <DataTable
            columns={columns}
            data={items}
        />
  </div>
  )}

  
  export default Products



  
