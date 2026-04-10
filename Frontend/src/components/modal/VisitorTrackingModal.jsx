import { useState, useRef, useEffect } from "react";
import { Loader } from "../../utils/Loader";
import { UploadPhoto } from "../../services/visitorService";
import toast from "react-hot-toast";

export default function VisitorTrackingModal({ isOpen, onClose, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    wing: "",
    unit: "",
    date: "",
    time: "",
    purpose: "",
    photoUrl: "",
  });

  const [error, setError] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("idle"); // idle, requesting, allowed, denied

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isCameraOpen && streamRef.current && videoRef.current) {
      console.log("Attaching stream to video element");
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const startCamera = async () => {
    setCameraPermission("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setCapturedImage(null);
      setCameraPermission("allowed");
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraPermission("denied");
      setIsCameraOpen(false);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        toast.error("Camera permission denied. Please enable it in browser settings.");
      } else {
        toast.error("Could not access camera. Please check your device.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    stopCamera();
  };

  const validateForm = () => {
    let formIsValid = true;
    const newError = {};

    if (!formData.name || !/^[A-Za-z\s]+$/.test(formData.name)) {
      newError.name = "Please enter a valid name";
      formIsValid = false;
    }
    if (!formData.number) {
      newError.number = "Please phone number";
      formIsValid = false;
    }
    if (!formData.wing) {
      newError.wing = "Please enter Wing";
      formIsValid = false;
    }
    if (!formData.unit) {
      newError.unit = "Please enter Unit";
      formIsValid = false;
    }
    if (!formData.date) {
      newError.date = "Please enter Date";
      formIsValid = false;
    }
    if (!formData.time || !/^\d{2}:\d{2}$/.test(formData.time)) {
      newError.time = "Please enter a valid time";
      formIsValid = false;
    }

    setError(newError);
    return formIsValid;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let photoUrl = "";
    if (capturedImage) {
      console.log("Preparing to upload captured image...");
      setIsUploading(true);
      try {
        // Convert data URL to Blob more robustly
        const byteString = atob(capturedImage.split(",")[1]);
        const mimeString = capturedImage.split(",")[0].split(":")[1].split(";")[0];
        console.log("Captured image MIME type:", mimeString);
        
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        
        console.log("Blob created:", blob.type, "Size:", blob.size);
        
        const formDataUpload = new FormData();
        // Explicitly set filename with correct extension
        const extension = mimeString.split("/")[1] || "png";
        const filename = `visitor.${extension}`;
        formDataUpload.append("photo", blob, filename);
        
        console.log("Sending photo upload request with filename:", filename);
        const response = await UploadPhoto(formDataUpload);
        console.log("Photo upload response successful:", response.data);
        photoUrl = response.data.photoUrl;
      } catch (uploadError) {
        console.error("PHOTO UPLOAD FAILED!");
        console.error("Status:", uploadError.response?.status);
        console.error("Server Message:", uploadError.response?.data?.message);
        console.error("Full Response Data:", JSON.stringify(uploadError.response?.data, null, 2));
        
        const errorMsg = uploadError.response?.data?.message || uploadError.message || "Photo upload failed";
        toast.error(`${errorMsg}. Proceeding without photo.`);
      } finally {
        setIsUploading(false);
      }
    }

    onSave({ ...formData, photoUrl });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      number: "",
      wing: "",
      unit: "",
      date: "",
      time: "",
      purpose: "",
      photoUrl: "",
    });
    setError({});
    setCapturedImage(null);
    stopCamera();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.number &&
      formData.wing &&
      formData.unit &&
      formData.date &&
      formData.time
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[9999]">
      <div className="bg-white p-[20px] rounded-lg max-w-[410px] w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Add Visitor Details</h2>

        <form onSubmit={handleSave}>
          <div className="mb-[20px]">
            <label className="block mb-2">Visitor Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded-[10px] ${
                error.name ? "border-red-500" : ""
              } focus:outline-none`}
            />
            {error.name && (
              <span className="text-red-500 text-sm">{error.name}</span>
            )}
          </div>
          <div className="mb-[20px]">
            <label className="block mb-2">Visitor Number*</label>
            <input
              type="text"
              name="number"
              placeholder="Enter phone number"
              value={formData.number}
              onChange={handleChange}
              className={`w-full p-2 mb-1 border rounded-[10px] ${
                error.number ? "border-red-500" : ""
              } focus:outline-none`}
            />
            {error.number && (
              <span className="text-red-500 text-sm">{error.number}</span>
            )}
          </div>

          <div className="flex justify-between mb-[20px]">
            <div>
              <label className="block mb-2">Wing*</label>
              <input
                type="text"
                name="wing"
                placeholder="Enter Wing"
                value={formData.wing}
                onChange={handleChange}
                className={`w-[175px] h-[47px] p-2 mb-1 border rounded-[10px] ${
                  error.wing ? "border-red-500" : ""
                } focus:outline-none bg-transparent`}
              />
              {error.wing && (
                <span className="text-red-500 text-sm">{error.wing}</span>
              )}
            </div>

            <div>
              <label className="block mb-2">Unit*</label>
              <input
                type="text"
                name="unit"
                placeholder="Enter Unit"
                value={formData.unit}
                onChange={handleChange}
                className={`w-[175px] h-[47px] p-2 mb-1 border rounded-[10px] ${
                  error.unit ? "border-red-500" : ""
                } focus:outline-none`}
              />
              {error.unit && (
                <span className="text-red-500 text-sm">{error.unit}</span>
              )}
            </div>
          </div>
          <div className="flex justify-between mb-[20px]">
            <div>
              <label className="block mb-2">Purpose</label>
              <input
                type="text"
                name="purpose"
                placeholder="Enter Purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-2 mb-1 border rounded-[10px] focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between mb-[20px]">
            <div>
              <label className="block mb-2">Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-[175px] h-[47px] p-2 mb-1 border rounded-[10px] ${
                  error.date ? "border-red-500" : ""
                } focus:outline-none`}
              />
              {error.date && (
                <span className="text-red-500 text-sm">{error.date}</span>
              )}
            </div>
            <div>
              <label className="block mb-2">Time*</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-[175px] h-[47px] p-2 mb-1 border rounded-[10px] ${
                  error.time ? "border-red-500" : ""
                } focus:outline-none`}
              />
              {error.time && (
                <span className="text-red-500 text-sm">{error.time}</span>
              )}
            </div>
          </div>

          {/* Camera Capture Section */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Visitor Photo</label>
            <div className="relative border rounded-lg overflow-hidden bg-gray-50 flex flex-col items-center justify-center min-h-[180px] border-dashed border-gray-300">
              {cameraPermission === "requesting" ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600 font-medium">Requesting Camera...</span>
                </div>
              ) : isCameraOpen ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto object-cover max-h-[300px]"
                  />
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="absolute bottom-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-colors"
                  >
                    📸 Capture
                  </button>
                </>
              ) : capturedImage ? (
                <>
                  <img
                    src={capturedImage}
                    alt="Captured Visitor"
                    className="w-full h-auto object-cover max-h-[300px]"
                  />
                  <button
                    type="button"
                    onClick={startCamera}
                    className="absolute bottom-4 bg-white/90 hover:bg-white text-orange-500 px-6 py-2 rounded-full font-semibold shadow-md transition-colors"
                  >
                    🔄 Retake Photo
                  </button>
                </>
              ) : cameraPermission === "denied" ? (
                <div className="flex flex-col items-center gap-3 p-4 text-center">
                  <span className="text-4xl">❌</span>
                  <span className="text-red-500 font-medium">Camera access denied</span>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="text-orange-500 font-semibold underline"
                  >
                    Try again
                  </button>
                  <p className="text-xs text-gray-500 max-w-[200px]">
                    Please enable camera access in your browser settings to continue.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex flex-col items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📷</span>
                  </div>
                  <span className="font-semibold">Tap to Capture Photo</span>
                </button>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="w-[175px] py-[13.5px] px-[58.5px] border rounded-[10px] leading-[27px] font-medium text-[18px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || isLoading}
              className={`w-[175px] px-4 py-3 text-md font-medium text-black rounded-[10px] transition-all duration-300
        ${
          isFormValid()
            ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] hover:opacity-90 text-white"
            : "bg-[#F6F8FB] text-black"
        }`}
            >
              {isUploading || isLoading ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
