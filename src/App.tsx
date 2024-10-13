import { useEffect, useRef } from "react";
import "./App.css";
import useInfiniteScroll from "./utils/hooks/infiniteScroll";

function App() {
  const ref = useRef(null);

  const { products, setProducts, setPageIndex, isLoadMore, isLoading } =
    useInfiniteScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isLoadMore && !isLoading) {
            setPageIndex((prev) => prev + 1);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, isLoading, isLoadMore]);

  return (
    <div className="App">
      <div className="grid gap-4 p-5 ">
        {products.length > 0 &&
          products.map((product: any, index: number) => {
            const image = product.images[0];
            return (
              <div key={index} className="border shadow rounded">
                <p className=" p-3">{product.title}</p>
                <div className="w-44 mx-auto min-h-44">
                  <img src={image} alt="" />
                </div>
              </div>
            );
          })}

        <div ref={ref} className="border bg-red-400">
          Load Mode
        </div>
      </div>
    </div>
  );
}

export default App;
