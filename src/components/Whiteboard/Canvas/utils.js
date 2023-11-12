export function getStagePointerPosition(stage) {
  const pointerPos = stage.getPointerPosition();
  const convertidor = stage.getAbsoluteTransform().copy().invert();

  // ".getAbsoluteTransform().copy().invert()" permite identificar la posición del lienzo y de la pantalla para sincronizarlos
  return convertidor.point(pointerPos);
}
