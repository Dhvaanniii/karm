import { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaEye } from "react-icons/fa";
import { DownloadMaintanance, GetPaidMaintenances } from "../../services/maintenanceService";
import toast from "react-hot-toast";
import { Loader } from "../../utils/Loader";



function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  const fetchPaidMaintenances = async () => {
    try {
      setIsLoading(true)
      const response = await GetPaidMaintenances();
      setInvoices(response.data.Maintenance);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  };

 
  const handleDownloadInvoice = async (invoice) => {
    try {

      const payload = {
        invoiceId: invoice.invoiceId || 123,
        ownerName: invoice.resident.Full_name,
        billDate: new Date(invoice.dueDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        phoneNumber: invoice.resident.Phone_number,
        email: invoice.resident.Email_address,
        maintenanceAmount: invoice.maintenanceAmount,
        penaltyAmount: invoice.penaltyAmount,
        grandTotal: invoice.maintenanceAmount + invoice.penaltyAmount,
        Wing: invoice.resident.Wing,
        Unit: invoice.resident.Unit,
      };


      const blob = await DownloadMaintanance(payload);


      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice-${invoice.invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();


      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to download the invoice.');
    }
  };
  useEffect(() => {
    fetchPaidMaintenances();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg min-h-full">
      <h1 className="text-xl font-semibold mb-4 p-2">Maintenance Invoices</h1>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-indigo-50 text-center">
              <th className="px-4 py-3 font-medium text-center">Invoice ID</th>
              <th className="px-4 py-2 font-medium text-center">Bill Date</th>
              <th className="px-4 py-2 font-medium text-center">Payment Date</th>
              <th className="px-4 py-2 font-medium text-center">
                Maintenance Amount
              </th>
              <th className="px-4 py-2 font-medium text-center">
                Pending Amount
              </th>
              <th className="px-4 py-2 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="9" className="px-6 py-6 text-center">
                  <div className="flex justify-center items-center">
                 <Loader/>
                  </div>
                </td>
              </tr>
            ) : invoices.length > 0 ? (
              invoices.map((v, index) =>
                v.residentList.map((r) => (
                  <tr key={index} className="border-b bg-white">
                    <td className="px-6 py-6 text-center">{1232}</td>
                   
                    <td className="px-4 py-2 text-center">
                      {new Date(v.dueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 text-center">11/11/2024</td>
                    
                    <td className="px-4 py-2 text-green-600 text-center">
                      ₹ {v.maintenanceAmount}
                    </td>
                    <td className="px-4 py-2 text-red-500 text-center">
                      ₹ {v.penaltyAmount}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => openModal({ ...v, ...r })}
                        className="text-[#5678E9] bg-gray-200 p-2 rounded-lg hover:underline"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white w-10/12 sm:w-[28rem] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="font-semibold text-lg">Maintenance Invoices</h2>
              <button
                onClick={closeModal}
                className="text-black hover:text-gray-900 font-normal text-[30px]"
              >
                &times;
              </button>
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              {/* Invoice and Owner Name Section */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex gap-20 p-2 ">
                  <p>
                    <strong className="text-gray-400 font-normal">
                      Invoice Id:
                    </strong>
                    <p>123 </p>
                  </p>
                  <p>
                    <strong className="text-gray-400 font-normal">
                      Owner Name:
                    </strong>
                    <p>{selectedInvoice.resident.Full_name}</p>
                  </p>
                </div>
                <div className="flex gap-20 p-2">
                  <p>
                    <strong className="text-gray-400 font-normal">
                      Bill Date:
                    </strong>
                    <p>
                      {" "}
                      {new Date(selectedInvoice.dueDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </p>
                  <p>
                    <strong className="text-gray-400 font-normal">
                      Payment Date:
                    </strong>
                    <p>{selectedInvoice.paymentDate}</p>
                  </p>
                </div>

                <div className="p-2">
                  <p>
                    <strong className="text-gray-400 font-normal">
                      Phone Number:
                    </strong>
                    <p>{selectedInvoice.resident.Phone_number}</p>
                  </p>
                  <p className="mt-2">
                    <strong className="text-gray-400 font-normal">
                      Email:
                    </strong>
                    <p> {selectedInvoice.resident.Email_address}</p>
                  </p>
                  <p className="mt-2">
                    <strong className="text-gray-400 font-normal">
                      Address:
                    </strong>
                    <p>`{selectedInvoice.resident.Wing}-{selectedInvoice.resident.Unit}`</p>
                  </p>
                </div>
              </div>

              {/* Financial Details Section */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between">
                  <p>
                    <strong className="text-black font-normal">
                      Maintenance Amount:
                    </strong>
                  </p>
                  <p className="text-green-600">
                    ₹ {selectedInvoice.maintenanceAmount}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>
                    <strong className="text-black font-normal">Penalty:</strong>
                  </p>
                  <p className="text-red-500">
                    ₹ {selectedInvoice.penaltyAmount}
                  </p>
                </div>

                <div className="flex justify-between font-bold mt-2">
                  <p className="text-black font-normal">Grand Total:</p>
                  <p className="text-black">
                    ₹{" "}
                    {selectedInvoice.maintenanceAmount +
                      selectedInvoice.penaltyAmount}
                  </p>
                </div>
              </div>

              {/* Note Section */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>
                  <strong className="text-gray-400 font-normal">Note</strong>
                  <p></p>
                </p>
              </div>
            </div>

            {/* Download Button */}
            <button className="mt-6 bg-custom-gradient w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2" onClick={() => handleDownloadInvoice(selectedInvoice)}>
              <FaArrowAltCircleDown size={18} />
              <span>Download Invoice</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoicesPage;
