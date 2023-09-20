/** Dispatch event on click outside of node */
export function clickOutside(node) {

  const handleClick = event => {
    let sameThreeDotsIsBeingClicked;
    if (event.srcElement.attributes.categoryid && node.attributes.categoryid) {
      const svgIsClicked = node.classList.contains('editorWrapper') &&
        (event.srcElement.nodeName == 'svg' || event.srcElement.nodeName == 'path')
      const threeDotsIsBeingClicked = svgIsClicked &&
        event.srcElement.classList.contains('dots');
      sameThreeDotsIsBeingClicked = threeDotsIsBeingClicked &
        event.srcElement.attributes.categoryid.value == node.attributes.categoryid.value
      console.log(event.srcElement.attributes.categoryid, node.attributes.categoryid);
    } else{
      sameThreeDotsIsBeingClicked = false
    }


    if (node && !node.contains(event.target) && !event.defaultPrevented && !sameThreeDotsIsBeingClicked) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}