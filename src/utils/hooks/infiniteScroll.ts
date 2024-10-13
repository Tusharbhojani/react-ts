import { useEffect, useState } from "react";

export default function useInfiniteScroll() {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  

  async function getPageData() {
    console.log("fetching data page index: " + pageIndex);

    const skip = (pageIndex - 1) * 10;
    const url = `https://dummyjson.com/products?limit=10&skip=${skip}`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setProducts((prev: any) => [...prev, ...data.products]);

      if (data.products.length < 10) {
        setIsLoadMore(false);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPageData();
  }, [pageIndex]);

  return { products, setProducts, setPageIndex, isLoadMore, isLoading };
}
