import "./App.css";
import { Navbar, PostList } from "./components/index.component";

function App() {
  return (
    <main className=" font-poppins min-h-screen bg-neutral-900 text-gray-200">
      <Navbar />
      <PostList/>
    </main>
  );
}

export default App;
