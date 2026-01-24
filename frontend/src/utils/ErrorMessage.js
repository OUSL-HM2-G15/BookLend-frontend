export const errorMessages = {
  401: "Session expired. Please log in.",
  403: "You don't have permission to view this.",
  404: "Book request not found.",
  500: "Server error. Please try again later.",
};

export const getErrorMessage = (status) => {
  return errorMessages[status] || "Network error. Check your connection.";
};
