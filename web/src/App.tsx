function App() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    e.currentTarget.reset();
  };

  const status = "online";
  return (
    <>
      <p>My statues: {status}</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="">
          <h4>Write this</h4>
          <input type="text" name="msg" id="" />
        </label>
      </form>

      <div>
        <h3>Received</h3>
        <p>Message</p>
      </div>
    </>
  );
}

export default App;
