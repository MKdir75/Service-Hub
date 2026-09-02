import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>

        <section className="bg-blue-50">
          <div className="mx-auto max-w-7xl px-6 py-24">

            <div className="max-w-3xl">

              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Find Trusted Professionals
                <span className="text-blue-600">
                  {" "}Near You
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Find and book trusted service providers
                for your everyday needs.
              </p>

              <div className="mt-8 flex gap-4">

                <Link
                  to="/services"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
                >
                  Explore Services
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg border bg-white px-6 py-3 font-semibold"
                >
                  Become a Provider
                </Link>

              </div>

            </div>

          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">

          <h2 className="text-3xl font-bold">
            Popular Services
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              "Electrician",
              "Plumber",
              "Cleaner",
              "Tutor"
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">
                  {item}
                </h3>

                <p className="mt-2 text-gray-500">
                  Find trusted professionals.
                </p>

                <Link
                  to="/services"
                  className="mt-4 inline-block text-blue-600"
                >
                  Explore →
                </Link>
              </div>
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;