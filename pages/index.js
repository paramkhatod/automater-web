// pages/index.js (or wherever your Home component is)
import Head from 'next/head'
import HeroSection from '../components/HeroSection' // Assuming Banner is your HeroSection
import Benefit from '../components/RecentBlogs'
import HeroNext from '../components/HeroNext'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Fetures from '../components/fetures'
import Review from '../components/review'
import Scrolling from '../components/scrollIng'
import ScrollVelocity from '../components/velocityScrolling'


export default function Home() {
  return (
    /* Removed font-Poppins, now handled by globals.css */
    <div> 
      <Head>
        <title>Automater - Home</title>
        <link rel="icon" href="/logo1.png" />
      </Head>
      {/* This pink gradient header is perfect for the new theme */}
      <header className='w-full pb-20 md:pb-32 bg-gradient-to-t from-pink-300 to-rose-200 text-gray-800'> 
        <Navbar />
        <HeroSection /> 
      </header>

      <article>
        <ScrollVelocity/>
        
        <Benefit />
        
        <Fetures  />
        <HeroNext />
        <Review />
      </article>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}