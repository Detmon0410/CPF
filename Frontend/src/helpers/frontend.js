import AOS from "aos";

export async function onMounted(callback = null) {
  AOS.init({
    easing: "ease-in-out-cubic",
    duration: 750,
    once: true,
    offset: 10,
  });
  if (callback) {
    callback();
  }
  return true;
}

export function formatNumber(value, digits = 2) {
  let val = (value / 1).toFixed(digits);
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}