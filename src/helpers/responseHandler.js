export const respondWithSuccess = (res, status = 200, message, additionalFields) => {
  const payload = additionalFields || {};
  return res.status(status).json({
    success: true,
    status,
    message,
    data: payload,
  });
};

export const respondWithWarning = (res, status = 400, message, additionalFields = {}) => {
  const payload = Array.isArray(additionalFields)
    ? [...additionalFields] : { ...additionalFields };
  return res.status(status).json({
    success: false,
    status,
    message,
    data: payload,
  });
};
