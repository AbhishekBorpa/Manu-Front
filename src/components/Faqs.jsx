import {
  useState,
  useEffect,
} from "react";

import {
  FaChevronDown,
} from "react-icons/fa";

const FAQ = () => {

  const [faqs, setFaqs] =
    useState([]);

  const [openIndex, setOpenIndex] =
    useState(null);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH FAQS */
  useEffect(() => {

    const fetchFaqs =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/faqs"
            );

          const data =
            await res.json();

          /* 🔥 FIX */
          setFaqs(
            data.faqs ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchFaqs();

  }, []);




  /* 🔥 TOGGLE */
  const toggleFAQ = (
    index
  ) => {

    setOpenIndex(
      openIndex === index
        ? null
        : index
    );
  };




  /* 🔄 LOADING */
  if (loading) {

    return (
      <p className="text-center py-10 text-gray-500">

        Loading FAQs...

      </p>
    );
  }




  /* ❌ NO FAQS */
  if (
    !faqs ||
    faqs.length === 0
  ) {
    return null;
  }




  return (
    <section className="bg-white py-16">

      <div className="max-w-4xl mx-auto px-6">

        {/* 🔥 HEADER */}
        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-gray-900">

            Frequently Asked Questions

          </h2>



          <p className="text-gray-500 mt-3 text-lg">

            Find answers to common questions

          </p>

        </div>



        {/* 🔥 FAQ LIST */}
        <div className="space-y-5">

          {faqs.map(
            (
              faq,
              index
            ) => (

              <div
                key={faq._id}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >

                {/* 🔥 QUESTION */}
                <button
                  onClick={() =>
                    toggleFAQ(index)
                  }
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >

                  <span className="text-lg font-semibold text-gray-800">

                    {faq.question}

                  </span>



                  <FaChevronDown
                    className={`text-[#14532D] text-sm transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>



                {/* 🔥 ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >

                  <div className="overflow-hidden">

                    <div className="px-7 pb-5 text-gray-600 leading-relaxed">

                      {faq.answer}

                    </div>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default FAQ;