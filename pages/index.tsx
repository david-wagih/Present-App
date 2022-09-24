import type { NextPage } from 'next'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
