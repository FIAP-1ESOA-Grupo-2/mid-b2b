import Link from "next/link"

const HomePage = () => {

  return (
    <div>
      LANDING PAGE 2

      <Link className="bg-teal-400 text-white " href='/dashboard'>
        Login
      </Link>
    </div>
  )
}

export default HomePage