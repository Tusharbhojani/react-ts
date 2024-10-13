import { useEffect, useState } from "react";

export default function useInfiniteScroll() {
  const [products, setProducts] = useState<any>([]);

  async function getPageData() {
    const url = "https://dummyjson.com/products?limit=10&skip=10";
    const options = { method: "GET", headers: { accept: "application/json" } };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPageData();
  }, []);

  return { products, setProducts };
}
