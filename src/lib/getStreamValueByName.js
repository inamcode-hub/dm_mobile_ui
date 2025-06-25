export function getStreamValueByName(payload, targetName, decimals = 2) {
  try {
    const liveArray = payload?.live || [];
    const match = liveArray.find((item) => item.name === targetName);
    if (!match || match.value == null) return null;
    return Number(match.value).toFixed(decimals);
  } catch (error) {
    console.error('getStreamValueByName error:', error);
    return null;
  }
}

export const findMode = (data) => {
  for (let obj of data) {
    // Check if the object has the name "mode_control"
    if (obj.name === 'mode_control') {
      // Check the value and return the corresponding mode
      if (obj.value === 10) {
        return 'local_mode';
      } else if (obj.value === 11) {
        return 'manual_mode';
      } else if (obj.value === 12) {
        return 'automatic_mode';
      } else {
        return 'unknown mode';
      }
    }
  }
  return 'mode_control not found';
};
