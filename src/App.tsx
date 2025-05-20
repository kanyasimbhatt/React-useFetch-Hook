import "./App.css";
import useFetch from "./hooks/useFetch";

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [isLoading, data, isError] = useFetch<Task>(
    "https://jsonplaceholder.typicode.com/todos/1",
    "get",
    true
  );

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Faced an error</h1>}
      {!isLoading && !isError && (
        <>
          <h1>Data received</h1>
          <h2>Title: {data && data!.title}</h2>
          <h2>Status: {data && data!.completed ? "Completed" : "Pending"}</h2>
        </>
      )}
    </>
  );
}

export default App;
