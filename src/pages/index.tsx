import { useState } from "react";
import { api } from "~/utils/api";


const CreateUserWizard = () => {

  const [ input, setInput ] = useState("")

  const ctx = api.useContext()


  const { mutate } = api.users.create.useMutation({
    onSuccess: () => {
      setInput("")
      void ctx.users.getAll.invalidate()
    }
  })

  // mutate()

  return (
    <div className=" gap-3">
      <input 
      placeholder="eNumber" 
      className="bg-transparent" 
      type="text" 
      value={input}
      onChange={(e) => setInput(e.target.value)}/>
      <button onClick={() => mutate({ enumber: input })}>Send</button>
    </div>
  )

}

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data } = api.users.getAll.useQuery()

  return (
    <>
      <main className="flex justify-center">
        <div>
          <br />
          <h1 className="font-semibold">OAMS - Outdoor Test</h1>
          <br />
          < CreateUserWizard />

          <br />
          <h2>Users:</h2>
          <div>
            {data?.map((user) => (<div key={user.enumber}>{user.enumber}</div>))}
          </div>
        </div>
      </main>
    </>
  );
}
