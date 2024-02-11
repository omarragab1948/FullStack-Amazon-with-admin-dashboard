const DeletePopup = ({ onDelete, setShowDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            onClick={() => {
              setShowDelete(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
