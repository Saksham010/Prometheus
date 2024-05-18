import Navbar from '../components/nav';
import Section from '../components/section';
import Footer from '../components/footer';

function Home() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <Section/>
      <Footer/>
    </div>
  )
}

export default Home
