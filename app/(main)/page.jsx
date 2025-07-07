import Header from '../../components/header/header';
import Image from 'next/image';
import Marquee from '../../components/marquee/marquee';
import StickyScrollItem from '../../components/scroll-item/index'; // Add this import
import { scrollContent } from '../../components/scroll-item/content'; // Add this import

export default function HomePage() {
  return (
    <div className="relative font-sans">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <Header />

        <div className="h-full flex items-center justify-center pt-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-decorative text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none whitespace-nowrap">
                KINDNEST
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-snug">
                Your platform for making a difference
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Side Curves and Images */}
      <div className="bg-white relative overflow-hidden min-h-[60vh]">
        {/* Decorative Images Around the Curves */}
        {/* Top Left Image */}
        <div className="absolute left-12 top-16 w-45 h-32 hidden md:block rotate-6 z-0">
          <Image
            src="/images/blanket.jpg"
            alt="Blanket donation"
            width={308}
            height={208}
            className="rounded-lg object-cover shadow-lime-900"
          />
        </div>

        {/* Bottom Left Image */}
        <div className="absolute left-22 bottom-20 w-36 h-36 hidden md:block -rotate-3 z-0">
          <Image
            src="/images/books.jpg"
            alt="Book donation"
            width={200}
            height={144}
            className="rounded-lg object-cover shadow-lime-800"
          />
        </div>

        {/* Top Right Image */}
        <div className="absolute right-20 top-20 w-36 h-36 hidden md:block -rotate-6 z-0">
          <Image
            src="/images/food.jpg"
            alt="Food donation"
            width={144}
            height={144}
            className="rounded-lg object-cover shadow-lime-900"
          />
        </div>

        {/* Bottom Right Image */}
        <div className="absolute right-16 bottom-22 w-45 h-32 hidden md:block rotate-3 z-0">
          <Image
            src="/images/ngo.jpg"
            alt="NGO volunteers"
            width={258}
            height={128}
            className="rounded-lg object-cover shadow-limw-900"
          />
        </div>

        {/* Left Curve */}
        <div className="absolute left-0 top-0 w-32 h-full hidden md:block z-10">
          <svg viewBox="0 0 200 1000" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0,0 
                 C50,150 80,300 60,450 
                 C40,600 80,750 40,900 
                 C0,1050 60,1200 0,1400"
              stroke="#01d460" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Right Curve */}
        <div className="absolute right-0 top-0 w-32 h-full hidden md:block z-10">
          <svg viewBox="0 0 200 1000" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M200,0 
                 C150,150 120,300 140,450 
                 C160,600 120,950 160,900 
                 C200,1050 140,1200 200,1400"
              stroke="#01d460" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text Section - Centered with proper spacing */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-42 pb-20 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-tagline text-[#147d06] leading-tight">
              <div>Small acts of Kindness</div>
              <div>create big impacts</div>
            </h2>
            <div className="text-xl text-gray-600 mt-16">
              <div>Connecting generous hearts with</div>
              <div>those in need through simple,</div>
              <div>meaningful contributions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section - Moved up */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Marquee speed={12} />
        </div>
      </div>

      {/* Gradient Section - Moved down */}
      <div className="relative py-32">
        {/* Gradient Background - Light green with smooth transition */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f0fff4] via-[#e6ffed]/80 to-white h-full"></div>
        
        {/* Additional subtle gradient layer for depth */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(175deg,rgba(209,250,229,0.3)_0%,rgba(209,250,229,0.2)_30%,rgba(255,255,255,0)_70%)]"></div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Spread Kindness Further
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our growing community of compassionate individuals making a difference
              in people's lives every day. Small actions lead to big changes.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#01d460] hover:bg-[#00b853] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Donate Now
              </button>
              <button className="border-2 border-[#01d460] text-[#01d460] hover:bg-[#01d460]/10 font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/*New Scrolling*/} 

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Our Impact in Action
          </h2>
          <StickyScrollItem 
            content={scrollContent}
            className="bg-white"
          />
        </div>
      </div>

      <div className="py-20" style={{
  backgroundColor: '#ffffff',
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'16\' viewBox=\'0 0 12 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z\' fill=\'%2342ff00\' fill-opacity=\'0.12\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
}}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto relative">
      {/* Background overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white opacity-90 -z-10"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-tagline text-center text-[#005f36] mb-8">
          Register Your NGO With Us
        </h2>
        <div className="space-y-6 text-lg text-gray-600 max-w-3xl mx-auto">
          <p className="leading-relaxed">
            Join our network of trusted organizations making real impact. By registering with Kindnest, 
            you'll gain access to thousands of donors ready to support your cause.
          </p>
          <p className="leading-relaxed">
            Our platform connects NGOs with resources, volunteers, and funding opportunities to amplify 
            your humanitarian work. Become part of a community that's transforming lives every day.
          </p>
          <p className="leading-relaxed">
            Registration is simple and free. Let's work together to create more meaningful change in 
            communities that need it most.
          </p>
        </div>
        <div className="pt-12 text-center">
          <button className="bg-[#01d460] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-[#00b853] relative z-10">
            Register Your NGO
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Additional Spacer Section */}
      <div className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">
            Scroll test successful! You've reached the bottom of the page.
          </h3>
        </div>
      </div>
    </div>
  );
}