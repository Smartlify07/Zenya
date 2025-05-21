import Demo from '@/../public/images/Screen Recording 2025-05-17 091159.mp4';

export default function SolutionSection() {
  return (
    <section className="flex flex-col items-center px-6 py-10 md:px-10 md:py-20 font-inter">
      <div className="max-w-7xl flex flex-col items-center gap-10">
        <header className="md:10/12 lg:w-6/12 items-center flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl self-center text-center font-medium text-primary">
            Zenya simplifies finance tracking for freelancers{' '}
          </h1>
          <p className="text-center text-secondary-foreground">
            No more guesswork. No more spreadsheet gymnastics
          </p>
        </header>
        <video
          autoPlay
          loop
          muted
          className="size-11/12 border p-5 rounded-2xl shadow-xl"
        >
          <source src={Demo} />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
