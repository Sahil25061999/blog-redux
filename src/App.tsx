import "./App.css";
import { Navbar, PostForm, PostList } from "./components/index.component";

function App() {
  return (
    <main className=" font-poppins min-h-screen bg-neutral-900 text-gray-200">
      <Navbar />
      <PostForm />
      <PostList />
    </main>
  );
}

export default App;
