import Spreadsheet from '@/../public/images/spreadsheet.png';
import Zenya from '@/../public/images/mockup.png';
export default function ProblemSection() {
  return (
    <section className="flex flex-col items-center px-4 py-10 md:px-6 md:py-20 font-inter">
      <div className="max-w-7xl flex flex-col w-full items-center gap-10 md:gap-20">
        <header className="md:10/12 lg:w-6/12 items-center flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl self-center text-center font-medium text-primary">
            Most freelancers don't track their finances consistently.
          </h1>
          <p className="text-center text-secondary-foreground">
            You rely on memory, messy spreadsheets, or scattered Notion pages
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-10 md:items-center md:justify-center md:gap-20">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-center">Spreadsheets ❌</h3>
            <img
              src={Spreadsheet}
              className="object-cover h-[400px] border shadow-xs rounded-2xl"
            />
            <ul className="list-disc mt-5 text-sm text-neutral-600 pl-4">
              <li>Manual entry & formulas for everything</li>
              <li>Easily gets messy & overwhelming</li>
              <li>No visual insights or summaries</li>
              <li>Hard to keep consistent over time</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-center">Zenya ✅</h3>
            <img
              src={Zenya}
              className="object-cover h-[400px] border shadow-xs rounded-2xl"
            />
            <ul className="list-disc mt-5 text-sm text-neutral-600 pl-4">
              <li>Simple inputs, instant overview</li>
              <li>Visual breakdowns by category & date</li>
              <li>Tracks incomes & expenses clearly</li>
              <li>Built for freelancers' real needs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
