const cybersoftToken = import.meta.env.VITE_CYBERSOFT_TOKEN?.trim();
export const cybersoftApiHeaders = cybersoftToken ? {
  TokenCybersoft: cybersoftToken,
  "Content-Type": "application/json"
} : {
  "Content-Type": "application/json"
};
export const requireCybersoftToken = () => {
  if (!cybersoftToken) {
    throw new Error("The Cybersoft API token is not configured. Set VITE_CYBERSOFT_TOKEN in .env.local.");
  }
};
export const getApiErrorMessage = (error, fallbackMessage) => {
  const responseData = error.response?.data;
  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }
  if (responseData?.content || responseData?.message) {
    return responseData.content || responseData.message;
  }
  return error.message || fallbackMessage;
};