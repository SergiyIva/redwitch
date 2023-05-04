import { keyframes } from "styled-components";

export const navbarOpen = keyframes`
0%{
transform: translateY(-100%);
}
100%{
transform: translateY(0);
}
`;

export const loading = keyframes`
 25% {
    transform: rotateX(180deg) rotateY(0);
}
  50% {
    transform: rotateX(180deg) rotateY(180deg);
}
  75% {
    transform: rotateX(0) rotateY(180deg);
}
  100% {
    transform: rotateX(0) rotateY(0);
}
`;

export const spinMe = keyframes`
  0% {
    transform-origin: center 62%;
}
  100% {
    transform-origin: center 62%;
  transform: rotate(2turn);
}
`;

export const openCheck = keyframes`
  0% {
    transform: translateX(0);
}
  100% {
    transform: translateX(3rem);
}
`;

export const openModal = keyframes`
0%{
opacity: 0;
transform: scale(.3);
}
85%{
transform: scale(1.05);
}
100%{
opacity: 1;
transform: scale(1);
}
`;

export const textActionOn = keyframes`
0%, 100%{
opacity: 0;
}
5%, 95%{
opacity: 1;
}
`;

export const opacityOn = keyframes`
0%{
opacity: 0;
}
100%{
opacity: .9;
}
`;

export const opacityOn100 = keyframes`
0%{
opacity: 0;
}
100%{
opacity: 1;
}
`;

export const onTyping = keyframes`
0%, 20%, 80%, 100%{
  transform: translateY(0);
  opacity: 0.6;
}
50%{
  transform: translateY(-20%);
  opacity: 1;
}
`;

export const slideToView = keyframes`
0% {
  transform: translateY(75px);
  opacity: 0;
}
100% {
  transform: translateY(0);
  opacity: 1;
}
`;

export const slideToViewText = keyframes`
0% {
  transform: translateY(25px);
  opacity: 0;
}
100% {
  transform: translateY(0);
  opacity: 1;
}
`;

export const growBubble = keyframes`
0% {
  transform: scale(.1);
  opacity: 0;
}
60%{
  transform: scale(1.1);
  opacity: 1;
}
100%{
  transform: scale(1);
  opacity: 1;
}
`;
