export const getDeviceId = (): string => {
  // Try to get existing device ID from local storage
  const storedDeviceId = localStorage.getItem('device_id');
  if (storedDeviceId) return storedDeviceId;
  
  // Generate a new device ID if none exists
  const newDeviceId = generateDeviceId();
  localStorage.setItem('device_id', newDeviceId);
  return newDeviceId;
};

const generateDeviceId = (): string => {
  // Create a fingerprint from available browser data
  const navigatorInfo = `${navigator.userAgent}${navigator.language}${navigator.hardwareConcurrency}${screen.width}${screen.height}`;
  
  // Hash the navigator info to create a unique-ish ID
  let hash = 0;
  for (let i = 0; i < navigatorInfo.length; i++) {
    const char = navigatorInfo.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return `device_${Math.abs(hash).toString(16)}`;
};