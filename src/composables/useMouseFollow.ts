import { Ref } from "vue";
export const useMouseFollow = (event: MouseEvent, item: HTMLElement, shadow: Ref<HTMLElement>) => {
  const { offsetX: x, offsetY: y } = event,
    { offsetWidth: width, offsetHeight: height } = item,
    move = 20,
    xMove = (x / width) * (move * 2) - move,
    yMove = (y / height) * (move * 2) - move;
  item.style.setProperty("--mouseX", `${xMove}px`);
  item.style.setProperty("--mouseY", `${yMove}px`);
  item.style.setProperty("--transition", `${0}s`);
  shadow.value?.style.setProperty("--mouseX", `${xMove}px`);
  shadow.value?.style.setProperty("--mouseY", `${yMove}px`);
  shadow.value?.style.setProperty("--transition", `${0}s`);
  if (event.type === "mouseleave") {
    item.style.setProperty("--mouseX", "0px");
    item.style.setProperty("--mouseY", "0px");
    item.style.setProperty("--transition", `${0.1}s`);
    shadow.value?.style.setProperty("--mouseX", "0px");
    shadow.value?.style.setProperty("--mouseY", "0px");
    shadow.value?.style.setProperty("--transition", `${0.1}s`);
  }
};
