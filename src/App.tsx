import "./App.css";
import useInfiniteScroll from "./utils/hooks/infiniteScroll";

function App() {
  const { products, setProducts } = useInfiniteScroll();

  return (
    <div className="App">
      <div className="grid gap-4 p-5 ">
        {products.length > 0 &&
          products.map((product: any) => {
            const image = product.images[0];
            return (
              <div className="border shadow rounded">
                <p className=" p-3">{product.title}</p>
                <div className="w-44 mx-auto">
                  <img src={image} alt="" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
