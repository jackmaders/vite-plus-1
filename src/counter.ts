export function setupCounter(element: HTMLButtonElement) {
  const increment = 1;
  const initialCount = 0;
  let counter = initialCount;
  function setCounter(count: number) {
    counter = count;
    element.textContent = `Count is ${counter}`;
  }
  element.addEventListener("click", () => {
    setCounter(counter + increment);
  });
  setCounter(initialCount);
}
