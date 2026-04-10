import { useEffect, useState } from "react";
import PayMentMathodModal from "../../components/modal/PayMentMathodModal";
import PayMenCard from "../../components/modal/PayMenCard";
import { GetEventsForUser, paymemtEvent } from "../../services/incomeService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../utils/Loader";

function OtherIncomeInvoices() {
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false);
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false);
  const [payEvent, setPayEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePedingEvents = (event) => {
    setPayEvent(event);
    setIsPaymantNowOpen(true);
  };

  const handlePayment = async (paymentMode) => {
    try {
      const response = await paymemtEvent(payEvent._id, {
        paymentMode: paymentMode,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setPayEvent(null);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await GetEventsForUser();
      setEvents(response.data.Income);
    } catch (error) {
      error;
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleViewInvoice = () => {
    navigate("/otherinvoices");
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="bg-white p-6 mt-6 rounded-lg shadow-sm">
        <div className="flex flex-col  sm:flex-row items-center justify-between">
          <h1 className="font-semibold text-[20px]">Due Event Payment</h1>
          <button
            className="border p-3 mt-4 sm:mt-0 bg-custom-gradient rounded-lg text-white font-medium"
            onClick={handleViewInvoice}
          >
            View Invoice
          </button>
        </div>
        <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <div className="flex justify-center items-center col-span-full py-8">
              <Loader />
            </div>
          ) : events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="border border-grey-800 rounded-lg"
              >
                <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
                  <h2 className="text-sm sm:text-base font-semibold">
                    Due Event Payment
                  </h2>
                  <h2 className="text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold">
                    {event.members[0].paymentStatus}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-600">
                      <span className="font-sm">Event Name</span>
                      <p className="text-gray-400">{event.title}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-600">
                      <span className="font-sm">Event Due Date</span>
                      <p className="text-gray-400 text-[15px]">
                        {new Date(event.dueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-600">
                      <span className="font-sm">Amount</span>
                      <p className="text-red-500">{event.amount}.00</p>
                    </div>
                    <button
                      onClick={() => handlePedingEvents(event)}
                      className="h-14 bg-custom-gradient text-white font-bold rounded-xl w-full border"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 py-4">
              No data found.
            </div>
          )}
        </div>
      </div>

      <PayMentMathodModal
        isOpen={isPaymentNowOpen}
        onClose={() => {
          setIsPaymantNowOpen(false);
        }}
        setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
        handlePayment={handlePayment}
      />
      <PayMenCard
        isOpen={isPaymenCardOpen}
        onClose={() => {
          setisPaymenCardOpen(false);
        }}
        handlePayment={handlePayment}
      />
    </div>
  );
}

export default OtherIncomeInvoices;
