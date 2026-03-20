import { useEffect } from "react";

export default function useScrollAnimation() {
useEffect(() => {
const elements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
    }
  });
});

elements.forEach((el) => observer.observe(el));

}, []);
}
