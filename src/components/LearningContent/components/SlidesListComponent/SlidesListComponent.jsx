import { pageNumber } from 'components/LearningContent/functions/utils';
import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ImagesPreviews from '../ImagesPreviews/ImagesPreviews';
import styles from './SlidesListComponent.module.scss';

export default function SlidesListComponent({
  slides: ListToRender,
  handleClickInASlide,
  blankSlide,
  isEditingCurrentSlide,
  setListToRender,
  changeSlidePositionFromDrag
}) {
  // Function to update list on drop
  const handleDrop = droppedItem => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...ListToRender];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    changeSlidePositionFromDrag(reorderedItem, droppedItem.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="list-container">
        {provided => (
          <div
            className={styles.listContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {ListToRender.map((item, index) => (
              <Draggable key={item?.id || index} draggableId={item?.id} index={index}>
                {provided => (
                  <div
                    className={styles.slideDNDcontainer}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <ImagesPreviews
                      slide={item}
                      styles={styles}
                      pageNumber={
                        pageNumber(null, null, true, item?.numberToSort || 0).text
                      }
                      handleClickInASlide={handleClickInASlide}
                      blankSlide={blankSlide}
                      isEditingCurrentSlide={isEditingCurrentSlide === item?.id}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
