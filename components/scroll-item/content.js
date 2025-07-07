export const scrollContent = [
  {
    title: "Transform Lives",
    description: "Every donation provides meals for 5 families for a week",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <img
          src="/images/meals-served.jpg"
          alt="Volunteers serving meals"
          className="h-full w-full object-cover opacity-90" // Added opacity
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          {/* Empty overlay div for potential future use */}
        </div>
      </div>
    )
  },
  {
    title: "Education Access", 
    description: "Funding school supplies and tuition for children",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <img
          src="/images/education-support.jpg"
          alt="Children with school supplies"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        </div>
      </div>
    )
  },
  {
    title: "Community Growth",
    description: "Building sustainable neighborhood solutions",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <img
          src="/images/community-build.jpg"
          alt="Community building project"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        </div>
      </div>
    )
  },
  {
    title: "Volunteer Impact",
    description: "Join thousands making hands-on difference",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <img
          src="/images/volunteers-action.jpg"
          alt="Volunteers working together"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        </div>
      </div>
    )
  }
];