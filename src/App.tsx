import { UserAvatar } from "./components/UserAvatar/UserAvatar";

function App() {
  return (
    <div className="App">
      <UserAvatar size={84} />
      <UserAvatar
        profileUrl="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        name="Pedro Duarte"
      />
    </div>
  );
}

export default App;
