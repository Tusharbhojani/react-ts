import { useEffect, useRef } from "react";
import "./App.css";
import useInfiniteScroll from "./utils/hooks/infiniteScroll";
import useOnScreen from "./utils/hooks/useOnScreen";

function App() {
  const { ref, isVisible } = useOnScreen({ threshold: 0.5 });

  const { products, setProducts, setPageIndex, isLoadMore, isLoading, setIsLoading } =
    useInfiniteScroll();

  useEffect(() => {
    if (isVisible && isLoadMore && !isLoading) {
      setIsLoading(true);
      setPageIndex((prev) => prev + 1);
    }
  }, [isVisible]);

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
