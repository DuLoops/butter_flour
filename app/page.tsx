import Landing from "./Landing"
import Order from "./Order"
export default function Home() {
  return (
      <div className='w-screen overflow-x-hidden box-border md:p-5 lg:p-10 flex flex-col'>
        <Landing />
        <Order />
      </div>
  )}
  